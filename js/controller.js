'use strict'

var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');


function onInit() {
    renderGallery();
    renderCanvas(getCurrMemeId());
    if (document.querySelectorAll("section:target").length == 0) {
        window.location = "#gallery";
    }
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
        meme.lines.forEach(line => {
            drawText(line);
        });
    }
}

function drawText(line) {
    var text = line.text;
    if (!text) text = 'Your text';

    gCtx.strokeStyle = line.strokeColor;
    gCtx.font = line.fontSize + 'px Impact';
    gCtx.textAlign = line.align;
    gCtx.shadowColor = line.shadowColor;
    gCtx.shadowBlur = line.shadowBlur;
    gCtx.lineWidth = '3';
    gCtx.strokeText(text, line.posX, line.posY);
    gCtx.fillStyle = line.fillColor;
    gCtx.fillText(text, line.posX, line.posY);
}

function onUserTextInput(textInput) {
    var meme = getMemeById(gCurrMemeId);
    meme.lines[meme.selectedLineIdx].text = textInput;
    renderCanvas(getCurrMemeId());
}

function renderGallery() {
    var images = getImages();
    var strHtmls = images.map((image) => {
        return `
       <a href="#editor"><img class="img" src="./imgs/${image.id}.jpg" onclick="onSelectImage(${image.id})"></a>`;
    });
    document.querySelector('.grid-container').innerHTML = strHtmls.join('');
}

function onSelectImage(imageId) {
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

function renderTextInput() {
    var elTextInput = document.querySelector('#user-text');
    var meme = getMemeById(gCurrMemeId);
    var newValue = '';
    if (meme.lines[meme.selectedLineIdx]) {
        newValue = meme.lines[meme.selectedLineIdx].text;
    }
    elTextInput.value = newValue;
}

function onSwitchLine() {
    switchSelectedLine();
    renderTextInput();
    renderCanvas(getCurrMemeId());
}

function onDeleteLine() {
    deleteSelectedLine();
    renderTextInput();
    renderCanvas(getCurrMemeId());
}

function onAddLine() {
    addNewLine();
    renderTextInput();
    renderCanvas(getCurrMemeId());
}

function onDownloadImg() {
    // create an "off-screen" anchor tag
    var lnk = document.createElement('a');

    // the key here is to set the download attribute of the a tag
    lnk.download = 'meme.png';

    // convert canvas content to data-uri for link. When download
    // attribute is set the content pointed to by link will be
    // pushed as "download" in HTML5 capable browsers
    lnk.href = gCanvas.toDataURL("image/png;base64");

    // create a "fake" click-event to trigger the download
    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);
        lnk.dispatchEvent(event);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}
