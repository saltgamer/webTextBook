/***
 * file name : aniDom/index.js
 * description : aniDom index file
 * create date : 2018-06-18
 * creator : saltgamer
 ***/

const defaultInstanceSettings = {
    update: undefined,
    begin: undefined,
    run: undefined,
    complete: undefined,
    loop: 1,
    direction: 'normal',
    autoPlay: true,
    offset: 0
};

export const defaultTweenSettings = {
    duration: 1000,
    delay: 0,
    easing: 'easeOutElastic',
    elasticity: 500,
    round: 0
};

export const is = {
    arr: a => Array.isArray(a),
    obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
    pth: a => is.obj(a) && a.hasOwnProperty('totalLength'),
    svg: a => a instanceof SVGElement,
    dom: a => a.nodeType || is.svg(a),
    str: a => typeof a === 'string',
    fnc: a => typeof a === 'function',
    und: a => typeof a === 'undefined',
    hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
    rgb: a => /^rgb/.test(a),
    hsl: a => /^hsl/.test(a),
    col: a => (is.hex(a) || is.rgb(a) || is.hsl(a))
};

const bezier = (() => {

    const kSplineTableSize = 11;
    const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

    function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 };
    function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 };
    function C (aA1)      { return 3.0 * aA1 };

    function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT };
    function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) };

    function binarySubdivide (aX, aA, aB, mX1, mX2) {
        let currentX, currentT, i = 0;
        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) { aB = currentT } else { aA = currentT };
        } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
        return currentT;
    }

    function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
        for (let i = 0; i < 4; ++i) {
            const currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0.0) return aGuessT;
            const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }

    function bezier(mX1, mY1, mX2, mY2) {

        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
        let sampleValues = new Float32Array(kSplineTableSize);

        if (mX1 !== mY1 || mX2 !== mY2) {
            for (let i = 0; i < kSplineTableSize; ++i) {
                sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
            }
        }

        function getTForX(aX) {

            let intervalStart = 0.0;
            let currentSample = 1;
            const lastSample = kSplineTableSize - 1;

            for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += kSampleStepSize;
            }

            --currentSample;

            const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            const guessForT = intervalStart + dist * kSampleStepSize;
            const initialSlope = getSlope(guessForT, mX1, mX2);

            if (initialSlope >= 0.001) {
                return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
            } else if (initialSlope === 0.0) {
                return guessForT;
            } else {
                return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
            }

        }

        return x => {
            if (mX1 === mY1 && mX2 === mY2) return x;
            if (x === 0) return 0;
            if (x === 1) return 1;
            return calcBezier(getTForX(x), mY1, mY2);
        }

    }

    return bezier;

})();

const easings = (() => {

    const names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ', 'Back', 'Elastic'];

    // Elastic easing adapted from jQueryUI http://api.jqueryui.com/easings/

    function elastic(t, p) {
        return t === 0 || t === 1 ? t :
            -Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2.0) * Math.asin(1))) * (Math.PI * 2)) / p );
    }

    // Approximated Penner equations http://matthewlein.com/ceaser/

    const equations = {
        In: [
            [0.550, 0.085, 0.680, 0.530], /* InQuad */
            [0.550, 0.055, 0.675, 0.190], /* InCubic */
            [0.895, 0.030, 0.685, 0.220], /* InQuart */
            [0.755, 0.050, 0.855, 0.060], /* InQuint */
            [0.470, 0.000, 0.745, 0.715], /* InSine */
            [0.950, 0.050, 0.795, 0.035], /* InExpo */
            [0.600, 0.040, 0.980, 0.335], /* InCirc */
            [0.600, -0.280, 0.735, 0.045], /* InBack */
            elastic /* InElastic */
        ], Out: [
            [0.250, 0.460, 0.450, 0.940], /* OutQuad */
            [0.215, 0.610, 0.355, 1.000], /* OutCubic */
            [0.165, 0.840, 0.440, 1.000], /* OutQuart */
            [0.230, 1.000, 0.320, 1.000], /* OutQuint */
            [0.390, 0.575, 0.565, 1.000], /* OutSine */
            [0.190, 1.000, 0.220, 1.000], /* OutExpo */
            [0.075, 0.820, 0.165, 1.000], /* OutCirc */
            [0.175, 0.885, 0.320, 1.275], /* OutBack */
            (t, f) => 1 - elastic(1 - t, f) /* OutElastic */
        ], InOut: [
            [0.455, 0.030, 0.515, 0.955], /* InOutQuad */
            [0.645, 0.045, 0.355, 1.000], /* InOutCubic */
            [0.770, 0.000, 0.175, 1.000], /* InOutQuart */
            [0.860, 0.000, 0.070, 1.000], /* InOutQuint */
            [0.445, 0.050, 0.550, 0.950], /* InOutSine */
            [1.000, 0.000, 0.000, 1.000], /* InOutExpo */
            [0.785, 0.135, 0.150, 0.860], /* InOutCirc */
            [0.680, -0.550, 0.265, 1.550], /* InOutBack */
            (t, f) => t < .5 ? elastic(t * 2, f) / 2 : 1 - elastic(t * -2 + 2, f) / 2 /* InOutElastic */
        ]
    }

    let functions = {
        linear: bezier(0.250, 0.250, 0.750, 0.750)
    }

    for (let type in equations) {
        equations[type].forEach((f, i) => {
            functions['ease'+type+names[i]] = is.fnc(f) ? f : bezier.apply(this, f);
        });
    }

    return functions;

})();

export const setTweenProgress = {
    css: (t, p, v) => t.style[p] = v,
    attribute: (t, p, v) => t.setAttribute(p, v),
    object: (t, p, v) => t[p] = v,
    transform: (t, p, v, transforms, id) => {
        if (!transforms[id]) transforms[id] = [];
        transforms[id].push(`${p}(${v})`);
    }
};

const validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'perspective'];

export function createNewInstance(params) {
    const instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    const tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    const animatables = getAnimatables(params.targets);
    const properties = getProperties(instanceSettings, tweenSettings, params);
    const animations = getAnimations(animatables, properties);
    return mergeObjects(instanceSettings, {
        children: [],
        animatables: animatables,
        animations: animations,
        duration: getInstanceTimings('duration', animations, instanceSettings, tweenSettings),
        delay: getInstanceTimings('delay', animations, instanceSettings, tweenSettings)
    });
}

function stringContains(str, text) {
    return str.indexOf(text) > -1;
}

function cloneObject(o) {
    let clone = {};
    for (let p in o) clone[p] = o[p];
    return clone;
}

export function replaceObjectProps(o1, o2) {
    let o = cloneObject(o1);
    for (let p in o1) o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    return o;
}

export function mergeObjects(o1, o2) {
    let o = cloneObject(o1);
    for (let p in o2) o[p] = is.und(o1[p]) ? o2[p] : o1[p];
    return o;
}

function parseTargets(targets) {
    const targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
    return filterArray(targetsArray, (item, pos, self) => self.indexOf(item) === pos);
}

function getAnimatables(targets) {
    const parsed = parseTargets(targets);
    return parsed.map((t, i) => {
        return {target: t, id: i, total: parsed.length};
    });
}

export function filterArray(arr, callback) {
    const len = arr.length;
    const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    let result = [];
    for (let i = 0; i < len; i++) {
        if (i in arr) {
            const val = arr[i];
            if (callback.call(thisArg, val, i, arr)) {
                result.push(val);
            }
        }
    }
    return result;
}

function flattenArray(arr) {
    return arr.reduce((a, b) => a.concat(is.arr(b) ? flattenArray(b) : b), []);
}

function getInstanceTimings(type, animations, instanceSettings, tweenSettings) {
    const isDelay = (type === 'delay');
    if (animations.length) {
        return (isDelay ? Math.min : Math.max).apply(Math, animations.map(anim => anim[type]));
    } else {
        return isDelay ? tweenSettings.delay : instanceSettings.offset + tweenSettings.delay + tweenSettings.duration;
    }
}

export function minMaxValue(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

export function getPathProgress(path, progress) {
    function point(offset = 0) {
        const l = progress + offset >= 1 ? progress + offset : 0;
        return path.el.getPointAtLength(l);
    }
    const p = point();
    const p0 = point(-1);
    const p1 = point(+1);
    switch (path.property) {
        case 'x': return p.x;
        case 'y': return p.y;
        case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
}

export function getCSSValue(el, prop) {
    if (prop in el.style) {
        return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
    }
}

function getProperties(instanceSettings, tweenSettings, params) {
    let properties = [];
    const settings = mergeObjects(instanceSettings, tweenSettings);
    for (let p in params) {
        if (!settings.hasOwnProperty(p) && p !== 'targets') {
            properties.push({
                name: p,
                offset: settings['offset'],
                tweens: normalizePropertyTweens(params[p], tweenSettings)
            });
        }
    }
    return properties;
}

function normalizePropertyTweens(prop, tweenSettings) {
    let settings = cloneObject(tweenSettings);
    if (is.arr(prop)) {
        const l = prop.length;
        const isFromTo = (l === 2 && !is.obj(prop[0]));
        if (!isFromTo) {
            // Duration divided by the number of tweens
            if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
        } else {
            // Transform [from, to] values shorthand to a valid tween value
            prop = {value: prop};
        }
    }
    return toArray(prop).map((v, i) => {
        // Default delay value should be applied only on the first tween
        const delay = !i ? tweenSettings.delay : 0;
        // Use path object as a tween value
        let obj = is.obj(v) && !is.pth(v) ? v : {value: v};
        // Set default delay value
        if (is.und(obj.delay)) obj.delay = delay;
        return obj;
    }).map(k => mergeObjects(k, settings));
}

function createAnimation(animatable, prop) {
    const animType = getAnimationType(animatable.target, prop.name);
    if (animType) {
        const tweens = normalizeTweens(prop, animatable);
        return {
            type: animType,
            property: prop.name,
            animatable: animatable,
            tweens: tweens,
            duration: tweens[tweens.length - 1].end,
            delay: tweens[0].delay
        }
    }
}

function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(animatable => {
        return properties.map(prop => {
            return createAnimation(animatable, prop);
        });
    })), a => !is.und(a));
}

function getAnimationType(el, prop) {
    if (is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
    if (is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
    if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
    if (el[prop] != null) return 'object';
}

function arrayContains(arr, val) {
    return arr.some(a => a === val);
}

export function toArray(o) {
    if (is.arr(o)) return o;
    if (is.str(o)) o = selectString(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
    return [o];
}

function normalizeTweens(prop, animatable) {
    let previousTween;
    return prop.tweens.map(t => {
        let tween = normalizeTweenValues(t, animatable);
        const tweenValue = tween.value;
        const originalValue = getOriginalTargetValue(animatable.target, prop.name);
        const previousValue = previousTween ? previousTween.to.original : originalValue;
        const from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
        const to = getRelativeValue(is.arr(tweenValue) ? tweenValue[1] : tweenValue, from);
        const unit = getUnit(to) || getUnit(from) || getUnit(originalValue);
        tween.from = decomposeValue(from, unit);
        tween.to = decomposeValue(to, unit);
        tween.start = previousTween ? previousTween.end : prop.offset;
        tween.end = tween.start + tween.delay + tween.duration;
        tween.easing = normalizeEasing(tween.easing);
        tween.elasticity = (1000 - minMaxValue(tween.elasticity, 1, 999)) / 1000;
        tween.isPath = is.pth(tweenValue);
        tween.isColor = is.col(tween.from.original);
        if (tween.isColor) tween.round = 1;
        previousTween = tween;
        return tween;
    });
}

function normalizeEasing(val) {
    return is.arr(val) ? bezier.apply(this, val) : easings[val];
}

function normalizeTweenValues(tween, animatable) {
    let t = {};
    for (let p in tween) {
        let value = getFunctionValue(tween[p], animatable);
        if (is.arr(value)) {
            value = value.map(v => getFunctionValue(v, animatable));
            if (value.length === 1) value = value[0];
        }
        t[p] = value;
    }
    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
}

function getOriginalTargetValue(target, propName) {
    switch (getAnimationType(target, propName)) {
        case 'transform': return getTransformValue(target, propName);
        case 'css': return getCSSValue(target, propName);
        case 'attribute': return target.getAttribute(propName);
    }
    return target[propName] || 0;
}

function getTransformValue(el, propName) {
    const defaultUnit = getTransformUnit(propName);
    const defaultVal = stringContains(propName, 'scale') ? 1 : 0 + defaultUnit;
    const str = el.style.transform;
    if (!str) return defaultVal;
    let match = [];
    let props = [];
    let values = [];
    const rgx = /(\w+)\((.+?)\)/g;
    while (match = rgx.exec(str)) {
        props.push(match[1]);
        values.push(match[2]);
    }
    const value = filterArray(values, (val, i) => props[i] === propName);
    return value.length ? value[0] : defaultVal;
}

function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') return 'px';
    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
}

function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) return val;
    return val(animatable.target, animatable.id, animatable.total);
}

function getRelativeValue(to, from) {
    const operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) return to;
    const u = getUnit(to) || 0;
    const x = parseFloat(from);
    const y = parseFloat(to.replace(operator[0], ''));
    switch (operator[0][0]) {
        case '+': return x + y + u;
        case '-': return x - y + u;
        case '*': return x * y + u;
    }
}

function getUnit(val) {
    const split = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) return split[2];
}

function decomposeValue(val, unit) {
    const rgx = /-?\d*\.?\d+/g;
    const value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
    return {
        original: value,
        numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
        strings: (is.str(val) || unit) ? value.split(rgx) : []
    }
}

function validateValue(val, unit) {
    if (is.col(val)) return colorToRgb(val);
    const originalUnit = getUnit(val);
    const unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    return unit && !/\s/g.test(val) ? unitLess + unit : unitLess;
}

function colorToRgb(val) {
    if (is.rgb(val)) return rgbToRgba(val);
    if (is.hex(val)) return hexToRgba(val);
    if (is.hsl(val)) return hslToRgba(val);
}

function stringToHyphens(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
