/***
 * file name : LayerPop.js
 * description : LayerPop class
 * create date : 2018-06-22
 * creator : saltgamer
 ***/

import DOMBuilder from '../utility/DOMBuilder';
import '../../css/LayerPop.css';


export default class LayerPop {
    constructor() {
        throw new Error('--> This is static class. Creating instances is forbidden.');
    }

    static append(params) {
        console.log('--> append LayerPop: ', params);

        const layerPopContainer = DOMBuilder.createElement('div', {
            attrs: {
                class: 'layerPopContainer'
            },
            parent: params.parent
        });
        setTimeout(() => {
            layerPopContainer.style.opacity = 1;
        }, 100);
        layerPopContainer.style.transition = '0.3s';

        const layerPopBox = DOMBuilder.createElement('div', {
            attrs: {
                class: 'layerPopBox'
            },
            parent: layerPopContainer
        });

        const closeButton = DOMBuilder.createElement('img', {
            attrs: {
                class: 'closeButton',
                src: './images/main_home.png'
            },
            parent: layerPopBox
        });
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();

            LayerPop.remove(params.parent, layerPopContainer);
        }, false);

        const contentTableBox = DOMBuilder.createElement('div', {
            attrs: {
                class: 'contentTableBox'
            },
            parent: layerPopBox
        });
        LayerPop.initContents(contentTableBox, params.data, params.theme);

    }

    static initContents(target, data, theme) {
        // console.log(target, data);

        const contentTable = DOMBuilder.createElement('table', {
            attrs: {
                class: 'contentTable'
            },
            parent: target
        });

        const contentTr = DOMBuilder.createElement('tr', {
            attrs: {
                class: 'thBgColor_' + theme.getClass()
            },
            parent: contentTable
        });

        const contentTh = DOMBuilder.createElement('th', {
            attrs: {
                colspan: 3
            },
            text: data.title,
            parent: contentTr
        });


        for (let category in data.dataCategory) {
            const dataCategory = DOMBuilder.createElement('th', {
                attrs: {
                },
                text: data.dataCategory[category],
                parent: contentTr
            });

        }

        data.third.forEach((value, idx) => {
            const contentTr = DOMBuilder.createElement('tr', {
                attrs: {
                    class: 'tdBgColor_' + theme.getClass()
                },
                parent: contentTable
            });

            const tdLabel = DOMBuilder.createElement('td', {
                attrs: {
                },
                // text: value.label,
                parent: contentTr
            });

          /*  const tdLabelIcon = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'tdLabelIcon_' + idx
                },
                text: value.label,
                parent: tdLabel
            });*/
            const tdLabelIcon = DOMBuilder.createElement('img', {
                attrs: {
                    class: 'tdLabelIconImg',
                    src: './images/' + value.label
                },
                parent: tdLabel
            });


            const tdTitle = DOMBuilder.createElement('td', {
                attrs: {
                },
                text: value.title,
                parent: contentTr
            });
            tdTitle.style.textAlign = 'left';

            const tdGo = DOMBuilder.createElement('td', {
                attrs: {
                },
                parent: contentTr
            });

            const goButton = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'goButton'
                },
                text: 'go>',
                parent: tdGo
            });
            goButton.setAttribute('page', value.page);
            goButton.addEventListener('click', (e) => {
                e.preventDefault();
                // alert('go ui page: ' + e.target.getAttribute('page'));

                window.open(e.target.getAttribute('page'), '_blank');


            }, false);
            // console.log('---data: ', value);

            for (let category in data.dataCategory) {

                const dataCategory = DOMBuilder.createElement('td', {
                    attrs: {
                    },
                    text: '',
                    parent: contentTr
                });

                for (let i = 0; i < value.dataList.length; i++) {
                    if (value.dataList[i].category === category) {
                        const dataIcon = DOMBuilder.createElement('img', {
                            attrs: {
                                class: 'dataIcon',
                                src: './images/' + value.dataList[i].type + '_icon.png'
                            },
                            parent: dataCategory
                        });

                        dataIcon.setAttribute('filePath', value.dataList[i].filePath);

                        dataIcon.addEventListener('click', (e) => {
                            e.preventDefault();

                            // window.location.href = e.target.getAttribute('filePath');

                            window.open(e.target.getAttribute('filePath'), '_blank');
                        }, false);

                    }
                }


            }


        });


    }

    static remove(parent, target) {
        if (parent && target) parent.removeChild(target);
    }



}