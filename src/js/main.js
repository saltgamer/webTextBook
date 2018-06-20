/***
 * file name : main.js
 * description : webTextBook entry file
 * create date : 2018-06-14
 * creator : saltgamer
 ***/

import '../css/webTextBook.css';
import {mainIndexList, mainTitleAni} from './main/mainSection';
import {$qs} from './utility';
import Responsive from './Rsponsive';
import Loading from './Loading';



async function main() {
    Loading.show();

    const responsive = new Responsive({
        target: $qs('#mainContainer')
    });
    await mainTitleAni($qs('#mainTitleAni'));
    await mainIndexList($qs('#mainIndexList'));

}

window.runMain = () => {
    main();
};


