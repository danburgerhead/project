const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const moveInterval = 100; // Adjust this value for speed

//create the items 
let snake;
let fruit;
let score;
let lives;
let gameOver = false;
let lastMoveTime = 0;


//create the snake 
class Snake {
    constructor() {
        this.head = { x: 10, y: 10 }; //coordinates so it moves 
        this.tail = [];
        this.colors = ['green']; // Start with the head color
        this.size = 1;
        this.direction = 'RIGHT';
        this.nextDirection = 'RIGHT';
    }

    draw() {
        // Draw the head
        ctx.fillStyle = this.colors[0];
        ctx.fillRect(this.head.x * scale, this.head.y * scale, scale, scale);

        // Draw the tail
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillStyle = this.colors[i + 1] || 'green'; // Use the colors array, default to green if undefined
            ctx.fillRect(this.tail[i].x * scale, this.tail[i].y * scale, scale, scale);
        }
    }

    //create the function to actively move the snake 

    update() {
        this.direction = this.nextDirection;

        let head = { ...this.head };

        if (this.direction === 'RIGHT') head.x++;
        if (this.direction === 'LEFT') head.x--;
        if (this.direction === 'UP') head.y--;
        if (this.direction === 'DOWN') head.y++;

        this.tail.unshift(this.head);
        if (this.tail.length > this.size - 1) {
            this.tail.pop();
        }
        this.head = head;

        // Shift the colors array to match the tail movement
        if (this.colors.length > this.size) {
            this.colors.pop();
        }
    }

    //create the function that adds the color of the fruit to the snake's body

    grow(color) {
        this.size++;
        this.colors.push(color); // Add the color of the fruit to the snake's colors
    }
}

//create the fruit

class Fruit {
    constructor() {
        this.pickLocation();
        this.pickColor();
    }
    
    //pick a random location to have the fruit placed 
    pickLocation() {
        this.x = Math.floor(Math.random() * columns);
        this.y = Math.floor(Math.random() * rows);
    }

    //pick a random color for the fruit 

    pickColor() {
        const colors = ['red', 'blue', 'yellow', 'purple', 'orange'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
    }
}
//track what key was pressed to change the direction of the snake 
function changeDirection(event) {
    const { keyCode } = event;
    if (keyCode === 37 && snake.direction !== 'RIGHT') snake.nextDirection = 'LEFT'; // Left arrow
    if (keyCode === 38 && snake.direction !== 'DOWN') snake.nextDirection = 'UP'; // Up arrow
    if (keyCode === 39 && snake.direction !== 'LEFT') snake.nextDirection = 'RIGHT'; // Right arrow
    if (keyCode === 40 && snake.direction !== 'UP') snake.nextDirection = 'DOWN'; // Down arrow
}

function setup() {
    snake = new Snake();
    fruit = new Fruit();
    score = 0;
    lives = 3;
    gameOver = false;
    lastMoveTime = 0;
    document.addEventListener('keydown', changeDirection);
    resetButton.addEventListener('click', resetGame);
    resetButton.style.display = 'none'; // Hide the reset button initially
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (gameOver) return;

    // Manage movement update interval
    if (timestamp - lastMoveTime > moveInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.update();
        snake.draw();
        fruit.draw();
        checkCollision();
        drawScore();
        drawHearts(); // Update to draw hearts
        lastMoveTime = timestamp;
    }

    requestAnimationFrame(gameLoop);
}

function drawScore() {
    ctx.font = '20px ArcadeClassic';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
}

function drawHearts() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    const heartSymbols = ['𓆩♡𓆪', '𓆩♡𓆪', '𓆩♡𓆪']; // Array of heart symbols
    const heartSpacing = 30; // Spacing between hearts
    let hearts = '';

    for (let i = 0; i < lives; i++) {
        hearts += heartSymbols[i % heartSymbols.length] + ' '; // Use heart symbols in a repeating sequence
    }

    ctx.fillText(hearts, canvas.width - 150, 20); // Adjust position as needed
}

function checkCollision() {
    if (snake.head.x === fruit.x && snake.head.y === fruit.y) {
        score++;
        snake.grow(fruit.color); // Pass the fruit's color to the snake
        fruit.pickLocation();
        fruit.pickColor(); // Change the color of the fruit
    }

    // Check for collisions with walls or itself
    if (snake.head.x < 0 || snake.head.x >= columns || snake.head.y < 0 || snake.head.y >= rows) {
        loseLife();
    }

    for (let i = 1; i < snake.tail.length; i++) {
        if (snake.head.x === snake.tail[i].x && snake.head.y === snake.tail[i].y) {
            loseLife();
        }
    }
}
//create a function that allows the user to keep their length but lose their life
function loseLife() {
    lives--;
    if (lives > 0) {
        // Reset snake's position but keep the size and colors
        snake.head = { x: 10, y: 10 };
        snake.tail = [];
        snake.direction = 'RIGHT';
        snake.nextDirection = 'RIGHT';
    } else {
        gameOver = true;
        resetButton.style.display = 'block'; // Show the reset button
    }
}

function resetGame() {
    setup(); // Restart the game
}

setup();
