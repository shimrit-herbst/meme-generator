'use strict'

const STORAGE_KEY = 'savedMemesDB';
const DEFAULT_FILL_COLOR = '#ffffff';
const DEFAULT_STROKE_COLOR = '#000000';
const DEFAULT_ALIGN = 'center';
const FOCUSED_LINE_BLUR = 12;
const UNFOCUSED_LINE_BLUR = 0;


var gMemeNextId = 1;
var gImgs = getImages();
var gMeme;
var gSavedMemes = [];

function getDefaultFillColor() {
    return DEFAULT_FILL_COLOR;
}

function getDefaultStrokeColor() {
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

function _createLine(posY, shadowBlur) {
    return {
        text: '',
        fontSize: 48,
        align: DEFAULT_ALIGN,
        strokeColor: DEFAULT_STROKE_COLOR,
        fillColor: DEFAULT_FILL_COLOR,
        posY,
        shadowColor: 'white',
        shadowBlur,
    };
}

function addNewLine() {
    var newLine = _createLine(250, FOCUSED_LINE_BLUR);
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
        gMeme.lines[i].shadowBlur = (i === gMeme.selectedLineIdx) ? FOCUSED_LINE_BLUR : UNFOCUSED_LINE_BLUR;
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

function alignChange(align) { // 
    gMeme.lines[gMeme.selectedLineIdx].align = align;
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
            _createLine(50, FOCUSED_LINE_BLUR),
            _createLine(420, UNFOCUSED_LINE_BLUR)
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
