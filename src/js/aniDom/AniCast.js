/***
 * file name : AniCast.js
 * description : AniCast class
 * create date : 2018-06-14
 * creator : saltgamer
 ***/

export default class AniCast {
    constructor(animation) {
        this.animation = animation;
    }

    start(callBack) {
        this.animation.startCallBack = callBack;

        return this;
    }

    progress(callBack) {
        this.animation.progressCallBack = callBack;

        return this;
    }

    end(callBack) {
        this.animation.endCallBack = callBack;

        return this;
    }

}