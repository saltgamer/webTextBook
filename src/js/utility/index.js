/***
 * file name : utility/index.js
 * description : utility index file
 * create date : 2018-06-15
 * creator : saltgamer
 ***/

export function $qs(selector) {
    return document.querySelector(selector);
}

export function $qsa(selector) {
    return document.querySelectorAll(selector);
}

export function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function createElement(type) {
    return document.createElement(type);
}

export function loadImage (url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            // console.log('-> image loaded! ', image);
            resolve(image);
        });
        image.src = url;
    });
}

export function loadJSON (url) {
    return fetch(url).then(r => r.json());
}

export function loadImages(...paths) {
    return Promise.all(paths.map(loadImage));
}



