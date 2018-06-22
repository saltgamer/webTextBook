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



/*async function main() {
    Loading.show();

    const responsive = new Responsive({
        target: $qs('#mainContainer')
    });
    await mainIndexList($qs('#mainIndexList'));
    await mainTitleAni($qs('#mainTitleAni'));


}*/
function main() {
    Loading.show();

    const responsive = new Responsive({
        target: $qs('#mainContainer')
    });
    
    mainIndexList($qs('#mainIndexList'))
        .then(() => {
            mainTitleAni($qs('#mainTitleAni'));
        });



}

window.runMain = () => {
    main();
};


