/***
 * file name : Responsive.js
 * description : webTextBook Responsive Class
 * create date : 2018-06-20
 * creator : saltgamer
 ***/

export default class Responsive {
    constructor(params) {
        this.currentZoomRate = 0;
        this.target = params.target;
        this.baseContainer = {
            width: params.target.clientWidth,
            height: params.target.clientHeight
        };

        this.update();
        this.setScaleElement();

        window.addEventListener('resize', this.resize.bind(this), false);

        console.log('--> baseContainer: ', this.baseContainer);

    }

    update() {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // console.log('-> response screenWidth: ', this.screenWidth);
        // console.log('-> response screenHeight: ', this.screenHeight);
    }

    setScaleElement() {
        console.log('--> setScaleElement... ');

        const zoomVertical = this.screenHeight / this.baseContainer.height,
            zoomHorizontal = this.screenWidth / this.baseContainer.width;

        if (this.baseContainer.width * zoomVertical > this.screenWidth) {
            this.setTransformCSS(zoomHorizontal);
        } else {
            this.setTransformCSS(zoomVertical);
            this.target.style.left = ((this.screenWidth - (this.baseContainer.width * zoomVertical)) / 2)  + 'px';
        }

    }

    setTransformCSS(zoomRate) {
        this.currentZoomRate = zoomRate;
        this.target.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');'
            + '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform: scale(' + zoomRate + ',' + zoomRate + ');'
            + 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');
    }

    resize() {
        this.update();
        this.setScaleElement();
    }
}