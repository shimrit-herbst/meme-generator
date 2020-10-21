'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemeNextId = 1;
var gCurrMemeId = 1;
var gImgs = getImages();
var gMemes = [_createMeme('bla', 1)];


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
    // _saveMemesToStorage();
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

// function _createMemes() {
//     // var memes = loadFromStorage(STORAGE_KEY);
//     // if (!memes || !memes.length) {
//     memes = []
//     for (let i = 0; i < gMemes.length; i++) {
//         var txt = '';
//         var imgId = ;
//         memes.push(_createMeme(txt, imgId))
//     }
//     gMemes = memes;
//     // _saveMemesToStorage();
// }

