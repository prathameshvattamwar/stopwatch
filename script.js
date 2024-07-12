let minutes = 0, seconds = 0, centiseconds = 0;
let timer;
let running = false;

function updateDisplay() {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('centiseconds').textContent = String(centiseconds).padStart(2, '0');
}

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            centiseconds++;
            if (centiseconds >= 100) {
                centiseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        updateStatusCircle('green');
    }
}

function pauseResume() {
    const pauseBtn = document.querySelector('.pause-btn');
    if (running) {
        clearInterval(timer);
        running = false;
        pauseBtn.textContent = 'RESUME';
        updateStatusCircle('red');
    } else {
        startTimer();
        pauseBtn.textContent = 'PAUSE';
    }
}

function reset() {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    centiseconds = 0;
    updateDisplay();
    document.querySelector('.pause-btn').textContent = 'PAUSE';
    clearLaps();
    updateStatusCircle('grey');
}

function recordLap() {
    if (running) {
        const lapTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
        const lapList = document.getElementById('lap-list');
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
        saveLaps();
    }
}

function saveLaps() {
    const lapList = document.getElementById('lap-list');
    const laps = [];
    lapList.querySelectorAll('li').forEach(lapItem => {
        laps.push(lapItem.textContent);
    });
    localStorage.setItem('laps', JSON.stringify(laps));
}

function loadLaps() {
    const laps = JSON.parse(localStorage.getItem('laps'));
    if (laps) {
        const lapList = document.getElementById('lap-list');
        lapList.innerHTML = '';
        laps.forEach(lapTime => {
            const lapItem = document.createElement('li');
            lapItem.textContent = lapTime;
            lapList.appendChild(lapItem);
        });
    }
}

function clearLaps() {
    const lapList = document.getElementById('lap-list');
    lapList.innerHTML = '';
    localStorage.removeItem('laps');
}

function updateStatusCircle(color) {
    const statusCircle = document.getElementById('status-circle');
    statusCircle.style.backgroundColor = color;
    if (color === 'green') {
        statusCircle.style.animation = 'blink 1s infinite';
    } else {
        statusCircle.style.animation = 'none';
    }
}

window.onload = function() {
    updateDisplay();
    loadLaps();
};
