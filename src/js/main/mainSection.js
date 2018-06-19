/***
 * file name : mainSection.js
 * description : mainSection class
 * create date : 2018-06-15
 * creator : saltgamer
 ***/

import DOMBuilder from '../utility/DOMBuilder';
import {loadImages} from '../utility';
import {initAniDom} from '../aniDom/AniDom';

export function mainTitleAni(target) {

    loadImages(
        '../src/images/bg_plant.png',
        '../src/images/monkey_leftArm.png',
        '../src/images/monkey_body.png',
        '../src/images/monkey_tail.png',
        '../src/images/monkey_rightArm.png',
        '../src/images/monkey_ear.png',
        '../src/images/monkey_head.png'
    )
        .then((img) => {
            // console.log('- img: ', img);

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


        });

    loadImages(
        '../src/images/boy_arm.png',
        '../src/images/boy_body_tree.png',
        '../src/images/boy_head.png'
    )
        .then((img) => {
            // console.log('- img: ', img);

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
                duration: 2500
            })
                .add({
                    targets: img[0],
                    translateX: 0,
                    translateY: 0,
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


        });

}