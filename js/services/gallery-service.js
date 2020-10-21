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
    images.push(_createImage('./imgs/1.jpg'));
    images.push(_createImage('./imgs/2.jpg'));
    images.push(_createImage('./imgs/3.jpg'));
    images.push(_createImage('./imgs/4.jpg'));
    images.push(_createImage('./imgs/5.jpg'));
    images.push(_createImage('./imgs/6.jpg'));
    images.push(_createImage('./imgs/7.jpg'));
    images.push(_createImage('./imgs/8.jpg'));
    images.push(_createImage('./imgs/9.jpg'));
    images.push(_createImage('./imgs/10.jpg'));
    images.push(_createImage('./imgs/11.jpg'));
    images.push(_createImage('./imgs/12.jpg'));
    images.push(_createImage('./imgs/13.jpg'));
    images.push(_createImage('./imgs/14.jpg'));
    images.push(_createImage('./imgs/15.jpg'));
    images.push(_createImage('./imgs/16.jpg'));
    images.push(_createImage('./imgs/17.jpg'));
    images.push(_createImage('./imgs/18.jpg'));
    gImages = images;
}
