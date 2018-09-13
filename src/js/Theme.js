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
    constructor(code) {
        this.textBookCode = code;
        this.class = this.getClass();


    }

    getClass() {
        let code;
        switch (this.textBookCode) {
            case 'art_5':
                code = 'theme_el_art5';
                break;
            case 'mus_5':
                code = 'theme_el_mus5';
                break;
            case 'pra_5':
                code = 'theme_el_pra5';
                break;
            case 'gym_5':
                code = 'theme_el_phy5';
                break;
        }

        return code;

    }


    initTitleAni(target) {

        switch (this.textBookCode) {
            case 'art_5':
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
            case 'mus_5':
                return Promise.all([
                    loadMusBoyImg(this.textBookCode),
                    loadMusGirlImg(this.textBookCode),
                    loadETCImg(this.textBookCode)

                ])
                    .then((imgs) => {
                        console.log('--> imgs: ', imgs);
                        setMusBoyAni(target, imgs[0]);
                        setMusGirlAni(target, imgs[1]);
                        setMusETCAni(target, imgs[2]);


                        Loading.hide();
                    });

            case 'pra_5':
                return Promise.all([
                    loadPraBoyImg(this.textBookCode),
                    loadPraGirlImg(this.textBookCode),
                    loadPraRabbitImg(this.textBookCode),
                    loadPraTurtleImg(this.textBookCode),
                    loadPraDogImg(this.textBookCode)

                ])
                    .then((imgs) => {
                        console.log('--> imgs: ', imgs);
                        setPraBoyAni(target, imgs[0]);
                        setPraGirlAni(target, imgs[1]);
                        setPraRabbitAni(target, imgs[2]);
                        setPraTurtleAni(target, imgs[3]);
                        setPraDogAni(target, imgs[4]);


                        Loading.hide();
                    });
            case 'gym_5':
                Loading.hide();
                break;

            default:
                alert('[!] textBookCode가 잘못되었습니다. \n 현재 사용하지 않는 코드입니다.');
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

function loadMusBoyImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/boyBody.png',
        './theme/' + textBookCode + '/boyHead.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadMusGirlImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/girlBody.png',
        './theme/' + textBookCode + '/girlHead.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadETCImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/star1.png',
        './theme/' + textBookCode + '/star2.png',
        './theme/' + textBookCode + '/star3.png',
        './theme/' + textBookCode + '/note1.png',
        './theme/' + textBookCode + '/note2.png',
        './theme/' + textBookCode + '/note3.png',
        './theme/' + textBookCode + '/note4.png',
        './theme/' + textBookCode + '/note5.png',
        './theme/' + textBookCode + '/note6.png',
        './theme/' + textBookCode + '/note7.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadPraBoyImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/boy_body.png',
        './theme/' + textBookCode + '/boy_head.png',
        './theme/' + textBookCode + '/boy_hand.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadPraGirlImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/girl_body.png',
        './theme/' + textBookCode + '/girl_head.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadPraRabbitImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/rabbit_body.png',
        './theme/' + textBookCode + '/rabbit_leftArm.png',
        './theme/' + textBookCode + '/rabbit_rightArm.png',
        './theme/' + textBookCode + '/rabbit_effect1.png',
        './theme/' + textBookCode + '/rabbit_effect2.png',
        './theme/' + textBookCode + '/rabbit_effect3.png',
        './theme/' + textBookCode + '/rabbit_effect4.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadPraTurtleImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/turtle_body.png',
        './theme/' + textBookCode + '/turtle_leftArm.png',
        './theme/' + textBookCode + '/turtle_rightArm.png',
        './theme/' + textBookCode + '/turtle_effect1.png',
        './theme/' + textBookCode + '/turtle_effect2.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function loadPraDogImg(textBookCode) {
    return loadImages(
        './theme/' + textBookCode + '/dog_head.png',
        './theme/' + textBookCode + '/dog_closeEye.png',
        './theme/' + textBookCode + '/dog_heart1.png',
        './theme/' + textBookCode + '/dog_heart2.png'
    )
        .then((img) => {
            // console.log('--> load img: ', img);
            return img;
        });
}

function setPraBoyAni(target, img) {
    const praBoyBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'praBoyBox'
        },
        parent: target
    });

    img[0].className = 'praBoy_body';
    img[1].className = 'praBoy_head';
    img[2].className = 'praBoy_hand';

    praBoyBox.appendChild(img[0]);
    praBoyBox.appendChild(img[1]);
    praBoyBox.appendChild(img[2]);

    const boyHeadAni = initAniDom({
        direction: 'normal',
        loop: true,

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

function setPraGirlAni(target, img) {
    const praGirlBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'praGirlBox'
        },
        parent: target
    });

    img[0].className = 'praGirl_body';
    img[1].className = 'praGirl_head';

    praGirlBox.appendChild(img[0]);
    praGirlBox.appendChild(img[1]);

    const girlHeadAni = initAniDom({
        direction: 'normal',
        loop: true
    });
    girlHeadAni.add({
        targets: img[1],
        rotate: -5,
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

function setPraRabbitAni(target, img) {
    const praRabbitBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'praRabbitBox'
        },
        parent: target
    });

    img[0].className = 'praRabbit_body';
    img[1].className = 'praRabbit_leftArm';
    img[2].className = 'praRabbit_rightArm';
    img[3].className = 'praRabbit_effect1';
    img[4].className = 'praRabbit_effect2';
    img[5].className = 'praRabbit_effect3';
    img[6].className = 'praRabbit_effect4';


    praRabbitBox.appendChild(img[1]);
    praRabbitBox.appendChild(img[2]);
    praRabbitBox.appendChild(img[0]);
    praRabbitBox.appendChild(img[3]);
    praRabbitBox.appendChild(img[4]);
    praRabbitBox.appendChild(img[5]);
    praRabbitBox.appendChild(img[6]);


    const rightArmAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    rightArmAni.add({
        targets: img[2],
        rotate: -7,
        duration: 2500
    })
        .add({
            targets: img[2],
            rotate: 0,
            duration: 2500
        });

    const leftArmAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    leftArmAni.add({
        targets: img[1],
        rotate: 7,
        duration: 2500
    })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2500
        });

    const effect1Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect1Ani.add({
        targets: img[3],
        translateX: 2,
        translateY: -4,
        duration: 350
    })
        .add({
            targets: img[3],
            translateX: 0,
            translateY: 0,
            duration: 850
        });

    const effect2Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect2Ani.add({
        targets: img[4],
        translateX: 1,
        translateY: -3,
        duration: 350
    })
        .add({
            targets: img[4],
            translateX: 0,
            translateY: 0,
            duration: 850
        });

    const effect3Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect3Ani.add({
        targets: img[5],
        translateX: 4,
        translateY: 1,
        duration: 350
    })
        .add({
            targets: img[5],
            translateX: 0,
            translateY: 0,
            duration: 850
        });

    const effect4Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect4Ani.add({
        targets: img[6],
        translateX: -4,
        translateY: 1,
        duration: 350
    })
        .add({
            targets: img[6],
            translateX: 0,
            translateY: 0,
            duration: 850
        });
}

function setPraTurtleAni(target, img) {
    const praTurtleBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'praTurtleBox'
        },
        parent: target
    });

    img[0].className = 'praTurtle_body';
    img[1].className = 'praTurtle_leftArm';
    img[2].className = 'praTurtle_rightArm';
    img[3].className = 'praTurtle_effect1';
    img[4].className = 'praTurtle_effect2';

    praTurtleBox.appendChild(img[0]);
    praTurtleBox.appendChild(img[1]);
    praTurtleBox.appendChild(img[2]);

    praTurtleBox.appendChild(img[3]);
    praTurtleBox.appendChild(img[4]);


    const rightArmAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    rightArmAni.add({
        targets: img[2],
        rotate: -9,
        duration: 2400
    })
        .add({
            targets: img[2],
            rotate: 0,
            duration: 2400
        });

    const leftArmAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    leftArmAni.add({
        targets: img[1],
        rotate: 9,
        duration: 2400
    })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 2400
        });

    const effect1Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect1Ani.add({
        targets: img[3],
        translateX: -2,
        translateY: 4,
        duration: 300
    })
        .add({
            targets: img[3],
            translateX: 0,
            translateY: 0,
            duration: 800
        });

    const effect2Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect2Ani.add({
        targets: img[4],
        translateX: -2,
        translateY: -3,
        duration: 300
    })
        .add({
            targets: img[4],
            translateX: 0,
            translateY: 0,
            duration: 800
        });


}

function setPraDogAni(target, img) {
    const praDogBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'praDogBox'
        },
        parent: target
    });

    img[0].className = 'praDog_head';
    img[1].className = 'praDog_closeEye';
    img[2].className = 'praDog_heart1';
    img[3].className = 'praDog_heart2';

    praDogBox.appendChild(img[0]);
    praDogBox.appendChild(img[1]);
    praDogBox.appendChild(img[2]);
    praDogBox.appendChild(img[3]);

    const eyeAni = initAniDom({
        direction: 'normal',
        // easing: 'linear',
        loop: true
    });
    eyeAni.add({
        targets: img[1],
        opacity: 0,
        duration: 500
    })
        .add({
            targets: img[1],
            opacity: 1,
            duration: 500
        });


    const effect1Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect1Ani.add({
        targets: img[2],
        translateX: -2,
        translateY: 4,
        duration: 300
    })
        .add({
            targets: img[2],
            translateX: 0,
            translateY: 0,
            duration: 800
        });

    const effect2Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    effect2Ani.add({
        targets: img[3],
        translateX: -2,
        translateY: -3,
        duration: 300
    })
        .add({
            targets: img[3],
            translateX: 0,
            translateY: 0,
            duration: 800
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
        easing: 'linear',
        loop: true
    });
    swingAni.add({
        targets: img[0],
        rotate: 15,
        duration: 1500
    })
        .add({
            targets: img[0],
            rotate: 0,
            duration: 1500
        })

}

function setMusBoyAni(target, img) {
    const musBoyBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'musBoyBox'
        },
        parent: target
    });

    img[0].className = 'musBoy_body';
    img[1].className = 'musBoy_head';

    musBoyBox.appendChild(img[0]);
    musBoyBox.appendChild(img[1]);

    const boyHeadAni = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    boyHeadAni.add({
        targets: img[1],
        rotate: -10,
        duration: 300
    })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 300
        })
        .add({
            targets: img[1],
            rotate: 10,
            duration: 300
        })
        .add({
            targets: img[1],
            rotate: 0,
            duration: 300
        });

    const musBoyBoxAni = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musBoyBoxAni.add({
        targets: musBoyBox,
        translateX: 10,
        translateY: -80,
        duration: 400
    })
        .add({
            targets: musBoyBox,
            translateX: 0,
            translateY: 0,
            duration: 900
        });


}

function setMusGirlAni(target, img) {
    const musGirlBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'musGirlBox'
        },
        parent: target
    });

    img[0].className = 'musGirl_body';
    img[1].className = 'musGirl_head';

    musGirlBox.appendChild(img[0]);
    musGirlBox.appendChild(img[1]);

    const girlAni = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    girlAni.add({
        targets: musGirlBox,
        translateX: 10,
        translateY: -80,
        duration: 500
    })
        .add({
            targets: musGirlBox,
            translateX: 0,
            translateY: 0,
            duration: 1000
        });

    /*  .add({
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
      });*/

}

function setMusETCAni(target, img) {
    const musETCBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'musETClBox'
        },
        parent: target
    });

    img[0].className = 'musStar1';
    img[1].className = 'musStar2';
    img[2].className = 'musStar3';
    img[3].className = 'musNote1';
    img[4].className = 'musNote2';
    img[5].className = 'musNote3';
    img[6].className = 'musNote4';
    img[7].className = 'musNote5';
    img[8].className = 'musNote6';
    img[9].className = 'musNote7';

    musETCBox.appendChild(img[0]);
    musETCBox.appendChild(img[1]);
    musETCBox.appendChild(img[2]);
    musETCBox.appendChild(img[3]);
    musETCBox.appendChild(img[4]);
    musETCBox.appendChild(img[5]);
    musETCBox.appendChild(img[6]);
    musETCBox.appendChild(img[7]);
    musETCBox.appendChild(img[8]);
    musETCBox.appendChild(img[9]);

    const musStar1Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musStar1Ani.add({
        targets: img[0],
        translateX: 5,
        translateY: -20,
        duration: 300
    })
        .add({
            targets: img[0],
            translateX: 0,
            translateY: 0,
            duration: 800
        });

    const musStar2Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musStar2Ani.add({
        targets: img[1],
        translateX: -5,
        translateY: -15,
        duration: 350
    })
        .add({
            targets: img[1],
            translateX: 0,
            translateY: 0,
            duration: 850
        });

    const musStar3Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musStar3Ani.add({
        targets: img[2],
        translateX: 10,
        translateY: -20,
        duration: 300
    })
        .add({
            targets: img[2],
            translateX: 0,
            translateY: 0,
            duration: 750
        });

    const musNote1Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote1Ani.add({
        targets: img[3],
        translateX: -5,
        translateY: -5,
        duration: 500
    })
        .add({
            targets: img[3],
            translateX: 5,
            translateY: 5,
            duration: 500
        })
        .add({
            targets: img[3],
            translateX: 0,
            translateY: 0,
            duration: 500
        });

    const musNote2Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote2Ani.add({
        targets: img[4],
        translateX: -6,
        translateY: -6,
        duration: 400
    })
        .add({
            targets: img[4],
            translateX: 6,
            translateY: 6,
            duration: 400
        })
        .add({
            targets: img[4],
            translateX: 0,
            translateY: 0,
            duration: 400
        });

    const musNote3Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote3Ani.add({
        targets: img[5],
        translateX: -4,
        translateY: -4,
        duration: 450
    })
        .add({
            targets: img[5],
            translateX: 4,
            translateY: 4,
            duration: 450
        })
        .add({
            targets: img[5],
            translateX: 0,
            translateY: 0,
            duration: 450
        });

    const musNote4Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote4Ani.add({
        targets: img[6],
        translateX: 3,
        translateY: -3,
        duration: 350
    })
        .add({
            targets: img[6],
            translateX: 3,
            translateY: 3,
            duration: 350
        })
        .add({
            targets: img[6],
            translateX: 0,
            translateY: 0,
            duration: 350
        });

    const musNote5Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote5Ani.add({
        targets: img[7],
        translateX: -5,
        translateY: -5,
        duration: 500
    })
        .add({
            targets: img[7],
            translateX: 5,
            translateY: 5,
            duration: 500
        })
        .add({
            targets: img[7],
            translateX: 0,
            translateY: 0,
            duration: 500
        });

    const musNote6Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote6Ani.add({
        targets: img[8],
        translateX: -6,
        translateY: -6,
        duration: 400
    })
        .add({
            targets: img[8],
            translateX: 6,
            translateY: 6,
            duration: 400
        })
        .add({
            targets: img[8],
            translateX: 0,
            translateY: 0,
            duration: 400
        });

    const musNote7Ani = initAniDom({
        direction: 'normal',
        easing: 'linear',
        loop: true
    });
    musNote7Ani.add({
        targets: img[9],
        translateX: 4,
        translateY: -4,
        duration: 300
    })
        .add({
            targets: img[9],
            translateX: 4,
            translateY: 4,
            duration: 300
        })
        .add({
            targets: img[9],
            translateX: 0,
            translateY: 0,
            duration: 300
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