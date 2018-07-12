/***
 * file name : main.js
 * description : webTextBook entry file
 * create date : 2018-06-14
 * creator : saltgamer
 ***/

import '../css/webTextBook.css';
import {mainIndexList, mainTitleAni} from './main/mainSection';
import {$qs, getURLParameter} from './utility';
import Responsive from './Rsponsive';
import Loading from './Loading';
import {addTeacherArchive} from './archive/archiveSection';

function main() {
    Loading.show();

    const code = getURLParameter('code');
    if (!code) {
        alert('url 주소에 과목 코드 값이 없습니다. \n main.html?code= 값을 입력해주세요!');
    }

    mainIndexList($qs('#mainIndexList'), code)
        .then(() => {
            console.log('-- step1');
            return mainTitleAni($qs('#mainTitleAni'));
        })
        .then(() => {
            console.log('-- step2');
            const responsive = new Responsive({
                target: $qs('#mainContainer')
            });
        });

    addTeacherArchive($qs('#teacherArchive'), code);


}

window.runMain = () => {
    main();
};


