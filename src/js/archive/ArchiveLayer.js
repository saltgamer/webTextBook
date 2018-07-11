/***
 * file name : ArchiveLayer.js
 * description : archiveLayer class
 * create date : 2018-07-10
 * creator : saltgamer
 ***/

import DOMBuilder from '../utility/DOMBuilder';
import '../../css/ArchiveLayer.css';
import {$qs} from '../utility';

export default class ArchiveLayer {
    constructor() {
        throw new Error('--> This is static class. Creating instances is forbidden.');
    }

    static appendArchive(params) {
        console.log('--> appendArchive: ', params);

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

        const archiveTitleBar = DOMBuilder.createElement('div', {
            attrs: {
                class: 'archiveTitleBar'
            },
            text: '선생님 자료실',
            parent: layerPopBox
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

            ArchiveLayer.remove(params.parent, layerPopContainer);
        }, false);

        ArchiveLayer.initAside(layerPopBox, params.data);

        const archiveContentTableBox = DOMBuilder.createElement('div', {
            attrs: {
                class: 'archiveContentTableBox'
            },
            parent: layerPopBox
        });

        ArchiveLayer.initArchiveTable(archiveContentTableBox, params.data, 0);
    }

    static remove(parent, target) {
        if (parent && target) parent.removeChild(target);
    }

    static initAside(target, data) {
        const archiveAside = DOMBuilder.createElement('div', {
            attrs: {
                class: 'archiveAside'
            },
            parent: target
        });

        const fixedPanel = DOMBuilder.createElement('div', {
            attrs: {
                class: 'fixedPanel'
            },
            text: '수업 자료',
            parent: archiveAside
        });

        data.archiveData.forEach((value, idx) => {
            const asidePanel = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'asidePanel',
                    archiveIndex: idx
                },
                text: value.title,
                parent: archiveAside
            });
            asidePanel.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(e.target);
                ArchiveLayer.initArchiveTable($qs('.archiveContentTableBox'), data, e.target.getAttribute('archiveIndex'));
            }, false);

        });


    }

    static initArchiveTable(target, data, archiveIndex) {
        console.log('-- initArchiveTable: ', archiveIndex);
        // archiveIndex = parseInt(archiveIndex);
        target.innerHTML = '';

        const contentTable = DOMBuilder.createElement('table', {
            attrs: {
                class: 'archiveTable'
            },
            parent: target
        });

        const contentTr1 = DOMBuilder.createElement('tr', {
            attrs: {
                class: 'archiveTrBgStyle'
            },
            parent: contentTable
        });

        const contentTr2 = DOMBuilder.createElement('tr', {
            attrs: {
                class: 'archiveTrBgStyle'
            },
            parent: contentTable
        });

        data.category.forEach((value, idx) => {
            const contentTh1 = DOMBuilder.createElement('th', {
                attrs: {
                    class: 'archiveThStyle',
                    width: value.width
                },
                text: value.label,
                parent: contentTr1
            });

            if (!value.subTitle) {
                contentTh1.setAttribute('rowspan', 2);
            }

            if (value.subTitle) {
                contentTh1.setAttribute('colspan', 2);
                value.subTitle.forEach((item) => {
                    const contentTh2 = DOMBuilder.createElement('th', {
                        attrs: {
                            class: 'archiveThStyle',
                        },
                        text: item.label,
                        parent: contentTr2
                    });
                });

            }

            if (idx === data.category.length - 1) {
                contentTh1.style.borderRight = 0;
            }

        });

        data.archiveData[archiveIndex].datas.forEach((archiveData) => {
            const archiveDataTr = DOMBuilder.createElement('tr', {
                attrs: {
                    class: 'archiveDataTrStyle'
                },
                parent: contentTable
            });

            const archiveDataTd1 = DOMBuilder.createElement('td', {
                attrs: {
                    class: 'archiveDataTdStyle',
                },
                text: archiveData[data.category[0].name],
                parent: archiveDataTr
            });

            for (let i = 0; i < data.category.length - 1; i++) {
                ArchiveLayer.appendIcon(archiveDataTr, i + 1, data, archiveData);
            }


        });


    }

    static appendIcon(target, index, data, archiveData) {

        const aData = archiveData[data.category[index].name];
        if (aData.length || aData.length === 0) {

            const archiveDataTd2 = DOMBuilder.createElement('td', {
                attrs: {
                    class: 'archiveDataTdStyle',
                },
                parent: target
            });
            if (aData.length > 0) {
                for (let i = 0; i < aData.length; i++) {
                    if (aData[i].showName) {
                        const archiveName = DOMBuilder.createElement('div', {
                            attrs: {
                                class: 'archiveName',
                                filePath: aData[i].filePath
                            },
                            text: aData[i].name,
                            parent: archiveDataTd2
                        });
                        archiveName.addEventListener('click', (e) => {
                            e.preventDefault();
                            window.open(e.target.getAttribute('filePath'), '_blank');

                        }, false);
                    } else {
                        const archiveIcon = DOMBuilder.createElement('img', {
                            attrs: {
                                class: 'archiveIcon',
                                filePath: aData[i].filePath,
                                src: './images/iconSmall_' + aData[i].type.toLowerCase() + '.png'
                            },
                            parent: archiveDataTd2
                        });
                        archiveIcon.addEventListener('click', (e) => {
                            e.preventDefault();
                            window.open(e.target.getAttribute('filePath'), '_blank');

                        }, false);
                    }

                }
            }

        } else {
            for (let index in aData) {
                const archiveDataTd2 = DOMBuilder.createElement('td', {
                    attrs: {
                        class: 'archiveDataTdStyle',
                    },
                    parent: target
                });
                const subData = aData[index];
                for (let i = 0; i < subData.length; i++) {

                    if (subData[i].showName) {
                        const archiveName = DOMBuilder.createElement('div', {
                            attrs: {
                                class: 'archiveName',
                                filePath: subData[i].filePath
                            },
                            text: subData[i].name,
                            parent: archiveDataTd2
                        });
                        archiveName.addEventListener('click', (e) => {
                            e.preventDefault();
                            window.open(e.target.getAttribute('filePath'), '_blank');

                        }, false);
                    } else {
                        const archiveIcon = DOMBuilder.createElement('img', {
                            attrs: {
                                class: 'archiveIcon',
                                filePath: subData[i].filePath,
                                src: './images/iconSmall_' + subData[i].type.toLowerCase() + '.png'
                            },
                            parent: archiveDataTd2
                        });
                        archiveIcon.addEventListener('click', (e) => {
                            e.preventDefault();
                            window.open(e.target.getAttribute('filePath'), '_blank');

                        }, false);
                    }

                }
            }

        }


    }


}