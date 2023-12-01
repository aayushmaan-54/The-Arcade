let trafficLightArea = document.querySelector('.traffic-light');
let start_btn = document.querySelector('.restart-btn a'); 
let score_parent = document.querySelector('.score')
let scoreText = document.querySelector('.timeTaken');
let body = document.body;
let red1 = document.getElementById('light-red');
let red2 = document.getElementById('dark-red');
let yellow1 = document.getElementById('light-yellow');
let yellow2 = document.getElementById('dark-yellow');
let green1 = document.getElementById('light-green');
let green2 = document.getElementById('dark-green');
const root = document.documentElement;
const bg_redColor = getComputedStyle(root).getPropertyValue('--bg-red-color');
const bg_yellowColor = getComputedStyle(root).getPropertyValue('--bg-yellow-color');
const bg_greenColor = getComputedStyle(root).getPropertyValue('--bg-green-color');
const bg_color = getComputedStyle(root).getPropertyValue('--bg-color');

function random_time(min, max) {
    let random = Math.random() * (max - min + 1);
    return (Math.floor(random) + min) * 1_000;
}


function reset() {
    red1.classList.add('offLight1'); 
    red2.classList.add('offLight2');
    yellow1.classList.add('offLight1'); 
    yellow2.classList.add('offLight2');
    green1.classList.add('offLight1'); 
    green2.classList.add('offLight2');
    body.style.backgroundColor = bg_color;
    start_btn.innerHTML = 'Start🏁';
}


let randTime1 = random_time(1, 8);
let randTime2 = random_time(1, 8);


let gameStatus = {
    START: 0,
    STOP: 1,
};

let timeout1, timeout2, timeout3;

let status = gameStatus.STOP;


function timeout1_function(time) {
    timeout1 = setTimeout(function() {
        red1.classList.remove('offLight1');
        red2.classList.remove('offLight2');
        body.style.backgroundColor = bg_redColor;
    
        timeout2 = setInterval(function() {
            yellow1.classList.remove('offLight1');
            yellow2.classList.remove('offLight2');
            body.style.backgroundColor = bg_yellowColor;
    
            timeout3 = setTimeout(function() {
                green1.classList.remove('offLight1');
                green2.classList.remove('offLight2');
                body.style.backgroundColor = bg_greenColor;
                let time_now = new Date().getTime();
    
                trafficLightArea.addEventListener('click', function() {
                    let time_later = new Date().getTime();
                    let play_time = (time_later - time_now);
                    scoreText.innerHTML = play_time + 'ms';
                });
    
            }, randTime2);
        }, randTime1);
    }, 0);
}


function timeout2_function(time) {
    timeout2 = setTimeout(function() {
        end_game();
    }, time);
}


function start_game() {
    let change_time = random_time(1, 8);
    let end_time = change_time + 10_000;
    status = gameStatus.START;
    scoreText.innerHTML = '_ _ms';
    yellow1.classList.remove('offLight1');
    yellow2.classList.remove('offLight2');
    body.style.backgroundColor = bg_yellowColor;
    timeout1_function(change_time);
    timeout2_function(end_time);
}


function end_game() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    play_time = '_ _ms';
    reset();
    status = gameStatus.STOP;
}


start_btn.addEventListener('click', function() {
    if(status === gameStatus.START) {
        end_game();
    } else {
        start_game();
        this.innerHTML = "Stop Game";
    }
})


trafficLightArea.addEventListener('click', function() {
    end_game();
});