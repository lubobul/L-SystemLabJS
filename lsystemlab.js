'use strict';

window.onload = function () {

    render();
}

function loadingStarted() {
    document.getElementById("loading-popup").style.display = "block";
}

function loadingDone(timeBegin) {

    document.getElementById("loading-popup").style.display = "none";
    document.getElementById("time-to-render").innerHTML = "Render time: " + (Date.now() - timeBegin) / 1000 + " sec";
    document.getElementById("num-of-instructions").innerHTML = "Instructions: " + fractral_str.length;
}

function about() {
    var popup = document.getElementById("popup");
    popup.style.display = 'block';
}

function closeAbout() {
    var popup = document.getElementById("popup");
    popup.style.display = 'none';
}

function resetForRule1() {

    document.getElementById("randomize-angle-value1").value = 35;
    document.getElementById("randomize-angle-value2").value = 45;
    document.getElementById("randomize-angle-checkbox-label").innerHTML = "Disabled";
    document.getElementById("randomize-angle-value1").readOnly = true;
    document.getElementById("randomize-angle-value2").readOnly = true;
    document.getElementById("angle-state").checked = false;

    //colors hsf-value1
    document.getElementById("hsf-value1").value = 0;
    document.getElementById("hsf-value2").value = 360;
    document.getElementById("color-checkbox-label").innerHTML = "Disabled";
    document.getElementById("hsf-value1").readOnly = true;
    document.getElementById("hsf-value2").readOnly = true;
    document.getElementById("color").checked = false;

    document.getElementById("rule2-checkbox-label").innerHTML = "Disabled";
    document.getElementById("seed2").readOnly = true;
    document.getElementById("rule2_select").checked = false;

    randomAngle = false;
}

function renderKochCurve() {
    document.getElementById("ittr").value = 5;
    document.getElementById("pix-per-dot").value = 1;
    document.getElementById("angle").value = 90;
    document.getElementById("offset-y").value = 500;
    document.getElementById("offset-x").value = 200;
    document.getElementById("seed1").value = "F-F+F+F-F";
    document.getElementById("seed2").value = "FF";
    resetForRule1();

    render();
}

function renderLevyCurve() {

    document.getElementById("ittr").value = 9;
    document.getElementById("pix-per-dot").value = 10;
    document.getElementById("angle").value = 45;
    document.getElementById("offset-y").value = 250;
    document.getElementById("offset-x").value = 500;
    document.getElementById("seed1").value = "+F--F+";
    document.getElementById("seed2").value = "FF";
    resetForRule1();

    render();
}

function renderTree() {

    document.getElementById("ittr").value = 6;
    document.getElementById("pix-per-dot").value = 1;
    document.getElementById("angle").value = 28;
    document.getElementById("offset-y").value = 800;
    document.getElementById("offset-x").value = 500;
    document.getElementById("seed1").value = "F-[[X]+X]+F[+FX]-X";
    document.getElementById("seed2").value = "FF";
    document.getElementById("rule2-checkbox-label").innerHTML = "Enabled";
    document.getElementById("seed2").readOnly = false;
    document.getElementById("rule2_select").checked = true;
    randomAngle = true;

    //angle randomization
    document.getElementById("randomize-angle-value1").value = 20;
    document.getElementById("randomize-angle-value2").value = 30;
    document.getElementById("randomize-angle-checkbox-label").innerHTML = "Enabled";
    document.getElementById("randomize-angle-value1").readOnly = false;
    document.getElementById("randomize-angle-value2").readOnly = false;
    document.getElementById("angle-state").checked = true;

    //colors hsf-value1
    document.getElementById("hsf-value1").value = 35;
    document.getElementById("hsf-value2").value = 60;
    document.getElementById("color-checkbox-label").innerHTML = "Enabled";
    document.getElementById("hsf-value1").readOnly = false;
    document.getElementById("hsf-value2").readOnly = false;
    document.getElementById("color").checked = true;

    render();
}

function renderOther1() {
    document.getElementById("ittr").value = 6;
    document.getElementById("pix-per-dot").value = 1;
    document.getElementById("angle").value = 70;
    document.getElementById("offset-y").value = 200;
    document.getElementById("offset-x").value = 200;
    document.getElementById("seed1").value = "F+F--F+F";
    document.getElementById("seed2").value = "FF";
    resetForRule1();

    render();
}

function renderOther2() {
    document.getElementById("ittr").value = 14;
    document.getElementById("pix-per-dot").value = 2;
    document.getElementById("angle").value = 58;
    document.getElementById("offset-y").value = 400;
    document.getElementById("offset-x").value = 500;
    document.getElementById("seed1").value = "+FF+";
    document.getElementById("seed2").value = "FF";
    resetForRule1();

    render();
}

//ALL TRIVIAL SHIZZLE GOES HERE

function validateFields() {


    var offsetX_val = parseInt(document.getElementById("offset-x").value);
    var offsetY_val = parseInt(document.getElementById("offset-y").value);

    var seed1 = document.getElementById("seed1").value;
    var seed2 = document.getElementById("seed2").value;

    var angle_val = parseInt(document.getElementById("angle").value);
    var pix_per_dot_val = parseInt(document.getElementById("pix-per-dot").value);
    var num_of_itterations_val = parseInt(document.getElementById("ittr").value);

    var hsf_val1 = parseInt(document.getElementById("hsf-value1").value);
    var hsf_val2 = parseInt(document.getElementById("hsf-value2").value);

    var randomize_angle_value1 = parseInt(document.getElementById("randomize-angle-value1").value);
    var randomize_angle_value2 = parseInt(document.getElementById("randomize-angle-value2").value);

    var allowed_chars = "F+-[]X";

    var i;

    //illegal chars validation
    for (i = 0; i < seed1.length; i++) {
        if (allowed_chars.indexOf(seed1[i]) === -1) {
            alert("Illegal seed characters detected. Allowed characters: F, +, -, X, [, ]");
            return false;
        }
    }

    for (i = 0; i < seed2.length; i++) {
        if (allowed_chars.indexOf(seed2[i]) === -1) {
            alert("Illegal seed characters detected. Allowed characters: F, +, -, X, [, ]");
            return false;
        }
    }

    //angle validation
    if (angle_val < 0 || angle_val > 360 || isNaN(angle_val)) {
        alert("Angle has to be between 0 and 360 degrees");
        return false;
    }

    //hsf validation
    if (hsf_val1 < 0 || hsf_val1 > 360 || hsf_val2 < 0 || hsf_val2 > 360 || isNaN(hsf_val1) || isNaN(hsf_val2)) {
        alert("Color wheel values have to be between 0 and 360 degrees");
        return false;
    }

    if (hsf_val1 > hsf_val2)
        alert("Color wheel value 1 needs to be lower than value 2");

    //randomize angle validation
    if (randomize_angle_value1 < 0 || randomize_angle_value1 > 360 || randomize_angle_value2 < 0 || randomize_angle_value2 > 360 || isNaN(randomize_angle_value1) || isNaN(randomize_angle_value2)) {
        alert("Randomize angle values have to be between 0 and 360 degrees");
        return false;
    }

    if (randomize_angle_value1 > randomize_angle_value2)
        alert("Randomize angle value 1 needs to be lower than value 2");

    //drawing line validation
    if (pix_per_dot_val < 0 || pix_per_dot_val > 200 || isNaN(pix_per_dot_val)) {
        alert("Pixels per dot value has to be between 1 and 200");
        return false;
    }

    //itterations validation
    if (num_of_itterations_val < 0 || num_of_itterations_val > 14 || isNaN(num_of_itterations_val)) {
        alert("Iterations value has to be between 1 and 14");
        return false;
    }

    if (seed1.length > 20 || seed2.length > 20) {
        alert("A seed value is too long");
        return false;
    }

    if (isNaN(offsetX_val) || offsetX_val < 0) {
        alert("Illegal offset X value");
        return false;
    }

    if (isNaN(offsetY_val) || offsetY_val < 0) {
        alert("Illegal offset Y value");
        return false;
    }

    return true;
}

//ON-OFF states
function changeRenderMode() {

    prettyMode = document.getElementById("pretty-mode").checked;

    if (prettyMode) {
        document.getElementById("pretty-mode-label").innerHTML = "Enabled";
        document.getElementById("color-wheel-container").style.display = "block";
    } else {
        document.getElementById("pretty-mode-label").innerHTML = "Disabled";
        document.getElementById("color-wheel-container").style.display = "none";
    }

    render();
}

function changeRandomizeAngleState() {

    randomAngle = document.getElementById("angle-state").checked;

    document.getElementById("randomize-angle-value1").readOnly = !randomAngle;
    document.getElementById("randomize-angle-value2").readOnly = !randomAngle;

    if (randomAngle) {
        document.getElementById("randomize-angle-checkbox-label").innerHTML = "Enabled";
    } else {
        document.getElementById("randomize-angle-checkbox-label").innerHTML = "Disabled";
    }
}

function changeColorState() {
    var color_state = document.getElementById("color").checked;

    document.getElementById("hsf-value1").readOnly = !color_state;
    document.getElementById("hsf-value2").readOnly = !color_state;

    if (color_state) {
        document.getElementById("color-checkbox-label").innerHTML = "Enabled";
    } else {
        document.getElementById("color-checkbox-label").innerHTML = "Disabled";
    }
}

function changeInputBoxState() {

    var rule_2_state = document.getElementById("rule2_select").checked;

    document.getElementById("seed2").readOnly = !rule_2_state;

    //reset to default
    if (rule_2_state) {
        document.getElementById("ittr").value = 6;
        document.getElementById("pix-per-dot").value = 1;
        document.getElementById("angle").value = 28;
        document.getElementById("offset-y").value = 800;
        document.getElementById("offset-x").value = 500;
        document.getElementById("seed1").value = "F-[[X]+X]+F[+FX]-X";
        document.getElementById("seed2").value = "FF";
        document.getElementById("rule2-checkbox-label").innerHTML = "Enabled";
    }
    else {
        document.getElementById("ittr").value = 9;
        document.getElementById("pix-per-dot").value = 10;
        document.getElementById("angle").value = 45;
        document.getElementById("offset-y").value = 250;
        document.getElementById("offset-x").value = 500;
        document.getElementById("seed1").value = "+F--F+";
        document.getElementById("seed2").value = "FF";
        document.getElementById("rule2-checkbox-label").innerHTML = "Disabled";
    }
}

//This is the main method
function render() {

    var timeBegin = Date.now();

    //if it fails to validate, break out of the main
    if (!validateFields()) return;

    if (document.getElementById("rule2_select").checked) {
        t = degToRad(-90);
    } else {
        t = 0;
    }

    randFrom = parseInt(document.getElementById("randomize-angle-value1").value);
    randTo = parseInt(document.getElementById("randomize-angle-value2").value);

    var offsetX_val = parseInt(document.getElementById("offset-x").value);
    var offsetY_val = parseInt(document.getElementById("offset-y").value);

    var seed1_val = document.getElementById("seed1").value;
    var seed2_val = document.getElementById("seed2").value;

    angle = degToRad(parseInt(document.getElementById("angle").value));
    pix_per_dot = parseInt(document.getElementById("pix-per-dot").value);
    var num_of_itterations_val = parseInt(document.getElementById("ittr").value);

    if (prettyMode)
        isMultiColored = document.getElementById("color").checked;
    else
        isMultiColored = false;

    //check if values have changed if not use the previosly generated string else render new string
    if (seed1 != seed1_val || seed2 != seed2_val || num_of_itterations != num_of_itterations_val) {

        seed1 = seed1_val;
        seed2 = seed2_val;

        num_of_itterations = num_of_itterations_val;
        fractral_str = getFractalString(seed1, seed2, num_of_itterations);
    }

    if (offsetX_val != offsetX || offsetY != offsetY_val) {
        offsetX = offsetX_val;
        offsetY = offsetY_val;
    }

    //360 - HSF
    factor = ((parseInt(document.getElementById("hsf-value2").value) - parseInt(document.getElementById("hsf-value1").value)) / fractral_str.length);
    colorValueFrom = parseFloat(document.getElementById("hsf-value1").value);

    loadingStarted();

    setTimeout(function () {

        draw();
        loadingDone(timeBegin);

    }, 10);

}

//ALL CANVAS SHIZZLE GOES HERE
var randomAngle = false;
var prettyMode = true;

var offsetX = 0;
var offsetY = 0;

var t = degToRad(-90);
var angle = 0;
var pix_per_dot = 0;

var seed1 = "";
var seed2 = "";

var num_of_itterations = 0;

var tmpX = 0;
var tmpY = 0;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Get Canvas Coordinates on click

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(e) {

    var x;
    var y;

    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= c.offsetLeft;
    y -= c.offsetTop;

    document.getElementById("offset-x").value = x;
    document.getElementById("offset-y").value = y;
}



//Draw a line from posX,posY to posXto, posYto
function drawPrettyLine(posX, posY, posXto, posYto) {

    ctx.beginPath();
    ctx.moveTo(posX + offsetX, posY + offsetY);
    ctx.lineTo(posXto + offsetX, posYto + offsetY);
    ctx.stroke();
}

function drawSimpleLine(posX, posY, posXto, posYto) {

    ctx.moveTo(posX + offsetX, posY + offsetY);
    ctx.lineTo(posXto + offsetX, posYto + offsetY);
}

//get random number inclusive of min / max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Polar to rectengular coordination
function cartesianToPolar(r, t) {
    var x = r * Math.cos(t);
    var y = r * Math.sin(t);

    return {
        x: x,
        y: y
    }
}

//Degrees to radians
function degToRad(deg) {
    return (Math.PI / 180) * deg;
}

var drawLineDelegate;

function clearCanvas() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (prettyMode) {
        initPrettyCanvas();
        drawLineDelegate = drawPrettyLine;
    }
    else {
        initFastCanvas();
        drawLineDelegate = drawSimpleLine;
    }
}

function initPrettyCanvas() {
    ctx.strokeStyle = "lightgray";
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 0.3;
    ctx.shadowOffsetY = 0.3;
    ctx.shadowBlur = 0.4;
}

function initFastCanvas() {
    ctx.strokeStyle = "darkgray";
}

var fractral_str = "";

//Generate the L-System string
function getFractalString(seed1, seed2, iti) {

    var is_rule_2_used = document.getElementById("rule2_select").checked;

    var init = seed1;

    var gen_val = "";

    var tmp_seed = "";

    if (is_rule_2_used)
        tmp_seed = seed2;
    else
        tmp_seed = seed1;

    for (var j = 0; j < iti; j++) {

        var i;

        if (is_rule_2_used) {
            for (i = 0; i < init.length; i++) {

                if (init[i] == 'X') {
                    gen_val += seed1;
                } else {
                    gen_val += init[i];
                }
            }

            init = gen_val;
            gen_val = "";
        }

        for (i = 0; i < init.length; i++) {
            if (init[i] == 'F') {
                gen_val += tmp_seed;
            } else {
                gen_val += init[i];
            }
        }

        init = gen_val;
        gen_val = "";
    }

    return init;
}

//draw related vars
var randFrom = 0;
var randTo = 0;

var factor = 0;

var colorValueTo = 0;
var colorValueFrom = 0;

var isMultiColored = false;

var old_vals = [];

function draw() {

    clearCanvas();

    if (!prettyMode)
        ctx.beginPath();

    colorValueTo = 0;
    tmpX = 0;
    tmpY = 0;

    for (var i = 0; i < fractral_str.length; i++) {

        if (isMultiColored) {

            colorValueTo += factor;
            ctx.strokeStyle = "hsl(" + (colorValueFrom + colorValueTo) + ",50%,50%)";
        }

        switch (fractral_str[i]) {

            case '-':

                if (randomAngle)
                    t -= degToRad(getRandomInt(randFrom, randTo));
                else
                    t -= angle;
                break;

            case '+':

                if (randomAngle)
                    t += degToRad(getRandomInt(randFrom, randTo));
                else
                    t += angle;
                break;

            case '[':

                var old_val = {
                    x: tmpX,
                    y: tmpY,
                    t: t
                }
                old_vals.push(old_val);
                break;

            case ']':

                var old_val = old_vals.pop();
                t = old_val.t;
                tmpX = old_val.x;
                tmpY = old_val.y;
                break;

            case 'F':

                var rectCoordinates = cartesianToPolar(pix_per_dot, t);
                drawLineDelegate(tmpX, tmpY, rectCoordinates.x + tmpX, rectCoordinates.y + tmpY);
                tmpX = rectCoordinates.x + tmpX;
                tmpY = rectCoordinates.y + tmpY;
                break;
        }
    }

    if (!prettyMode)
        ctx.stroke();
}