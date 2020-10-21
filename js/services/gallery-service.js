'use strict'

var gImgNextId = 1;
var gImages;

_createImages();

function getImages() {
    return gImages;
}

function _createImage(url) {
    return {
        id: gImgNextId++,
        url,
        // keywords: ['happy'],
    }
}

function _createImages() {
    var images = [];
    for (let i = 1; i < 19; i++) {
        images.push(_createImage(`./imgs/${i}.jpg`));
    }
    gImages = images;
}
