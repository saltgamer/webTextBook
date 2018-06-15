/***
 * file name : AniDom.js
 * description : dom animation class
 * create date : 2018-06-14
 * creator : saltgamer
 ***/
import AniCast from './AniCast';
import ease from './ease';
import {createElement} from '../utility';

export default class AniDom {
    constructor(params) {
        this.target = params.target;
        this.animationList = [];
        this.ticking = false;
        this.currentAniFrame = null;
        this.aniCast = null;
        this.memoized = {};
        this.style = createElement('p').style;
        this.has3d = null;
        this.ease = new ease();

        this.addAni(params);

    }

    animationFrames(delay, duration) {

        const now = Date.now();

        let start = now + delay,
            end = start + duration;

        let animation = {
            start,
            end
        };

        this.animationList.push(animation);

        console.log('-> animationList: ', this.animationList);

        if (!this.ticking) {
            this.ticking = true;
            this.currentAniFrame = window.requestAnimationFrame(this.tick);
        }

        this.aniCast = new AniCast(animation);
        return this.aniCast;

    }


    tick() {
        const now = Date.now();

        if (!this.animationList.length) {
            this.ticking = false;
            return this;
        }

        this.animationList.forEach((value, idx) => {
            if (now < value.start) {
                console.log('-> animation not yet started...');

            }

            if (!value.started) {
                value.started = true;
                value.startCallBack && value.startCallBack();
            }

            let prog = (now - value.start) / (value.end - value.start);
            value.progressCallBack && value.progressCallBack(prog < 1 ? prog : 1);

            if (now > value.end) {
                value.endCallBack && value.endCallBack();
                this.animationList.splice(idx - 1, 1);
                window.cancelAnimationFrame(this.currentAniFrame);
            }

        });

        this.currentAniFrame = window.requestAnimationFrame(this.tick);

    }

    prefix(param) {
        if (typeof this.memoized[param] !== 'undefined') {
            return this.memoized[param];
        }

        if (typeof this.style[param] !== 'undefined') {
            this.memoized[param] = param;
            return param;
        }

        const camelCase = param[0].toUpperCase() + param.slice(1),
            prefixList = ['webkit', 'moz', 'Moz', 'ms', 'o'];

        let test;
        prefixList.forEach(value => {
            test = value + camelCase;
            if (typeof this.style[test] !== 'undefined') {
                this.memoized[param] = test;
                return test;
            }

        });

    }


    check3d() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!isMobile) {
            return false;
        }

        const transform = this.prefix('transform');
        const $p = createElement('p');

        document.body.appendChild($p);
        $p.style[transform] = 'translate3d(1px,1px,1px)';

        this.has3d = $p.style[transform];
        this.has3d = this.has3d != null && this.has3d.length && this.has3d !== 'none';

        document.body.removeChild($p);

        return this.has3d;

    }

    /* translate(a, b, c) {
         typeof this.has3d !== 'undefined' || (this.has3d = this.check3d());

         c = c || 0;

         if (this.has3d) {
             return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
         } else {
             return 'translate(' + a + ', ' + b + ')';
         }
     }*/

    addAni(params) {
        console.log('-> addAni: ', params);

        const transform = this.prefix('transform');
        let startX = (params.start ? params.start.x : 0),
            startY = (params.start ? params.start.y : 0),
            startRot = (params.start ? params.start.rot : 0),
            startScale = (params.start ? params.start.scale : 0),
            startOpacity = (params.start ? params.start.opacity : 0),
            destX = params.destination.x,
            destY = params.destination.y,
            destRot = params.destination.rot,
            destScale = params.destination.scale,
            destOpacity = params.destination.opacity,
            targetX, targetY, targetRot, targetScale, targetOpacity;

        this.animationFrames(params.delay, params.duration)
            .start(function () {
                console.log('-> start animation!');

            })
            .progress(function (prog) {
                let progX, progY, progRot, progScale, progOpacity;
                switch (params.ease.apply) {
                    case 'x':
                        progX = this.ease[params.ease.type](prog);
                        progY = prog;
                        progRot = prog;
                        progScale = prog;
                        progOpacity = prog;
                        break;
                    case 'y':
                        progX = prog;
                        progY = this.ease[params.ease.type](prog);
                        progRot = prog;
                        progScale = prog;
                        progOpacity = prog;
                        break;
                    case 'all':
                        progX = this.ease[params.ease.type](prog);
                        progY = this.ease[params.ease.type](prog);
                        progRot = this.ease[params.ease.type](prog);
                        progScale = this.ease[params.ease.type](prog);
                        progOpacity = this.ease[params.ease.type](prog);
                        ;
                        break;
                }
                targetX = startX + destX * progX;
                targetY = startY + destY * progY;
                targetRot = startRot + destRot * progRot;
                targetScale = startScale + destScale * progScale;
                targetOpacity = startOpacity + destOpacity * progOpacity;


                params.target.style[transform] = translate(targetX + 'px', targetY + 'px') + (targetRot ? 'rotate(' + targetRot + 'deg)' : '') + (targetScale ? 'scale(' + targetScale + ')' : '');
                params.target.style.opacity = targetOpacity;

            })
            .end(function () {
                console.log('-> end animation!');

                if (params.callBack) params.callBack();
            });

    }

}

function translate(a, b, c) {
    typeof this.has3d !== 'undefined' || (this.has3d = this.check3d());

    c = c || 0;

    if (this.has3d) {
        return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
        return 'translate(' + a + ', ' + b + ')';
    }
}