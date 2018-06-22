/***
 * file name : mainSection.js
 * description : mainSection class
 * create date : 2018-06-15
 * creator : saltgamer
 ***/

import DOMBuilder from '../utility/DOMBuilder';
import {$qs, loadJSON} from '../utility';
import Theme from "../Theme";

let theme;

export function mainIndexList(target) {
    return loadJSON('./data/meta.json')
        .then((meta) => {
            console.log('--> meta: ', meta);
            theme = new Theme(meta.textBookCode);
            console.log('--> theme: ', theme);
            initBackGround(target.parentNode);
            initIndexList(target, meta);


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
                // select.style.display = 'none';
            } else {
                select.setAttribute('selected', true);
                // select.style.display = 'block';
            }

            if (select.style.maxHeight) {
                select.style.maxHeight = null;
            } else {
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

                if (idx2 === 0) {
                    secondItem.style.paddingTop = '7px';
                }
                if (idx2 === value.first.second.length - 1) {
                    secondItem.style.paddingBottom = '7px';
                }


            });
        }




    });

}

export function mainTitleAni(target) {
    theme.initTitleAni(target);

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
}

