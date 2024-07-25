const dot = document.querySelector('.dot');
const maze = document.querySelector('.maze');
const scarePopup = document.getElementById('scarePopup');

const mazeWidth = maze.offsetWidth;
const mazeHeight = maze.offsetHeight;
const dotSize = dot.offsetWidth;
const wallThickness = 10; // Thickness of the maze walls

const walls = [
    { x: 0, y: 0, width: mazeWidth, height: wallThickness }, // Top wall
    { x: 0, y: 0, width: wallThickness, height: mazeHeight }, // Left wall
    { x: 0, y: mazeHeight - wallThickness, width: mazeWidth, height: wallThickness }, // Bottom wall
    { x: mazeWidth - wallThickness, y: 0, width: wallThickness, height: mazeHeight } // Right wall
    // Add internal walls here
];

const scareZone = { x: 350, y: 350, width: 50, height: 50 }; // Example scare zone

let dotX = 10;
let dotY = 10;
let speed = 5;

function checkCollision() {
    const dotRect = dot.getBoundingClientRect();

    for (let wall of walls) {
        const wallRect = {
            x: wall.x,
            y: wall.y,
            width: wall.width,
            height: wall.height
        };

        if (
            dotRect.left < wallRect.x + wallRect.width &&
            dotRect.left + dotRect.width > wallRect.x &&
            dotRect.top < wallRect.y + wallRect.height &&
            dotRect.top + dotRect.height > wallRect.y
        ) {
            return true;
        }
    }

    return false;
}

function checkScareZone() {
    const dotRect = dot.getBoundingClientRect();
    if (
        dotRect.left < scareZone.x + scareZone.width &&
        dotRect.left + dotRect.width > scareZone.x &&
        dotRect.top < scareZone.y + scareZone.height &&
        dotRect.top + dotRect.height > scareZone.y
    ) {
        return true;
    }
    return false;
}

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'ArrowUp') {
        dotY -= speed;
    } else if (e.key === 'ArrowDown') {
        dotY += speed;
    } else if (e.key === 'ArrowLeft') {
        dotX -= speed;
    } else if (e.key === 'ArrowRight') {
        dotX += speed;
    }

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    if (checkCollision()) {
        // Handle collision
        dotX = Math.max(0, Math.min(mazeWidth - dotSize, dotX));
        dotY = Math.max(0, Math.min(mazeHeight - dotSize, dotY));
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
    }

    if (checkScareZone()) {
        scarePopup.style.display = 'block';
        setTimeout(() => scarePopup.style.display = 'none', 2000);
    }
});