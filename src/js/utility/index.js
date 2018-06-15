export function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function createElement(type) {
    return document.createElement(type);
}