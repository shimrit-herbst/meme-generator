'use strict'

const STORAGE_KEY = 'savedMemesDB';
const DEFAULT_FILL_COLOR = '#ffffff';
const DEFAULT_STROKE_COLOR = '#000000';

var gMemeNextId = 1;
var gImgs = getImages();
var gMeme;
var gSavedMemes = [];

function getDefaultFillColor(){
    return DEFAULT_FILL_COLOR;
}

function getDefaultStrokeColor(){
    return DEFAULT_STROKE_COLOR;
}

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
        strokeColor: DEFAULT_STROKE_COLOR,
        fillColor: DEFAULT_FILL_COLOR,
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

function alignChange(align, txtWidth, gCanvas) { // QUESTION: how can we do this without gCanvas?
    var line = gMeme.lines[gMeme.selectedLineIdx];
    if (align === 'left') line.posX = txtWidth / 2;
    if (align === 'right') line.posX = gCanvas.width - txtWidth / 2;
    if (align === 'center') line.posX = gCanvas.width / 2;
    // line.align = align;   // how should align be changed?
}

function changeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
    return gMeme.lines[gMeme.selectedLineIdx].strokeColor;
}

function changeFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
    return gMeme.lines[gMeme.selectedLineIdx].fillColor;
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

function initMeme(imgId) {
    gMeme = {
        id: gMemeNextId++,
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                text: '',
                fontSize: 48,
                align: 'center',
                strokeColor: DEFAULT_STROKE_COLOR,
                fillColor: DEFAULT_FILL_COLOR,
                posX: 220,
                posY: 50,
                shadowColor: 'white',
                shadowBlur: 12,
            },
            {
                text: '',
                fontSize: 48,
                align: 'center',
                strokeColor: DEFAULT_STROKE_COLOR,
                fillColor: DEFAULT_FILL_COLOR,
                posX: 220,
                posY: 432,
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