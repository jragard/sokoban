const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

const mapArray = [];
let isGameOver = false;

for (let i = 0; i < map.length; i++) {
    mapArray.push([]);
    mapArray[i].push(...map[i].split(""));
}

function createDiv(type) {
    divEl = document.createElement("div");
    divEl.className = "cell " + type;
    document.getElementById("container").appendChild(divEl);
}

function createMaze() {
    for (let i = 0; i < mapArray.length; i++) {
        for (let j = 0; j < mapArray[0].length; j++) {
            if (mapArray[i][j] === "W") {
                createDiv("wall");
            }
            if (mapArray[i][j] === " ") {
                createDiv("floor");
            }
            if (mapArray[i][j] === "O") {
                createDiv("storage");
            }
            if (mapArray[i][j] === "B") {
                createDiv("box")
            }
            if (mapArray[i][j] === "S") {
                createDiv("start");
            }
            if (mapArray[i][j] === "X") {
                createDiv("boxDot");
            }
            if (mapArray[i][j] === "P") {
                createDiv("playerDot")
            }
        }
    }
}


window.onload = function () {
    createMaze();

}

function redrawBoard() {
    let board = document.getElementById("container");
    board.innerHTML = "";
    createMaze();
}

function checkWin() {
    if (isGameOver) return false;

    let wins = document.getElementsByClassName("boxDot");
    let destination = document.getElementById("win");
    let winText = document.createTextNode("You Win");

    if (wins.length == 7) {
        isGameOver = true;
        destination.appendChild(winText);
        document.removeEventListener("keydown", onKeyEvent);
    }
}

const onKeyEvent = (event) => {

    const keyName = event.key;

    outerloop:
        for (let rowIndex = 0; rowIndex < mapArray.length; rowIndex++) {
            innerloop: 
                for (let cellIndex = 0; cellIndex < mapArray[rowIndex].length; cellIndex++) {

                let currentCell = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex] = newValue;

                    return mapArray[rowIndex][cellIndex];
                };

                let rightOne = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex + 1] = newValue;

                    return mapArray[rowIndex][cellIndex + 1];
                }

                let rightTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex + 2] = newValue;

                    return mapArray[rowIndex][cellIndex + 2];
                }

                let leftOne = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex - 1] = newValue;

                    return mapArray[rowIndex][cellIndex - 1] = newValue;
                }

                let leftTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex - 2] = newValue;

                    return mapArray[rowIndex][cellIndex - 2] = newValue;
                }

                let upOne = (newValue) => {
                    if (newValue) mapArray[rowIndex - 1][cellIndex] = newValue;

                    return mapArray[rowIndex - 1][cellIndex] = newValue;
                }

                let upTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex - 2][cellIndex] = newValue;

                    return mapArray[rowIndex - 2][cellIndex] = newValue;
                }

                let downOne = (newValue) => {
                    if (newValue) mapArray[rowIndex + 1][cellIndex] = newValue;

                    return mapArray[rowIndex + 1][cellIndex] = newValue;
                }

                let downTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex + 2][cellIndex] = newValue;

                    return mapArray[rowIndex + 2][cellIndex] = newValue;
                }

    



                function moveRight() {
                    currentCell(" ");
                    rightOne("S");
                    
                }

                function moveLeft() {
                    currentCell(" ");
                    mapArray[rowIndex][cellIndex - 1] = "S";
                }

                function moveUp() {
                    currentCell(" ");
                    mapArray[rowIndex - 1][cellIndex] = "S";
                }

                function moveDown() {
                    currentCell(" ");
                    mapArray[rowIndex + 1][cellIndex] = "S";
                }



                // First 4 'if statements' move the player right/left/up/down on the condition that there is a box to move in the next cell, and that there is no storage space 2 cells over

                if (currentCell() === "S" && rightOne() === "B" && rightTwo() != "O" && rightTwo() != "B" && rightTwo() != "X" && rightTwo() != "W" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("S");
                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex][cellIndex - 1] === "B" && mapArray[rowIndex][cellIndex - 2] != "O" && mapArray[rowIndex][cellIndex - 2] != "B" && mapArray[rowIndex][cellIndex - 2] != "X" && mapArray[rowIndex][cellIndex - 2] != "W" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 2] = "B";
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex - 1][cellIndex] === "B" && mapArray[rowIndex - 2][cellIndex] != "O" && mapArray[rowIndex - 2][cellIndex] != "B" && mapArray[rowIndex - 2][cellIndex] != "X" && mapArray[rowIndex - 2][cellIndex] != "W" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 2][cellIndex] = "B";
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex + 1][cellIndex] === "B" && mapArray[rowIndex + 2][cellIndex] != "O" && mapArray[rowIndex + 2][cellIndex] != "B" && mapArray[rowIndex + 2][cellIndex] != "X" && mapArray[rowIndex + 2][cellIndex] != "W" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 2][cellIndex] = "B";
                    redrawBoard();
                    break outerloop;
                }



                // next 4 'if statements' move the player right/left/up/down on the condition there is an empty space for them to move to

                if (currentCell() === "S" && rightOne() === " " && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("S");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex][cellIndex - 1] === " " && keyName === "ArrowLeft") {
                    moveLeft();
                    redrawBoard();
                    break;
                }
                if (currentCell() === "S" && mapArray[rowIndex - 1][cellIndex] === " " && keyName === "ArrowUp") {
                    moveUp();
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex + 1][cellIndex] === " " && keyName === "ArrowDown") {
                    moveDown();
                    redrawBoard();
                    break outerloop;
                }


                // next 4 if statements allow a player to move into a storage space 


                if (currentCell() === "S" && rightOne() === "O" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("P");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex][cellIndex - 1] === "O" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 1] = "P";
                    redrawBoard();
                    break;
                }
                if (currentCell() === "S" && mapArray[rowIndex - 1][cellIndex] === "O" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 1][cellIndex] = "P";
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex + 1][cellIndex] === "O" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 1][cellIndex] = "P";
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player off the storage space onto an adjacent space

                if (currentCell() === "P" && rightOne() === " " && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("S");
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && mapArray[rowIndex][cellIndex - 1] === " " && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 1] = "S";
                    currentCell("O");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "P" && mapArray[rowIndex - 1][cellIndex] === " " && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 1][cellIndex] = "S";
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && mapArray[rowIndex + 1][cellIndex] === " " && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 1][cellIndex] = "S";
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }


                // next 4 'if statements' move the player from a storage space (P) into a box (B)

                if (currentCell() === "P" && rightOne() === "B" && rightTwo() != "O" && rightTwo() != "B" && rightTwo() != "W" && rightTwo() != "X" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell("O");
                    rightOne("S");
                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && mapArray[rowIndex][cellIndex - 1] === "B" && mapArray[rowIndex][cellIndex - 2] != "O" && mapArray[rowIndex][cellIndex - 2] != "B" && mapArray[rowIndex][cellIndex - 2] != "W" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 2] = "B";
                    currentCell("O");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "P" && mapArray[rowIndex - 1][cellIndex] === "B" && mapArray[rowIndex - 2][cellIndex] != "O" && mapArray[rowIndex - 2][cellIndex] != "B" && mapArray[rowIndex - 2][cellIndex] != "W" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 2][cellIndex] = "B";
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && mapArray[rowIndex + 1][cellIndex] === "B" && mapArray[rowIndex + 2][cellIndex] != "O" && mapArray[rowIndex + 2][cellIndex] != "B" && mapArray[rowIndex + 2][cellIndex] != "W" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 2][cellIndex] = "B";
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }

                // this line may be completely redundant

                if (currentCell() === "P" && rightOne() === "B" && rightTwo() != "X" && rightTwo() != "B" && rightTwo() != "W" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell("O");
                    rightOne("S");
                    rightTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && mapArray[rowIndex][cellIndex - 1] === "B" && mapArray[rowIndex][cellIndex - 2] != "X" && mapArray[rowIndex][cellIndex - 2] != "B" && mapArray[rowIndex][cellIndex - 2] != "W" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 2] = "X";
                    currentCell("O");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "P" && mapArray[rowIndex - 1][cellIndex] === "B" && mapArray[rowIndex - 2][cellIndex] != "X" && mapArray[rowIndex - 2][cellIndex] != "B" && mapArray[rowIndex - 2][cellIndex] != "W" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 2][cellIndex] = "X";
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && mapArray[rowIndex + 1][cellIndex] === "B" && mapArray[rowIndex + 2][cellIndex] != "X" && mapArray[rowIndex + 2][cellIndex] != "B" && mapArray[rowIndex + 2][cellIndex] != "W" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 2][cellIndex] = "X";
                    currentCell("O");
                    redrawBoard();
                    break outerloop;
                }



                if (currentCell() === "S" && rightOne() === "X" && rightTwo() != "W" && rightTwo() != "B" && rightTwo() != "O" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("P");
                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex][cellIndex - 1] === "X" && mapArray[rowIndex][cellIndex - 2] != "W" && mapArray[rowIndex][cellIndex - 2] != "B" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 2] = "B";
                    mapArray[rowIndex][cellIndex - 1] = "P"
                    redrawBoard();
                    break;
                }
                if (currentCell() === "S" && mapArray[rowIndex - 1][cellIndex] === "X" && mapArray[rowIndex - 2][cellIndex] != "W" && mapArray[rowIndex - 2][cellIndex] != "B" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 2][cellIndex] = "B";
                    mapArray[rowIndex - 1][cellIndex] = "P"
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex + 1][cellIndex] === "X" && mapArray[rowIndex + 2][cellIndex] != "W" && mapArray[rowIndex + 2][cellIndex] != "B" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 2][cellIndex] = "B";
                    mapArray[rowIndex + 1][cellIndex] = "P"
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player and adjacent box onto a storage space, and change the storage space into a boxDot div (box occupying a storage space)

                if (currentCell() === "S" && rightOne() === "B" && rightTwo() === "O" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("S");
                    rightTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex][cellIndex - 1] === "B" && mapArray[rowIndex][cellIndex - 2] === "O" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[rowIndex][cellIndex - 2] = "X";
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex - 1][cellIndex] === "B" && mapArray[rowIndex - 2][cellIndex] === "O" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[rowIndex - 2][cellIndex] = "X";
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && mapArray[rowIndex + 1][cellIndex] === "B" && mapArray[rowIndex + 2][cellIndex] === "O" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[rowIndex + 2][cellIndex] = "X";
                    redrawBoard();
                    break outerloop;
                }





            }
        }
    checkWin();
}

document.addEventListener("keydown", onKeyEvent);