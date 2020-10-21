'use strict'

var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');


function onInit() {
    renderGallery();
    renderCanvas(getCurrMemeId());
}

function renderCanvas(memeId) {
    if (!memeId) return;
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

/** GALLERY **/

function renderGallery() {
    var images = getImages();
    var strHtmls = images.map((image) => {
        return `
       <img class="img" src="./imgs/${image.id}.jpg" onclick="onSelectImage(${image.id})">`;
    });
    document.querySelector('.images-container').innerHTML = strHtmls.join('');
}

function onSelectImage(imageId) {
    updateMemeSelectedImg(imageId);
    var memeId = getCurrMemeId();
    renderCanvas(memeId);
}