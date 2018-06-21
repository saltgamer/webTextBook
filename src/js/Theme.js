/***
 * file name : Theme.js
 * description : webTextBook Theme Class
 * create date : 2018-06-21
 * creator : saltgamer
 ***/

export default class Theme {
    constructor(textBookCode) {
        this.textBookCode = textBookCode;
        this.class = this.getClass();


    }

   getClass() {
        let code;
        switch (this.textBookCode) {
            case 'EL_ART1':
                code = 'theme_el_art1';
                break;
        }

        return code;

    }



}