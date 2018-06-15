/***
 * file name : main.js
 * description : webTextBook entry file
 * create date : 2018-06-14
 * creator : saltgamer
 ***/

import '../css/webTextBook.css';
import AniDom from './aniDom/AniDom';






window.AniDom = (params) => {
    const aniDom = new AniDom(params);
    console.log('-> aniDom: ', aniDom);

};

