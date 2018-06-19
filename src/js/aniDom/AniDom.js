/***
 * file name : AniDom.js
 * description : dom animation class
 * create date : 2018-06-18
 * creator : saltgamer
 ***/
import {defaultTweenSettings, toArray, createNewInstance, filterArray, minMaxValue, getPathProgress, getCSSValue,
    mergeObjects, replaceObjectProps, is, setTweenProgress } from './index';

let activeInstances = [];
let raf = 0;

const engine = (() => {
    function play() { raf = requestAnimationFrame(step); }
    function step(t) {
        const activeLength = activeInstances.length;
        if (activeLength) {
            let i = 0;
            while (i < activeLength) {
                if (activeInstances[i]) activeInstances[i].tick(t);
                i++;
            }
            play();
        } else {
            cancelAnimationFrame(raf);
            raf = 0;
        }
    }
    return play;
})();

class AniDom {
    constructor(params = {}) {

        this.now = 0;
        this.startTime = 0;
        this.lastTime = 0;

        this.speed = 1;

        this.transformString = null;

        this.resolve = null;
        this.promise = this.makePromise();
        this.instance = createNewInstance(params);

        // console.log('instance: ', this.instance);

        this.finished = this.promise;
        this.reset();

        if (this.instance.autoPlay) this.play();

    }

    makePromise() {
        return window.Promise && new Promise(_resolve => this.resolve = _resolve);
    }

    toggleInstanceDirection() {
        this.instance.reversed = !this.instance.reversed;
    }

    adjustTime(time) {
        return this.instance.reversed ? this.instance.duration - time : time;
    }

    syncInstanceChildren(time) {
        const children = this.instance.children;
        const childrenLength = children.length;
        if (time >= this.instance.currentTime) {
            for (let i = 0; i < childrenLength; i++) children[i].seek(time);
        } else {
            for (let i = childrenLength; i--;) children[i].seek(time);
        }
    }

    setAnimationsProgress(insTime) {
        const instance = this.instance;

        let i = 0;
        let transforms = {};
        const animations = instance.animations;
        const animationsLength = animations.length;
        while (i < animationsLength) {
            const anim = animations[i];
            const animatable = anim.animatable;
            const tweens = anim.tweens;
            const tweenLength = tweens.length - 1;
            let tween = tweens[tweenLength];
            // Only check for keyframes if there is more than one tween
            if (tweenLength) tween = filterArray(tweens, t => (insTime < t.end))[0] || tween;
            const elapsed = minMaxValue(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
            const eased = isNaN(elapsed) ? 1 : tween.easing(elapsed, tween.elasticity);
            const strings = tween.to.strings;
            const round = tween.round;
            let numbers = [];
            let progress;
            const toNumbersLength = tween.to.numbers.length;
            for (let n = 0; n < toNumbersLength; n++) {
                let value;
                const toNumber = tween.to.numbers[n];
                const fromNumber = tween.from.numbers[n];
                if (!tween.isPath) {
                    value = fromNumber + (eased * (toNumber - fromNumber));
                } else {
                    value = getPathProgress(tween.value, eased * toNumber);
                }
                if (round) {
                    if (!(tween.isColor && n > 2)) {
                        value = Math.round(value * round) / round;
                    }
                }
                numbers.push(value);
            }
            // Manual Array.reduce for better performances
            const stringsLength = strings.length;
            if (!stringsLength) {
                progress = numbers[0];
            } else {
                progress = strings[0];
                for (let s = 0; s < stringsLength; s++) {
                    const a = strings[s];
                    const b = strings[s + 1];
                    const n = numbers[s];
                    if (!isNaN(n)) {
                        if (!b) {
                            progress += n + ' ';
                        } else {
                            progress += n + b;
                        }
                    }
                }
            }
            setTweenProgress[anim.type](animatable.target, anim.property, progress, transforms, animatable.id);
            anim.currentValue = progress;
            i++;
        }
        const transformsLength = Object.keys(transforms).length;
        if (transformsLength) {
            for (let id = 0; id < transformsLength; id++) {
                if (!this.transformString) {
                    const t = 'transform';
                    this.transformString = (getCSSValue(document.body, t) ? t : `-webkit-${t}`);
                }
                instance.animatables[id].target.style[this.transformString] = transforms[id].join(' ');
            }
        }
        instance.currentTime = insTime;
        instance.progress = (insTime / instance.duration) * 100;
    }

    setCallback(cb) {
        if (this.instance[cb]) this.instance[cb](this.instance);
    }

    countIteration() {
        if (this.instance.remaining && this.instance.remaining !== true) {
            this.instance.remaining--;
        }
    }


    setInstanceProgress(engineTime) {
        const instance = this.instance;
        const insDuration = instance.duration;
        const insOffset = instance.offset;
        const insStart = insOffset + instance.delay;
        const insCurrentTime = instance.currentTime;
        const insReversed = instance.reversed;
        const insTime = this.adjustTime(engineTime);
        if (instance.children.length) this.syncInstanceChildren(insTime);
        if (insTime >= insStart || !insDuration) {
            if (!instance.began) {
                instance.began = true;
                this.setCallback('begin');
            }
            this.setCallback('run');
        }
        if (insTime > insOffset && insTime < insDuration) {
            this.setAnimationsProgress(insTime);
        } else {
            if (insTime <= insOffset && insCurrentTime !== 0) {
                this.setAnimationsProgress(0);
                if (insReversed) this.countIteration();
            }
            if ((insTime >= insDuration && insCurrentTime !== insDuration) || !insDuration) {
                this.setAnimationsProgress(insDuration);
                if (!insReversed) this.countIteration();
            }
        }
        this.setCallback('update');
        if (engineTime >= insDuration) {
            if (instance.remaining) {
                this.startTime = this.now;
                if (instance.direction === 'alternate') this.toggleInstanceDirection();
            } else {
                this.pause();
                if (!instance.completed) {
                    instance.completed = true;
                    this.setCallback('complete');
                    if ('Promise' in window) {
                        this.resolve();
                        this.promise = this.makePromise();
                    }
                }
            }
            this.lastTime = 0;
        }
    }

    reset() {
        const instance = this.instance;
        const direction = instance.direction;
        const loops = instance.loop;
        instance.currentTime = 0;
        instance.progress = 0;
        instance.paused = true;
        instance.began = false;
        instance.completed = false;
        instance.reversed = direction === 'reverse';
        instance.remaining = direction === 'alternate' && loops === 1 ? 2 : loops;
        this.setAnimationsProgress(0);
        for (let i = instance.children.length; i--;) {
            instance.children[i].reset();
        }
    }

    tick(t) {
        this.now = t;
        if (!this.startTime) this.startTime = this.now;
        const engineTime = (this.lastTime + this.now - this.startTime) * this.speed;
        this.setInstanceProgress(engineTime);
    }

    seek(time) {
        this.setInstanceProgress(this.adjustTime(time));
    }

    pause() {
        const i = activeInstances.indexOf(this);
        if (i > -1) activeInstances.splice(i, 1);
        this.instance.paused = true;
    }

    play() {
        const instance = this.instance;
        if (!instance.paused) return;
        instance.paused = false;
        this.startTime = 0;
        this.lastTime = this.adjustTime(instance.currentTime);
        activeInstances.push(this);
        if (!raf) engine();
    }

    reverse() {
        this.toggleInstanceDirection();
        this.startTime = 0;
        this.lastTime = this.adjustTime(this.instance.currentTime);
    }

    restart() {
        this.pause();
        this.reset();
        this.play();
    }

}

export function initAniDom(params) {
    let tl = new AniDom(params);

    // console.log('-tl 1: ', tl);
    tl.pause();
    tl.instance.duration = 0;
    tl.add = (instancesParams) => {
        // console.log('-tl 2: ', tl);
        tl.instance.children.forEach(i => { i.began = true; i.completed = true; });
        toArray(instancesParams).forEach(instanceParams => {
            // console.log('-tl 2: ', tl);
            let insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params || {}));
            insParams.targets = insParams.targets || params.targets;
            const tlDuration = tl.instance.duration;
            const insOffset = insParams.offset;
            insParams.autoPlay = false;
            insParams.direction = tl.direction;
            insParams.offset = is.und(insOffset) ? tlDuration : getRelativeValue(insOffset, tlDuration);
            tl.began = true;
            tl.completed = true;
            tl.seek(insParams.offset);
            const ins = new AniDom(insParams);
            ins.began = true;
            ins.completed = true;
            if (ins.instance.duration > tlDuration) tl.instance.duration = ins.instance.duration;
            tl.instance.children.push(ins);
        });
        tl.seek(0);
        tl.reset();
        if (tl.instance.autoPlay) tl.restart();
        return tl;
    };
    return tl;
}