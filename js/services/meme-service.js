'use strict'

const STORAGE_KEY = 'savedMemesDB';


// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemeNextId = 1;
var gImgs = getImages();
var gMeme = _createMeme('', 1);
var gSavedMemes = [];

function saveMeme(base64ImgData) {
    gSavedMemes.push(base64ImgData);
    _saveMemesToStorage();
}

function getSavedMemes() {
    return gSavedMemes;
}

function loadSavedMemes() {
    _loadMemesFromStorage();
}

function addNewLine() {
    var newLine = {
        text: '',
        fontSize: 48,
        align: 'center',
        strokeColor: 'black',
        fillColor: 'white',
        posX: 250,
        posY: 250,
        shadowColor: 'white',
        shadowBlur: 12,
    };
    gMeme.lines.push(newLine);
    var lastIdx = gMeme.lines.length - 1;
    switchSelectedLine(lastIdx);
}

function deleteSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    switchSelectedLine(0);
}

function switchSelectedLine(newSelectedIdx) {
    // Switch selected line
    if (newSelectedIdx !== undefined) {
        gMeme.selectedLineIdx = newSelectedIdx;
    }
    else {
        gMeme.selectedLineIdx += 1;
    };
    if (gMeme.selectedLineIdx === gMeme.lines.length)
        gMeme.selectedLineIdx = 0;

    for (let i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].shadowBlur = (i === gMeme.selectedLineIdx) ? 12 : 0;
    }
}

function changeFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += val;
    return gMeme.lines[gMeme.selectedLineIdx].fontSize;
}

function changeTextPosY(val) {
    gMeme.lines[gMeme.selectedLineIdx].posY += val;
    return gMeme.lines[gMeme.selectedLineIdx].posY;
}

function getMeme() {
    return gMeme;
}

function getMemeLinePosY() {
    return gMeme.lines[gMeme.selectedLineIdx].posY;
}

function getImgById(imgId) {
    var img = gImgs.find((img) => { return imgId === img.id });
    return img;
}

function updateMemeSelectedImg(imgId) {
    gMeme.selectedImgId = imgId;
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
                strokeColor: 'black',
                fillColor: 'white',
                posX: 250,
                posY: 50,
                shadowColor: 'white',
                shadowBlur: 12,
            },
            {
                text,
                fontSize: 48,
                align: 'center',
                strokeColor: 'black',
                fillColor: 'white',
                posX: 250,
                posY: 450,
                shadowColor: 'white',
                shadowBlur: 0,
            }
        ]
    }
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes);
}

function _loadMemesFromStorage() {
    var memes = loadFromStorage(STORAGE_KEY);
    if (!memes) memes = [];
    gSavedMemes = memes;
}