'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemeNextId = 1;
var gCurrMemeId = 1; // TODO current meme probably should not be served from gMemes
var gImgs = getImages();
var gMemes = [_createMeme('Your text', 1)]; // TODO gMemes shold include only saved memes


function getCurrMemeId() {
    return gCurrMemeId;
}

function getMemeById(memeId) {
    var meme = gMemes.find((meme) => { return memeId === meme.id });
    return meme;
}


function getImgById(imgId) {
    var img = gImgs.find((img) => { return imgId === img.id });
    return img;
}

function addMeme(txt, imgId) {
    var meme = _createMeme(txt, imgId);
    gMemes.push(meme)
}

function updateMemeSelectedImg(imgId) {
    var meme = getMemeById(gCurrMemeId);
    meme.selectedImgId = imgId;
}

function _createMeme(txt, imgId) {
    return {
        id: gMemeNextId++,
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt,
                size: 20,
                align: 'center',
                strokeColor: 'red',
                fillColor: 'white',
            }
        ]
    }
}
