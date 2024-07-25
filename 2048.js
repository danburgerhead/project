
class Tile {
    constructor(x, y, value, htmlElement) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.htmlElement = htmlElement;
    }
    changeValue(newValue) {
        this.value = newValue;
    }
    updateTile() {
        this.htmlElement.className = "tile x" + this.value;
        this.htmlElement.textContent = this.value;
    }
}

class AnimTile {
    constructor(x, y, value, htmlElement) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.htmlElement = htmlElement;
        this.htmlElement.className = "animTile x" + this.value;
        this.htmlElement.textContent = this.value;
        this.htmlElement.style.left = board[this.y][this.x].htmlElement.offsetLeft + "px";
        this.htmlElement.style.top = board[this.y][this.x].htmlElement.offsetTop + "px";
        this.animationTimer = [];
        this.timesMoved = 0;
        this.tx;
        this.ty;
    }
    animSlideMove(ox,oy,tx,ty) {
        this.timesMoved++;
        this.htmlElement.style.left = (parseFloat(this.htmlElement.style.left,10) + (tx-ox)/20) + "px";
        this.htmlElement.style.top = (parseFloat(this.htmlElement.style.top,10) + (ty-oy)/20) + "px";
        
        console.log("left:" + parseInt(this.htmlElement.style.left,10));
        console.log("top:" + parseInt(this.htmlElement.style.top,10));
        console.log("Move " + this.timesMoved + ": " + ox + ", " + oy + ", " + tx + ", " + ty);
        console.log("Increase by " + (tx-ox)/200 + ", " + (ty-oy)/200);
        console.log(this.timesMoved >= 20);
        if (this.timesMoved >= 20) {
            for (let i of this.animationTimer) {
                clearInterval(i);
            }
            this.animationTimer = [];
            this.htmlElement.style.left = tx + "px";
            this.htmlElement.style.top = ty + "px";
            this.tx = parseFloat(this.htmlElement.style.left,10);
            this.ty = parseFloat(this.htmlElement.style.top,10);
            this.htmlElement.remove();
        }
    }
    animSlide() {
        let [ox, oy] = [board[this.y][this.x].htmlElement.offsetLeft,board[this.y][this.x].htmlElement.offsetTop];
        let nx;
        let ny;
        //Find nx,ny
        for (let i = 0; i < 3; i++) {
            if (animSteps.length > i) {
                let newPosition = animSteps[i].filter(move => move[0][0] == this.x && move[0][1] == this.y);
                if (newPosition.length > 0) {
                    this.x = newPosition[0][1][0];
                    this.y = newPosition[0][1][1];
                }
                else {
                    i = 3;
                }
            }
        }
        [nx, ny] = [this.x, this.y];
        [this.tx, this.ty] = [board[ny][nx].htmlElement.offsetLeft,board[ny][nx].htmlElement.offsetTop];
        for (let i of this.animationTimer) {
            clearInterval(i);
        }
        this.animationTimer = [];
        let interval = setInterval(() => this.animSlideMove(ox,oy,this.tx,this.ty), 1);
        this.animationTimer.push(interval);
        // this.htmlElement.style.left = tx + "px";
        // this.htmlElement.style.top = ty + "px";
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
    board[randY][randX].updateTile();
}

let board = [];
let animTiles = [];
let animSteps = [];
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

function slide(slideDirection) {
    let dx = slideDirection[0];
    let dy = slideDirection[1];
    let xOrder = [[0,1,2,3],[3,2,1,0]][Number(dx == 1)];
    let yOrder = [[0,1,2,3],[3,2,1,0]][Number(dy == 1)];
    let legalMove = false;
    board = board.map(row => row.map(tile => {tile.value = [tile.value]; return tile;})); //Turns all values of tile objects into arrays
    animSteps = [];
    for (let i = 0; i < 3; i++) {
        animSteps.push([]);
        for (let yI of yOrder) {
            for (let xI of xOrder) {
                if (xOrder.includes(xI+dx) && yOrder.includes(yI+dy)) { //Checks for edge and avoids error
                    if (board[yI+dy][xI+dx].value.length < 2 && board[yI][xI].value[0] !== "") {
                        if (board[yI+dy][xI+dx].value[0] === "" || board[yI+dy][xI+dx].value[0] === board[yI][xI].value[0]) {
                            animSteps[i].push([[xI,yI],[xI+dx,yI+dy]]);
                            while (board[yI][xI].value.length > 0) {
                                board[yI+dy][xI+dx].value.push(board[yI][xI].value.pop());
                                board[yI+dy][xI+dx].value = board[yI+dy][xI+dx].value.filter(v => v !== "");
                            }
                            board[yI][xI].value.push("");
                            legalMove = true;
                        }
                    }
                }
            }
        }
        if (animSteps[i].length == 0) {
            animSteps.pop();
            i = 3;
        }
    }
    for (let yI of yOrder) {
        for (let xI of xOrder) {
            if (board[yI][xI].value.length > 1) {
                document.getElementById("score").textContent = Number(document.getElementById("score").textContent) + Number(board[yI][xI].value[0]) + Number(board[yI][xI].value[1]);
                board[yI][xI].changeValue([Number(board[yI][xI].value[0]) + Number(board[yI][xI].value[1])]);
            }
            board[yI][xI].value = board[yI][xI].value[0];
            board[yI][xI].updateTile();
        }
    }
    return legalMove;
}

function checkDeath() {
    console.log("deathcheck");
    let alive = false;
    for (let tile of board.flat().filter(t => (t.x + t.y) % 2 == 0)) {
        for (let d of [[0,1],[0,-1],[1,0],[-1,0]]) {
            let [dx,dy] = [d[0],d[1]];
            if ([0,1,2,3].includes(tile.x+dx) && [0,1,2,3].includes(tile.y+dy)) {
                if(tile.value == board[tile.y+dy][tile.x+dx].value) {
                    alive = true;
                    return alive;
                }
            }
        }
    }
    console.log("Ded L");
    return alive;
}

function slideAnim() {
    for(let animTile of animTiles) {
        animTile.animSlide();
    }
}

function keyPress(event) {
    //Maps input. Right -> [1,0], Left -> [-1,0], Up -> [0,1], Down -> [0,-1]
    let keyArray = [["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"],[[1,0],[-1,0],[0,-1],[0,1]]];
    if (keyArray[0].includes(event.key)) {
        for (let animTile in animTiles) {
            animTile.timesMoved = 20;
        }
        for (let tile of board.flat().filter(t => t.value !== "")) { //Creates AnimTiles
            let newAnimTile = new AnimTile(tile.x, tile.y, tile.value, document.createElement("div"));
            document.getElementById("board").appendChild(newAnimTile.htmlElement);
            animTiles.push(newAnimTile);
        }
        let slideLegal = slide(keyArray[1][keyArray[0].indexOf(event.key)]);
        console.log("animSteps");
        console.log(animSteps);
        for (let tile of board.flat()) {
            tile.htmlElement.className = "tile x";
            tile.htmlElement.textContent = "";
        }
        slideAnim();
        for (let tile of board.flat()) {
            tile.updateTile();
        }
        if (slideLegal) {
            addTile();
        }
        if (board.flat().filter((tile) => tile.value == "").length == 0) { //When board is filled
            checkDeath();
        }
    }
}
document.addEventListener("keyup",keyPress,false);