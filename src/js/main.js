/***
 * file name : main.js
 * description : webTextBook entry file
 * create date : 2018-06-14
 * creator : saltgamer
 ***/

import '../css/webTextBook.css';
import AniDom from './aniDom/AniDom';
import {mainTitleAni} from './main/mainSection';
import {$qs} from './utility';


async function main() {

    await mainTitleAni($qs('#mainTitleAni'));

    // const aniDom = new AniDom(params);
    // console.log('-> aniDom: ', aniDom);


}

window.runMain = () => {
    main();



};

/*
window.AniDom = (params) => {
    const aniDom = new AniDom(params);
    console.log('-> aniDom: ', aniDom);

};
*/

