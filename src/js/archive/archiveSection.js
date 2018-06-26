
/***
 * file name : archiveSection.js
 * description : archiveSection functions
 * create date : 2018-06-25
 * creator : saltgamer
 ***/

import {loadJSON} from '../utility';
import DOMBuilder from '../utility/DOMBuilder';
import Theme from '../Theme';
import '../../css/archive.css';

let theme;

export function addTeacherArchive(target) {
    return loadJSON('./data/archive.json')
        .then((archive) => {
            console.log('--> archive: ', archive);

            if (!archive) alert('[!] archive.json 파일을 불러오는데 실패했습니다 \n\n 다시 실행해주세요.');
            theme = new Theme(archive.textBookCode);
            initTeacherArchive(target, archive);

        });
}

function initTeacherArchive(parent, data) {


    const teacherArchiveMenu = DOMBuilder.createElement('div', {
        attrs: {
            class: 'teacherArchiveMenu_' + theme.getClass()
        },
        parent: parent
    });
    teacherArchiveMenu.setAttribute('selected', false);
    if (data.archiveData && data.archiveData.length) {
        data.archiveData.forEach((value, idx) => {
            const archiveItem = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'archiveItem'
                },
                parent: teacherArchiveMenu
            });

            if (idx === 0) {
                archiveItem.style.marginTop = '5px';
            }

            if (idx === data.archiveData.length - 1) {
                archiveItem.style.borderBottom = 0;
            }

            const archiveItemIcon = DOMBuilder.createElement('img', {
                attrs: {
                    class: 'archiveItemIcon',
                    src: './images/' + value.type + '_icon.png'
                },
                parent: archiveItem
            });

            const archiveItemLabel = DOMBuilder.createElement('div', {
                attrs: {
                    class: 'archiveItemLabel'
                },
                text: value.label,
                parent: archiveItem
            });

            archiveItemLabel.setAttribute('filePath', value.filePath);
            archiveItemLabel.addEventListener('click', (e) => {
                e.preventDefault();
                // window.location.href = e.target.getAttribute('filePath');
                window.open(e.target.getAttribute('filePath'), '_blank');
            }, false);


        });

    } else {
        alert('[!] data 폴더에 archive.json 파일에 archiveData 항목이 잘못되었습니다.');
    }


    const teacherArchiveButton = DOMBuilder.createElement('div', {
        attrs: {
            class: 'teacherArchiveButton_' + theme.getClass()
        },
        text: data.buttonText,
        parent: parent
    });

    teacherArchiveButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (teacherArchiveMenu.getAttribute('selected') === 'true') {
            teacherArchiveMenu.setAttribute('selected', false);
            teacherArchiveMenu.style.maxHeight = null;
        } else {
            teacherArchiveMenu.setAttribute('selected', true);
            teacherArchiveMenu.style.maxHeight = teacherArchiveMenu.scrollHeight + 'px';

        }


    }, false);



}


