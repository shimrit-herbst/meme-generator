'use strict'

var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');

function onInit() {
    renderGallery();
    if (document.querySelectorAll("section:target").length === 0) {
        window.location = "#gallery";
    }
    loadSavedMemes();
    renderSavedMemes();
}

function renderSavedMemes() {
    var fullInnerHtml = '<h2>There are no saved memes to show... Go and create your own memes! </h2>';
    var savedMemes = getSavedMemes();
    if (savedMemes.length > 0) {
        var strHtmls = savedMemes.map((savedMeme) => {
            return `<img class="img" src="${savedMeme}"/>`;
        });
        fullInnerHtml = `<div class="memes-grid-container grid-container grid">${strHtmls.join('')}</div>`;
    }
    var elMemes = document.querySelector('#memes');
    elMemes.innerHTML = fullInnerHtml;
}

function renderCanvas() {
    var meme = getMeme();
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
    var meme = getMeme();
    meme.lines[meme.selectedLineIdx].text = textInput;
    renderCanvas();
}

function renderGallery() {
    var images = getImages();
    var strHtmls = images.map((image) => {
        return `
       <a href="#editor"><img class="img" src="./imgs/${image.id}.jpg" onclick="onSelectImage(${image.id})"></a>`;
    });
    document.querySelector('.images-grid-container').innerHTML = strHtmls.join('');
}

function onSelectImage(imageId) {
    initMeme(imageId);
    renderTextInput();
    renderCanvas();
}

function onChangeFontSize(val) {
    changeFontSize(val);
    renderCanvas();
}

function onChangeTextPosY(val) {
    changeTextPosY(val);
    renderCanvas();
}

function renderFillColorButton() {
    var elFillColorButton = document.querySelector('#fill-color');
    var meme = getMeme();
    var newValue = getDefaultFillColor();
    if (meme.lines[meme.selectedLineIdx]) {
        newValue = meme.lines[meme.selectedLineIdx].fillColor;
    }
    elFillColorButton.value = newValue;
}

function renderStrokeColorButton() {
    var elStrokeColorButton = document.querySelector('#stroke-color');
    var meme = getMeme();
    var newValue = getDefaultStrokeColor();
    if (meme.lines[meme.selectedLineIdx]) {
        newValue = meme.lines[meme.selectedLineIdx].strokeColor;
    }
    elStrokeColorButton.value = newValue;
}

function renderTextInput() {
    var elTextInput = document.querySelector('#user-text');
    var meme = getMeme();
    var newValue = '';
    if (meme.lines[meme.selectedLineIdx]) {
        newValue = meme.lines[meme.selectedLineIdx].text;
    }
    elTextInput.value = newValue;
}

function renderLinePrefs() {
    renderTextInput();
    renderFillColorButton();
    renderStrokeColorButton();
}

function onSwitchLine() {
    switchSelectedLine();
    renderLinePrefs();
    renderCanvas();
}

function onDeleteLine() {
    deleteSelectedLine();
    renderLinePrefs();
    renderCanvas();
}

function onAddLine() {
    addNewLine();
    renderLinePrefs();
    renderCanvas();
}

function onChangeAlign(align) {
    var meme = getMeme();
    var line = meme.lines[meme.selectedLineIdx];
    var txtWidth = gCtx.measureText(line.txt).width;
    alignChange(align, txtWidth, gCanvas);
    renderCanvas();
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

function _getBase64Image() {
    return gCanvas.toDataURL("image/png");
}

function onSaveMeme() {
    saveMeme(_getBase64Image());
    window.location.href = "#memes";
    renderSavedMemes();
}

function checkIfMoblie() {
    var width = window.matchMedia("(max-width: 520px)");
    // If media query matches
    var isMobile = (width.matches) ? true : false;
    return isMobile;
}

function toggleMenu() {
    if (!checkIfMoblie()) return;
    document.body.classList.toggle('menu-open');
}


function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    renderCanvas();
}

function onChangeFillColor(color) {
    changeFillColor(color);
    renderCanvas();
}
