"use strict";

const instructions_sec = document.querySelector('.instructions');
const sec_1 = document.querySelector('.sec-1');
const sec_2 = document.querySelector('.sec-2');
const sec_3 = document.querySelector('.sec-3');
let input_secValue = document.getElementById('input_sec');
const form = document.querySelector('#form');
const submit_btn = document.querySelector('.submit_btn button');
const click_area = document.querySelector('.click-area');
const score = document.querySelector('.score');

let inputValue = 1,
    flag = {
        inputValueFlag: false,
        start: false,
        started: false,
        stop: false,
    },
    currentSec = 1,
    secCounter,
    clickCounter = 0;


////////////////////////// Ripple Effect //////////////////////////////
function createRipple(e) {
    var circle = document.createElement("div"),
        d = Math.max(this.clientWidth, this.clientHeight),
        rect = this.getBoundingClientRect();
    this.appendChild(circle);
    circle.style.width = circle.style.height = d + "px";
    circle.style.left = e.clientX - rect.left - d / 2 + "px";
    circle.style.top = e.clientY - rect.top - d / 2 + "px";
    circle.classList.add("ripple-effect");
    setTimeout(function() {
        circle.parentNode.removeChild(circle);
    }, "601");
}

var els = document.getElementsByClassName("ripple");

function ready(fn) {
    if (
        document.attachEvent
        ? document.readyState === "complete"
        : document.readyState !== "loading"
    ) {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
ready(function() {
    Array.prototype.forEach.call(els, function(el) {
        el.addEventListener("click", createRipple);
    });
});


////////////////////////// Game Logic //////////////////////////////
form.addEventListener("submit", function(event) {  
    event.preventDefault();
    inputValue = document.getElementById("input_sec").value;
    flag.inputValueFlag = true;
    flag.start = true;
    submit_btn.innerHTML = "Stop Game";
    timer();
});

function reset() {
    flag.inputValueFlag = false;
    flag.start = false;
    submit_btn.innerHTML = "Submit";
    flag.started = false;
    flag.stop = false;
}

sec_1.addEventListener('click', function() {
    if(flag.inputValueFlag === false) {
        inputValue = 5;
        submit_btn.innerHTML = "Stop Game";
        timer();
    }
});

sec_2.addEventListener('click', function() {
    if(flag.inputValueFlag === false) {
        inputValue = 10;
        submit_btn.innerHTML = "Stop Game";
        timer();
    }
});

sec_3.addEventListener('click', function() {
    if(flag.inputValueFlag === false) {
        inputValue = 20;
        submit_btn.innerHTML = "Stop Game";
        timer();
    }
});


function clickHandler() {
    clickCounter++;
}

function timer() {
    currentSec = 0;
    
    if (inputValue > 0) {
        const secCounter = setInterval(() => {
            currentSec++;
            click_area.addEventListener('click', clickHandler);

            if (currentSec >= inputValue) {
                clearInterval(secCounter);
                reset();
                click_area.removeEventListener('click', clickHandler);
                flag.stop = true;

                if(flag.stop === true) {
                    instructions_sec.innerHTML = clickCounter + " Clicks";
                }
            }
        }, 1000);
    }
}