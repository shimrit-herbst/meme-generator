'use strict'

var gCanvas;
var gCtx;
var gCurrMemeId = 1;

function onInit() {
    // init();
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    // console.log('The context:', gCtx);
    renderCanvas(gCurrMemeId);
}

function renderCanvas(memeId) {
    var meme = getMemeById(memeId);
    drawMeme(meme);
}

function drawMeme(meme) {
    var img = new Image()
    img.src = getImgById(meme.selectedImgId).url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        var text = meme.lines[0].txt;
        drawText(text, 250, 50);
        addMeme(text, meme.selectedImgId);
    }
}

function drawText(text, x, y) {
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = '48px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onUserTextInput(txtInput) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[0].txt = txtInput;
    renderCanvas(gCurrMemeId);
}