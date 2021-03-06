/***
 * file name : mainSection.js
 * description : mainSection functions
 * create date : 2018-06-15
 * creator : saltgamer
 ***/

import DOMBuilder from '../utility/DOMBuilder';
import {$qs, $qsa, loadJSON} from '../utility';
import Theme from '../Theme';
import LayerPop from './LayerPop';

let theme;
const dataMap = new Map();


export function mainIndexList(target) {
    return loadJSON('./data/meta.json')
        .then((meta) => {
            console.log('--> meta: ', meta);
            if (!meta) alert('[!] meta.json 파일을 불러오는데 실패했습니다 \n\n 다시 실행해주세요.');
            theme = new Theme(meta.textBookCode);
            console.log('--> theme: ', theme);
            initBackGround(target.parentNode);
            initIndexList(target, meta);

            initFooter($qs('#mainFooter'))
        });


}

function initIndexList(target, meta) {
    const indexListBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'indexListBox_' + theme.getClass()
        },
        parent: target
    });

    let secondBox;

    meta.indexList.forEach((value, idx) => {
        const firstItem = DOMBuilder.createElement('div', {
            attrs: {
                class: 'firstItem_' + theme.getClass()
            },
            parent: indexListBox
        });
        firstItem.setAttribute('index', idx);

        firstItem.addEventListener('click', (e) => {
            e.preventDefault();

            const select = $qs('#secondBox_' + e.target.getAttribute('index'));

            if (select.getAttribute('selected') === 'true') {
                select.setAttribute('selected', false);
                select.style.maxHeight = null;
            } else {
                resetIndexList();
                select.setAttribute('selected', true);
                select.style.maxHeight = select.scrollHeight + 'px';

            }

        }, false);

        if (idx === 0) {
            firstItem.style.borderTopLeftRadius = '3px';
            firstItem.style.borderTopRightRadius = '3px';
        }
        if (idx === meta.indexList.length - 1) {
            firstItem.style.borderBottomRightRadius = '3px';
            firstItem.style.borderBottomLeftRadius = '3px';
        }

        const firstItemText = DOMBuilder.createElement('div', {
            attrs: {
                class: 'firstItemText'
            },
            text: value.first.title,
            parent: firstItem
        });
        firstItemText.setAttribute('index', idx);

        if (value.first.second) {

            secondBox = DOMBuilder.createElement('div', {
                attrs: {
                    id: 'secondBox_' + idx,
                    class: 'secondBox'
                },
                parent: indexListBox
            });
            secondBox.setAttribute('selected', false);

            value.first.second.forEach((second, idx2) => {
                const secondItem = DOMBuilder.createElement('div', {
                    attrs: {
                        class: 'secondItem_' +  theme.getClass()
                    },
                    text: second.title,
                    parent: secondBox
                });

                const dataMapKey = 'data_' + idx + '_' + idx2;
                secondItem.setAttribute('dataMapKey', dataMapKey);
                dataMap.set(dataMapKey, second);

                if (second.page) secondItem.setAttribute('page', second.page);

                secondItem.addEventListener('click', (e) => {
                    e.preventDefault();

                    const page = e.target.getAttribute('page');
                    if (page) {
                        alert('ui 페이지로 이동: '+ page);
                    } else {
                        const dataMapKey = e.target.getAttribute('dataMapKey');
                        LayerPop.append({
                            parent: target.parentNode,
                            data: dataMap.get(dataMapKey),
                            theme: theme

                        });
                    }

                }, false);

                if (idx2 === 0) {
                    secondItem.style.paddingTop = '7px';
                }
                if (idx2 === value.first.second.length - 1) {
                    secondItem.style.paddingBottom = '7px';
                }

            });
        }

    });

    console.log('--> dataMap: ', dataMap);

}

export function mainTitleAni(target) {
    return theme.initTitleAni(target);

}

function initBackGround(target) {
    const mainBackGround = DOMBuilder.createElement('div', {
        attrs: {
            id: 'mainBackground'
        },
        parent: target,
        insertBefore: true
    });
    mainBackGround.style.backgroundImage = 'url(./theme/' + theme.textBookCode + '/mainBg.jpg)';

    const mainTHubLogo = DOMBuilder.createElement('img', {
        attrs: {
            class: 'mainTHubLogo',
            src: './images/tHub_logo.png'
        },
        parent: target
    });

    mainTHubLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('http://thub.kumsung.co.kr', '_blank');

    }, false);

}

function resetIndexList() {
    const secondBoxs = $qsa('.secondBox');
  /*  secondBoxs.forEach((value) => {
        value.style.maxHeight = null;
        value.setAttribute('selected', false);
    });*/
    for (let i = 0; i < secondBoxs.length; i++) {
        secondBoxs[i].style.maxHeight = null;
        secondBoxs[i].setAttribute('selected', false);
    }
}

function initFooter(target) {
    const mainFooterBox = DOMBuilder.createElement('div', {
        attrs: {
            class: 'mainFooterBox'
        },
        text: '※ 저작권자의 사전 허가 없이 학교 수업 이외의 목적으로 사용할 경우, 저작권법에 의해 처벌 받을 수 있습니다.',
        parent: target
    });

    const mainFooterUseGuideButton = DOMBuilder.createElement('div', {
        attrs: {
            class: 'mainFooterUseGuideButton'
        },
        text: '이용안내',
        parent: target
    });
    mainFooterUseGuideButton.addEventListener('click', (e) => {
        e.preventDefault();

        console.log('--> userGuide button!');

    }, false);

    const mainFooterGoldStarLogo = DOMBuilder.createElement('img', {
        attrs: {
            class: 'mainFooterGoldStarLogo',
            src: './images/goldStar_logo.png'
        },
        parent: target
    });

}

