"use strict";

///////////////////////// LINK EFFECT ////////////////////////////
const links = Array.from(document.querySelectorAll('.links'));

const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';

const randNum = max => Math.floor(Math.random() * (max - 1));

const mergeArrays = (arrOne, arrTwo) => arrOne
    .map((item, i) => `${item} ${arrTwo[i]}`)
    .join(', ');


const addBackground = (elms) => (color) => {
    elms.forEach(el => {
        el.style.backgroundImage = color;
    });
}


const getData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

const addBackgroundToUnderlines = addBackground(links);


const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;


const applyGradient = async(url, callback) => {
    const data = await getData(url);
    const gradient = buildGradient(data[randNum(data.length)]);
    callback(gradient);
}

applyGradient(gradientAPI, addBackgroundToUnderlines);





////////////////////// DARK-LIGHT MODE ////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    var userPreference;
    if(getCookie('appearance')) {
        userPreference = getCookie('appearance');
    } else {
        userPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyAppearance(userPreference);
    document.getElementById("toggle-button").addEventListener("click", toggleMode);
});


function applyAppearance(mode) {
    var imgElement = document.getElementById('toggle-img');
    if(mode === 'dark') {
        document.body.classList.add('dark');
        imgElement.src = 'https://uploads-ssl.webflow.com/655cd88e6249ce66bb02cfbc/655da2e5d85dfa7bc6a65215_moon.svg';
    } else {
        document.body.classList.remove('dark');
        imgElement.src = 'https://assets-global.website-files.com/655cd88e6249ce66bb02cfbc/655d0474630f5c8d9e34d057_sun.svg';
    }
    setCookie('appearance', mode, 30); 
}


function toggleMode() {
    var newMode = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyAppearance(newMode);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

////////////////////// Custom Cursor ////////////////////////////
let title = document.querySelector('.links');
let curs = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    curs.style.left = (x - 22) + "px";
    curs.style.top = (y - 22) + "px";
});

document.addEventListener('mouseleave', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    curs.style.left = (x - 22) + "px";
    curs.style.top = (y - 22) + "px";
});