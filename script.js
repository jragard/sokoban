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

                    return mapArray[rowIndex][cellIndex - 1];
                }

                let leftTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex - 2] = newValue;

                    return mapArray[rowIndex][cellIndex - 2];
                }

                let upOne = (newValue) => {
                    if (newValue) mapArray[rowIndex - 1][cellIndex] = newValue;

                    return mapArray[rowIndex - 1][cellIndex];
                }

                let upTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex - 2][cellIndex] = newValue;

                    return mapArray[rowIndex - 2][cellIndex];
                }

                let downOne = (newValue) => {
                    if (newValue) mapArray[rowIndex + 1][cellIndex] = newValue;

                    return mapArray[rowIndex + 1][cellIndex];
                }

                let downTwo = (newValue) => {
                    if (newValue) mapArray[rowIndex + 2][cellIndex] = newValue;

                    return mapArray[rowIndex + 2][cellIndex];
                }

    



                // function moveRight() {
                //     currentCell(" ");
                //     rightOne("S");
                    
                // }

                // function moveLeft() {
                //     currentCell(" ");
                //     leftOne("S");
                // }

                // function moveUp() {
                //     currentCell(" ");
                //     upOne("S");
                // }

                // function moveDown() {
                //     currentCell(" ");
                //     downOne("S");
                // }



                // First 4 'if statements' move the player right/left/up/down on the condition that there is a box to move in the next cell, and that there is no storage space 2 cells over

                if (currentCell() === "S" && rightOne() === "B" && rightTwo() === " " && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("S");
                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === "B" && leftTwo() === " " && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell(" ");
                    leftOne("S");
                    leftTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === "B" && upTwo() === " " && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell(" ");
                    upOne("S");
                    upTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "B" && downTwo() === " " && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell(" ");
                    downOne("S")
                    downTwo("B");
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
                if (currentCell() === "S" && leftOne() === " " && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell(" ");
                    leftOne("S");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === " " && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell(" ");
                    upOne("S");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === " " && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell(" ");
                    downOne("S");
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
                if (currentCell() === "S" && leftOne() === "O" && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell(" ");
                    leftOne("P");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "S" && upOne() === "O" && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell(" ");
                    upOne("P");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "O" && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell(" ");
                    downOne("P");
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
                if (currentCell() === "P" && leftOne() === " " && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell("O");
                    leftOne("S");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "P" && upOne() === " " && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell("O");
                    upOne("S");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && downOne() === " " && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell("O");
                    downOne("S");
                    redrawBoard();
                    break outerloop;
                }


                // next 4 'if statements' move the player from a storage space (P) into a box (B)

                if (currentCell() === "P" && rightOne() === "B" && rightTwo() === " " && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell("O");
                    rightOne("S");
                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && leftOne() === "B" && leftTwo() === " " && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell("O");
                    leftOne("S")
                    leftTwo("B");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "P" && upOne() === "B" && upTwo() === " " && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell("O");
                    upOne("S");
                    upTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && downOne() === "B" && downTwo() === " " && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell("O");
                    downOne("S");
                    downTwo("B");
                    redrawBoard();
                    break outerloop;
                }

                // this line may be completely redundant

                if (currentCell() === "P" && rightOne() === "B" && rightTwo() === "O" && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell("O");
                    rightOne("S");
                    rightTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && leftOne() === "B" && leftTwo() === "O" && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell("O");
                    leftOne("S");
                    leftTwo("X");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "P" && upOne() === "B" && upTwo() === "O" && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell("O");
                    upOne("S");
                    upTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && downOne() === "B" && downTwo() === "O" && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell("O");
                    downOne("S");
                    downTwo("X");
                    redrawBoard();
                    break outerloop;
                }



                if (currentCell() === "S" && rightOne() === "X" && rightTwo() === " " && keyName === "ArrowRight") {
                    // moveRight();
                    currentCell(" ");
                    rightOne("P");
                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === "X" && leftTwo() === " " && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell(" ");
                    leftOne("P");
                    leftTwo("B");
                    redrawBoard();
                    break;
                }
                if (currentCell() === "S" && upOne() === "X" && upTwo() === " " && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell(" ");
                    upOne("P");
                    upTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "X" && downTwo() === " " && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell(" ");
                    downOne("P");
                    downTwo("B");
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
                if (currentCell() === "S" && leftOne() === "B" && leftTwo() === "O" && keyName === "ArrowLeft") {
                    // moveLeft();
                    currentCell(" ");
                    leftOne("S")
                    leftTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === "B" && upTwo() === "O" && keyName === "ArrowUp") {
                    // moveUp();
                    currentCell(" ");
                    upOne("S")
                    upTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "B" && downTwo() === "O" && keyName === "ArrowDown") {
                    // moveDown();
                    currentCell(" ");
                    downOne("S");
                    downTwo("X");
                    redrawBoard();
                    break outerloop;
                }





            }
        }
    checkWin();
}

document.addEventListener("keydown", onKeyEvent);