/***
 * file name : ease.js
 * description : ease class
 * create date : 2018-06-14
 * creator : saltgamer
 ***/

export default class ease {
    constructor() {
    }

    linear(p) {
        return p;
    }

    quadIn(p) {
        return p * p;
    }

    quadOut(p) {
        return p * (2 - p);
    }

    quadInOut(p) {
        return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    }

    cubicIn(p) {
        return p * p * p;
    }

    cubicOut(p) {
        return --p * p * p + 1;
    }

    cubicInOut(p) {
        return p < 0.5 ? 4 * p * p * p : (p - 1) * (2 * p - 2) * (2 * p - 2) + 1;
    }

    quartIn(p) {
        return p * p * p * p;
    }

    quartOut(p) {
        return 1 - --p * p * p * p;
    }

    quartInOut(p) {
        return p < 0.5 ? 8 * p * p * p * p : 1 - 8 * --p * p * p * p;
    }

    quintIn(p) {
        return p * p * p * p * p;
    }

    quintOut(p) {
        return 1 + --p * p * p * p * p;
    }

    quintInOut(p) {
        return p < 0.5 ? 16 * p * p * p * p * p : 1 + 16 * --p * p * p * p * p;
    }

    elastic(p) {
        return Math.pow(2, 10 * (p - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * p);
    }

    quad(p) {
        return Math.pow(p, 2);
    }

    quint(p) {
        return Math.pow(p, 5);
    }

    circ(p) {
        return 1 - Math.sin(Math.acos(p));
    }

    back(p) {
        return Math.pow(p, 2) * ((1.5 + 1) * p - 1.5);
    }

    bounce(p) {
        for (let a = 0,
                 b = 1; 1; a += b, b /= 2) {
            if (p >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * p) / 4, 2) + Math.pow(b, 2);
            }
        }
    }

}