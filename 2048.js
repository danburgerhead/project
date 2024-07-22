let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];


function addTile() {
    //Picks a random position on the board that has no value
    let randX;
    let randY;
    while (board[randY][randX] != 0) {
        randX = Math.floor(4 * Math.random());
        randY = Math.floor(4 * Math.random());
    }
    //Replaces position with 2 (90% chance) or 4 (10% chance)
    board[randY][randX] = [2,2,2,2,2,2,2,2,2,4][floor(10 * Math.random())];
}
function slide(dx,dy) {
    
}