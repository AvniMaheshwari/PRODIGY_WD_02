let timerInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const now = new Date().getTime();
    elapsedTime = now - startTime;
    display.innerText = formatTime(elapsedTime);
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.innerText = '00:00:00';
    lapList.innerHTML = '';
}

function recordLap() {
    if (!isRunning && isRunning) return;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
