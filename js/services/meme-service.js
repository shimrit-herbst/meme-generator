'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemeNextId = 1;
var gCurrMemeId = 1; // TODO current meme probably should not be served from gMemes
var gImgs = getImages();
var gMemes = [_createMeme('', 1)]; // TODO gMemes shold include only saved memes


function addNewLine() {
    var meme = getMemeById(gCurrMemeId);
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
    meme.lines.push(newLine);
    var lastIdx = meme.lines.length - 1;
    switchSelectedLine(lastIdx);
}

function deleteSelectedLine() {
    var meme = getMemeById(gCurrMemeId);
    meme.lines.splice(meme.selectedLineIdx, 1);
    switchSelectedLine(0);
}

function switchSelectedLine(newSelectedIdx) {
    var meme = getMemeById(gCurrMemeId);

    // Switch selected line
    if (newSelectedIdx !== undefined) {
        meme.selectedLineIdx = newSelectedIdx;
    }
    else {
        meme.selectedLineIdx += 1;
    };
    if (meme.selectedLineIdx === meme.lines.length)
        meme.selectedLineIdx = 0;

    for (let i = 0; i < meme.lines.length; i++) {
        meme.lines[i].shadowBlur = (i === meme.selectedLineIdx) ? 12 : 0;
    }
}

function changeFontSize(val) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[meme.selectedLineIdx].fontSize += val;
    return meme.lines[meme.selectedLineIdx].fontSize;
}

function changeTextPosY(val) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[meme.selectedLineIdx].posY += val;
    return meme.lines[meme.selectedLineIdx].posY;
}

function getCurrMemeId() {
    return gCurrMemeId;
}

function getMemeLinePosY() {
    return meme.lines[meme.selectedLineIdx].posY;
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
