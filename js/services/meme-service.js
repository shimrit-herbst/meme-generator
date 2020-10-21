'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gNextId = 1;
var gImgs = [
    { id: 1, url: './imgs/1.jpg', keywords: ['happy'] }
];
var gMemes = [
    {
        id: 1,
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'bla',
                size: 20,
                align: 'center',
                strokeColor: 'red',
                fillColor: 'white',
            },
            {
                txt: 'blaaaaaa',
                size: 20,
                align: 'center',
                strokeColor: 'red',
                fillColor: 'white',
            }
        ]
    }
];


function init() {
}

// function getMemes() {
//     return gMemes;
// }

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

function _createMeme(txt, imgId) {
    return {
        id: gNextId++,
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

