'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemeNextId = 1;
var gCurrMemeId = 1; // TODO current meme probably should not be served from gMemes
var gImgs = getImages();
var gMemes = [_createMeme('Your text', 1)]; // TODO gMemes shold include only saved memes

function changeFontSize(val) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[0].fontSize += val;
    return meme.lines[0].fontSize;
}

function changeTextPosY(val) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[0].posY += val;
    return meme.lines[0].posY;
}

function getCurrMemeId() {
    return gCurrMemeId;
}

function getMemeLinePosX() {
    return meme.lines[0].posX;
}

function getMemeLinePosY() {
    return meme.lines[0].posY;
}

function getMemeById(memeId) {
    var meme = gMemes.find((meme) => { return memeId === meme.id });
    return meme;
}

function getImgById(imgId) {
    var img = gImgs.find((img) => { return imgId === img.id });
    return img;
}

// function saveMeme(text, imgId) {
//     var meme = _createMeme(text, imgId);
//     gMemes.push(meme)
// }

function updateMemeSelectedImg(imgId) {
    var meme = getMemeById(gCurrMemeId);
    meme.selectedImgId = imgId;
}

function _createMeme(text, imgId) {
    return {
        id: gMemeNextId++,
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                text,
                fontSize: 48,
                align: 'center',
                strokeColor: 'red',
                fillColor: 'white',
                posX: 250,
                posY: 50,
            }
        ]
    }
}
