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
    let winText = document.createTextNode("You have solved my puzzle. Nice job, NERD ¯ \\ _(ツ)_/¯ ");

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
            innerloop: for (let cellIndex = 0; cellIndex < mapArray[rowIndex].length; cellIndex++) {

                let currentCell = (newValue) => {
                    if (newValue) mapArray[rowIndex][cellIndex] = newValue;
                    return mapArray[rowIndex][cellIndex];
                };

                // function currentCell(newValue) {
                //     if (newValue) {
                //         mapArray[rowIndex][cellIndex] = newValue;
                //         return mapArray[rowIndex][cellIndex];
                //     }
                // }

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


                function moveRightOne() {
                    currentCell(" ");
                    rightOne("S");
                }

                function rightOneToP() {
                    currentCell(" ");
                    rightOne("P");
                }

                function rightOneFromO() {
                    currentCell("O");
                    rightOne("S");
                }

                function moveLeftOne() {
                    currentCell(" ");
                    leftOne("S");
                }

                function leftOneToP() {
                    currentCell(" ");
                    leftOne("P");
                }

                function leftOneFromO() {
                    currentCell("O");
                    leftOne("S");
                }

                function moveUpOne() {
                    currentCell(" ");
                    upOne("S");
                }

                function upOneToP() {
                    currentCell(" ");
                    upOne("P");
                }

                function upOneFromO() {
                    currentCell("O");
                    upOne("S");
                }

                function moveDownOne() {
                    currentCell(" ");
                    downOne("S");
                }

                function downOneToP() {
                    currentCell(" ");
                    downOne("P");
                }

                function downOneFromO() {
                    currentCell("O");
                    downOne("S");
                }

                // First 4 'if statements' move the player right/left/up/down on the condition that there is a box to move in the next cell, and that there is no storage space 2 cells over

                if (currentCell() === "S" && rightOne() === "B" && rightTwo() === " " && keyName === "ArrowRight") {
                    moveRightOne();

                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === "B" && leftTwo() === " " && keyName === "ArrowLeft") {
                    moveLeftOne();

                    leftTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === "B" && upTwo() === " " && keyName === "ArrowUp") {
                    moveUpOne();

                    upTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "B" && downTwo() === " " && keyName === "ArrowDown") {
                    moveDownOne();

                    downTwo("B");
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player right/left/up/down on the condition there is an empty space for them to move to

                if (currentCell() === "S" && rightOne() === " " && keyName === "ArrowRight") {
                    moveRightOne();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === " " && keyName === "ArrowLeft") {
                    moveLeftOne();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === " " && keyName === "ArrowUp") {
                    moveUpOne();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === " " && keyName === "ArrowDown") {
                    moveDownOne();

                    redrawBoard();
                    break outerloop;
                }

                // next 4 if statements allow a player to move into a storage space 

                if (currentCell() === "S" && rightOne() === "O" && keyName === "ArrowRight") {
                    rightOneToP();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === "O" && keyName === "ArrowLeft") {
                    leftOneToP();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === "O" && keyName === "ArrowUp") {
                    upOneToP();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "O" && keyName === "ArrowDown") {
                    downOneToP();

                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player off the storage space onto an adjacent space

                if (currentCell() === "P" && rightOne() === " " && keyName === "ArrowRight") {
                    rightOneFromO();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && leftOne() === " " && keyName === "ArrowLeft") {
                    leftOneFromO();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && upOne() === " " && keyName === "ArrowUp") {
                    upOneFromO();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && downOne() === " " && keyName === "ArrowDown") {
                    downOneFromO();

                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player from a storage space (P) into a box (B)

                if (currentCell() === "P" && rightOne() === "B" && rightTwo() === " " && keyName === "ArrowRight") {
                    rightOneFromO();

                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && leftOne() === "B" && leftTwo() === " " && keyName === "ArrowLeft") {
                    leftOneFromO();

                    leftTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && upOne() === "B" && upTwo() === " " && keyName === "ArrowUp") {
                    upOneFromO();

                    upTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && downOne() === "B" && downTwo() === " " && keyName === "ArrowDown") {
                    downOneFromO();

                    downTwo("B");
                    redrawBoard();
                    break outerloop;
                }

                // this line may be completely redundant

                if (currentCell() === "P" && rightOne() === "B" && rightTwo() === "O" && keyName === "ArrowRight") {
                    rightOneFromO();

                    rightTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && leftOne() === "B" && leftTwo() === "O" && keyName === "ArrowLeft") {
                    leftOneFromO();

                    leftTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && upOne() === "B" && upTwo() === "O" && keyName === "ArrowUp") {
                    upOneFromO();

                    upTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "P" && downOne() === "B" && downTwo() === "O" && keyName === "ArrowDown") {
                    downOneFromO();

                    downTwo("X");
                    redrawBoard();
                    break outerloop;
                }



                if (currentCell() === "S" && rightOne() === "X" && rightTwo() === " " && keyName === "ArrowRight") {
                    rightOneToP();

                    rightTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === "X" && leftTwo() === " " && keyName === "ArrowLeft") {
                    leftOneToP();

                    leftTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === "X" && upTwo() === " " && keyName === "ArrowUp") {
                    upOneToP();

                    upTwo("B");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "X" && downTwo() === " " && keyName === "ArrowDown") {
                    downOneToP();

                    downTwo("B");
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player and adjacent box onto a storage space, and change the storage space into a boxDot div (box occupying a storage space)

                if (currentCell() === "S" && rightOne() === "B" && rightTwo() === "O" && keyName === "ArrowRight") {
                    moveRightOne();

                    rightTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && leftOne() === "B" && leftTwo() === "O" && keyName === "ArrowLeft") {
                    moveLeftOne();

                    leftTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && upOne() === "B" && upTwo() === "O" && keyName === "ArrowUp") {
                    moveUpOne();

                    upTwo("X");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "S" && downOne() === "B" && downTwo() === "O" && keyName === "ArrowDown") {
                    moveDownOne();

                    downTwo("X");
                    redrawBoard();
                    break outerloop;
                }
            }
        }
    checkWin();
}

document.addEventListener("keydown", onKeyEvent);