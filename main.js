var rotateState;
var interval = 100;

document.querySelector("#colorPicker1").onchange = function () {
    colorChange(1);
};
document.querySelector("#ratio").onchange = function () {
    colorChange(1);
};
document.querySelector("#colorPicker2").onchange = function () {
    colorChange(2);
};
document.querySelector("#orientation").onchange = function () {
    colorChange();
};
document.querySelector("#rotateStart").onclick = function () {
    rotateToggle('start', interval);
    document.querySelector("#rotateStart").style.display = "none";
    document.querySelector("#rotateStop").style.display = "block";
};

document.querySelector("#rotateStop").onclick = function () {
    rotateToggle('stop');
    document.querySelector("#rotateStop").style.display = "none";
    document.querySelector("#rotateStart").style.display = "block";
};

function getInputs() {
    pickedColor1 = document.getElementById(`colorPicker1`).value;
    pickedColor2 = document.getElementById(`colorPicker2`).value;
    ratio = parseInt(document.getElementById(`ratio`).value);
    orientation = parseInt(document.getElementById(`orientation`).value);

    return pickedColor1, pickedColor2, ratio, orientation;
}

function setInputs(pickedColor1, pickedColor2, ratio, orientation) {
    document.getElementById(`colorPicker1`).value = pickedColor1;
    document.getElementById(`colorPicker2`).value = pickedColor2;
    document.getElementById(`ratio`).value = ratio;
    document.getElementById(`orientation`).value = orientation;
}

function setLabels(pickedColor1, pickedColor2, ratio, orientation) {
    document.getElementById(`pickedColor1`).innerHTML = pickedColor1;
    document.getElementById(`pickedColor2`).innerHTML = pickedColor2;
    document.getElementById(`pickedRatio`).innerHTML = ratio + '%';
    document.getElementById(`pickedOrientation`).innerHTML = orientation + '°';
}

function setStyle(pickedColor1, pickedColor2, ratio, orientation) {
    document.getElementById("body").style.cssText = `
  background: linear-gradient(${orientation}deg, ${pickedColor1} ${ratio}%, ${pickedColor2})`;
}

function colorChange() {
    getInputs();
    setLabels(pickedColor1, pickedColor2, ratio, orientation);
    setStyle(pickedColor1, pickedColor2, ratio, orientation);

}



function rotateToggle(state, interval = 100) {
    if (state === 'start') {
        rotateState = setInterval(rotate, interval);
    } else {
        clearInterval(rotateState);
}

}

function rotate() {
    getInputs();
    var x = orientation;
    if (x === 360) {
        x = -359;
    } else {
        x = x + 1;
    }

    //console.log('Angle is: ' + x);
    orientation = x;

    setStyle(pickedColor1, pickedColor2, ratio, orientation);
    setInputs(pickedColor1, pickedColor2, ratio, orientation);
    setLabels(pickedColor1, pickedColor2, ratio, orientation);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor(id) {
    color = getRandomColor();
    document.getElementById(`colorPicker${id}`).value = color;
    document.getElementById(`pickedColor${id}`).innerHTML = color;
    colorChange()
}

function toggleContent() {
    // Get the DOM reference
    var contentId = document.getElementById("content");
    var contentBtn = document.getElementById("contentBtn");
    // Toggle 
    if (contentId.style.display === "block") {
        contentId.style.display = "none";
        contentBtn.innerHtml = 'Show';
    } else {
        contentId.style.display = "block";
        contentBtn.innerHtml = 'Hide';
    }
}

