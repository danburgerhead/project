
class Tile {
    constructor(x, y, value, htmlElement) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.htmlElement = htmlElement;
    }
}

function addTile() {
    //Picks a random position on the board that has no value
    randX = Math.floor(4 * Math.random());
    randY = Math.floor(4 * Math.random());
    while (board[randY][randX].value != 0) {
        randX = Math.floor(4 * Math.random());
        randY = Math.floor(4 * Math.random());
    }
    //Replaces position with 2 (90% chance) or 4 (10% chance)
    board[randY][randX].value = [2,2,2,2,2,2,2,2,2,4][Math.floor(10 * Math.random())];
    board[randY][randX].htmlElement.className += " x" + board[randY][randX].value;
}

let board = [];
function initialize() {
    for(let arrayY of [0,1,2,3]) {
        board.push([]);
        for (let arrayX of [0,1,2,3]) {
            let newTile = new Tile(arrayX, arrayY, 0, document.createElement("div"));
            newTile.htmlElement.className = "tile";
            board[arrayY].push(newTile);
            document.getElementById("board").appendChild(newTile.htmlElement);
        }
    }
    addTile();
    addTile();
}
initialize();
function slide(dx,dy) {
    
}