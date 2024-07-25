const gameArea = document.querySelector('.game-area');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let timer;
let score = 0;
let timeLeft;
let ballInterval;
let balls = [];

function startGame() {
    // Reset score and timer
    score = 0;
    timeLeft = 30; // User only has 30 seconds to click on balls
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    // Clear any existing balls
    balls.forEach(ball => ball.remove());
    balls = [];

    // Create balls
    for (let i = 0; i < 10; i++) {
        createBall();
    }

    // Start the game timer
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Start ball movement
    ballInterval = setInterval(moveBalls, 100);
}

function endGame() {
    clearInterval(timer);
    clearInterval(ballInterval);
    alert('Time\'s up! You clicked ' + score + ' balls.');
    startGame();
}

function createBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.top = `${Math.random() * (gameArea.clientHeight - 30)}px`;
    ball.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`;
    ball.style.backgroundColor = getRandomColor(); // Set random color
    ball.addEventListener('click', () => {
        ball.remove();
        score++;
        scoreDisplay.textContent = score;
        createBall(); // Replace the clicked ball with a new one
    });
    gameArea.appendChild(ball);
    balls.push(ball);
}

function moveBalls() {
    balls.forEach(ball => {
        let top = parseInt(ball.style.top);
        let left = parseInt(ball.style.left);
        top += (Math.random() - 0.5) * 10;
        left += (Math.random() - 0.5) * 10;
        if (top < 0) top = 0;
        if (left < 0) left = 0;
        if (top > gameArea.clientHeight - 30) top = gameArea.clientHeight - 30;
        if (left > gameArea.clientWidth - 30) left = gameArea.clientWidth - 30;
        ball.style.top = `${top}px`;
        ball.style.left = `${left}px`;
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Start the game when the page loads
startGame();
