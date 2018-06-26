/***
 * file name : Theme.js
 * description : webTextBook Theme Class
 * create date : 2018-06-21
 * creator : saltgamer
 ***/
import {loadImages} from './utility';
import {initAniDom} from './aniDom/AniDom';
import Loading from './Loading';
import DOMBuilder from './utility/DOMBuilder';

import '../css/Theme.css';

export default class Theme {
    constructor(textBookCode) {
        this.textBookCode = textBookCode;
        this.class = this.getClass();


    }

    getClass() {
        let code;
        switch (this.textBookCode) {
            case 'EL_ART1':
                code = 'theme_el_art1';
                break;
        }

        return code;

    }


    initTitleAni(target) {

        switch (this.textBookCode) {
            case 'EL_ART1':

                return Promise.all([
                    loadBoyImg(this.textBookCode),
                    loadMonkeyImg(this.textBookCode)
                ])
                    .then((imgs) => {
                        console.log('--> imgs: ', imgs);
                        setMonkeyAni(target, imgs[1]);
                        setBoyAni(target, imgs[0]);

                        Loading.hide();
                    });


                // break;
            default:
                alert('textBookCode가 잘못되었습니다.');
                break;
        }


    }

}


function loadBoyImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/boy_arm.png',
        './theme/' + textBookCode + '/boy_body_tree.png',
        './theme/' + textBookCode + '/boy_head.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadMonkeyImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/bg_plant.png',
        './theme/' + textBookCode + '/monkey_leftArm.png',
        './theme/' + textBookCode + '/monkey_body.png',
        './theme/' + textBookCode + '/monkey_tail.png',
        './theme/' + textBookCode + '/monkey_rightArm.png',
        './theme/' + textBookCode + '/monkey_ear.png',
        './theme/' + textBookCode + '/monkey_head.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function setBoyAni(target, img) {
    const boy = DOMBuilder.createElement('div', {
        attrs: {
            class: 'boyBox'
        },
        parent: target
    });

    img[0].className = 'boyArm';
    img[1].className = 'boyBody';
    img[2].className = 'boyHead';

    boy.appendChild(img[0]);
    boy.appendChild(img[1]);
    boy.appendChild(img[2]);

    const boyArmAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    boyArmAni.add({
        targets: img[0],
        translateX: 10,
        translateY: -10,
        rotate: 0.1,
        duration: 2500
    })
        .add({
            targets: img[0],
            translateX: 0,
            translateY: 0,
            rotate: 0.1,
            duration: 2500
        });

    const boyHeadAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    boyHeadAni.add({
        targets: img[2],
        rotate: -5,
        duration: 2500
    })
        .add({
            targets: img[2],
            rotate: 0,
            duration: 2500
        });
}

function setMonkeyAni(target, img) {
    img[0].className = 'bgPlant';
    target.appendChild(img[0]);

    const monkey = DOMBuilder.createElement('div', {
        attrs: {
            class: 'monkeyBox'
        },
        parent: target
    });

    img[1].className = 'monkeyLeftArm';
    img[2].className = 'monkeyBody';
    img[3].className = 'monkeyTail';
    img[4].className = 'monkeyRightArm';
    img[5].className = 'monkeyEar';
    img[6].className = 'monkeyHead';

    monkey.appendChild(img[1]);
    monkey.appendChild(img[2]);
    monkey.appendChild(img[3]);
    monkey.appendChild(img[4]);
    monkey.appendChild(img[5]);
    monkey.appendChild(img[6]);

    const monkeyEarAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    monkeyEarAni.add({
        targets: img[5],
        translateX: 5,
        translateY: -5,
        rotate: 0.1,
        scale: (el, i, l) => {
            return (l - i) + .25;
        },
        duration: 2500
    })
        .add({
            targets: img[5],
            translateX: 0,
            translateY: 0,
            rotate: 0.1,
            scale: (el, i, l) => {
                return (l - i) - .01;
            },
            duration: 2500
        });

    const monkeyHeadAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    monkeyHeadAni.add({
        targets: img[6],
        translateX: 5,
        translateY: -2,
        rotate: 0.1,
        duration: 2500
    })
        .add({
            targets: img[6],
            translateX: 0,
            translateY: 0,
            rotate: 0.1,
            duration: 2500
        });

    const monkeyRightArmAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    monkeyRightArmAni.add({
        targets: img[4],
        rotate: -4,
        duration: 2500
    })
        .add({
            targets: img[4],
            rotate: 0,
            duration: 2500
        });

    const monkeyLeftArmAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    monkeyLeftArmAni.add({
        targets: img[1],
        rotate: 7,
        duration: 2500
    })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2500
        });

    const monkeyTailAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    monkeyTailAni.add({
        targets: img[3],
        rotate: 10,
        duration: 2500
    })
        .add({
            targets: img[3],
            rotate: 0,
            duration: 2500
        });
}