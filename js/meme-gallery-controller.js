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
        drawText(meme.lines[0]);
    }
}

function drawText(line) {
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.lineWidth = '2';
    gCtx.font = line.fontSize + 'px Impact';
    gCtx.textAlign = line.align;
    gCtx.fillText(line.text, line.posX, line.posY);
    gCtx.strokeText(line.text, line.posX, line.posY);
}

function onUserTextInput(textInput) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[0].text = textInput;
    renderCanvas(getCurrMemeId());
}

/** GALLERY **/

function renderGallery() {
    var images = getImages();
    var strHtmls = images.map((image) => {
        return `
       <img class="img" src="./imgs/${image.id}.jpg" onclick="onSelectImage(${image.id})">`;
    });
    document.querySelector('.grid-container').innerHTML = strHtmls.join('');
}

function onSelectImage(imageId) {
    // var elEditorContainer = document.querySelector('.editor-container');
    // elEditorContainer.classList.remove('hide');
    // var elGridContainer = document.querySelector('.grid-container');
    // elGridContainer.classList.add('hide');
    updateMemeSelectedImg(imageId);
    renderCanvas(getCurrMemeId());

}

function onChangeFontSize(val) {
    changeFontSize(val);
    renderCanvas(getCurrMemeId());
}

function onChangeTextPosY(val) {
    changeTextPosY(val);
    renderCanvas(getCurrMemeId());
}

function onSwitchLine() {

}

