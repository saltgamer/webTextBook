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
            case 'EL_ART5':
                code = 'theme_el_art5';
                break;
            case 'EL_MUS5':
                code = 'theme_el_mus5';
                break;
            case 'EL_PRA5':
                code = 'theme_el_pra5';
                break;
            case 'EL_PHY5':
                code = 'theme_el_phy5';
                break;
        }

        return code;

    }


    initTitleAni(target) {

        switch (this.textBookCode) {
            case 'EL_ART5':
                return Promise.all([
                    loadArtGirlImg(this.textBookCode),
                    loadArtBoyImg(this.textBookCode),
                    loadSwing(this.textBookCode)
                ])
                    .then((imgs) => {
                        console.log('--> imgs: ', imgs);
                        setArtGirlAni(target, imgs[0]);
                        setArtBoyAni(target, imgs[1]);
                        setSwingAni(target, imgs[2]);

                        Loading.hide();
                    });

            // break;
            case 'EL_MUS5':
            case 'EL_PHY5':
            case 'EL_PRA5':
                Loading.hide();
                break;

            default:
                alert('textBookCode가 잘못되었습니다. \n 현재 사용하지 않는 코드입니다.');
                break;
        }


    }

}

function loadArtGirlImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/girl_body.png',
        './theme/' + textBookCode + '/girl_head.png',
        './theme/' + textBookCode + '/girl_hand.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadArtBoyImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/boy_body.png',
        './theme/' + textBookCode + '/boy_head1.png',
        './theme/' + textBookCode + '/boy_hand.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadSwing(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/swing.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
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

function setArtGirlAni(target, img) {
    const artGirlBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'artGirlBox'
        },
        parent: target
    });

    img[0].className = 'artGirl_body';
    img[1].className = 'artGirl_head';
    img[2].className = 'artGirl_hand';

    artGirlBox.appendChild(img[0]);
    artGirlBox.appendChild(img[1]);
    artGirlBox.appendChild(img[2]);

    const girlHeadAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    girlHeadAni.add({
        targets: img[1],
        rotate: -15,
        duration: 2500
    })
    /*.add({
        targets: img[1],
        rotate: 0,
        duration: 1500
    })*/
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2500
        })
        .add({
            targets: img[1],
            rotate: 10,
            duration: 2500
        })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2500
        });


}

function setArtBoyAni(target, img) {
    const artBoyBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'artBoyBox'
        },
        parent: target
    });

    img[0].className = 'artBoy_body';
    img[1].className = 'artBoy_head';
    img[2].className = 'artBoy_hand';

    artBoyBox.appendChild(img[0]);
    artBoyBox.appendChild(img[1]);
    artBoyBox.appendChild(img[2]);

    const boyHeadAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    boyHeadAni.add({
        targets: img[1],
        rotate: -15,
        duration: 2000
    })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2000
        })
        .add({
            targets: img[1],
            rotate: 15,
            duration: 2000
        })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2000
        });


}

function setSwingAni(target, img) {
    const swingBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'swingBox'
        },
        parent: target
    });

    img[0].className = 'swing';

    swingBox.appendChild(img[0]);

    const swingAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    swingAni.add({
        targets: img[0],
        rotate: 20,
        duration: 1000
    })
        .add({
            targets: img[0],
            rotate: 0,
            duration: 1000
        })

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