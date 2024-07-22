
class Tile {
    constructor(x, y, value, htmlElement) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.htmlElement = htmlElement;
        this.canMerge = false;
    }
    changeValue(newValue) {
        this.value = newValue;
        this.htmlElement.className = "tile x" + this.value;
        this.htmlElement.textContent = this.value;
        this.canMerge = false;
    }
}

function addTile() {
    //Picks a random position on the board that has no value
    randX = Math.floor(4 * Math.random());
    randY = Math.floor(4 * Math.random());
    while (board[randY][randX].value != "") {
        randX = Math.floor(4 * Math.random());
        randY = Math.floor(4 * Math.random());
    }
    //Replaces position with 2 (90% chance) or 4 (10% chance)
    board[randY][randX].changeValue([2,2,2,2,2,2,2,2,2,4][Math.floor(10 * Math.random())]);
}

let board = [];
function initialize() {
    for(let arrayY of [0,1,2,3]) {
        board.push([]);
        for (let arrayX of [0,1,2,3]) {
            let newTile = new Tile(arrayX, arrayY, "", document.createElement("div"));
            newTile.htmlElement.className = "tile";
            board[arrayY].push(newTile);
            document.getElementById("board").appendChild(newTile.htmlElement);
        }
    }
    addTile();
    addTile();
}
initialize();

function runAnimation() {
}

function slide(slideDirection) {
    let dx = slideDirection[0];
    let dy = slideDirection[1];
    let xOrder = [[0,1,2,3],[3,2,1,0]][Number(dx == 1)];
    let yOrder = [[0,1,2,3],[3,2,1,0]][Number(dy == 1)];
    runAnimation();
    for (let tile of board.flat()) {
        tile.canMerge = true;
    }
    for (let yI of yOrder) {
        for (let xI of xOrder) {
            if (xOrder.includes(xI+dx) && yOrder.includes(yI+dy)) {
                if (board[yI+dy][xI+dx].value == board[yI][xI].value && board[yI][xI].value != "") {
                    board[yI+dy][xI+dx].changeValue(board[yI+dy][xI+dx].value + board[yI][xI].value);
                    board[yI][xI].changeValue("");
                }
            }
        }
    }
}

function keyPress(event) {
    //Maps input. Right -> [1,0], Left -> [-1,0], Up -> [0,1], Down -> [0,-1]
    let keyArray = [["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"],[[1,0],[-1,0],[0,-1],[0,1]]];
    if (keyArray[0].includes(event.key)) {
        slide(keyArray[1][keyArray[0].indexOf(event.key)]);
        //checkDeath();
        addTile();
    }
}
document.addEventListener("keyup",keyPress,false);


