const mapArray = [
    [" ", " ", "wall", "wall", "wall", "wall", "wall", " "],
    ["wall", "wall", "wall", " ", " ", " ", "wall", " "],
    ["wall", "storage", "player", "box", " ", " ", "wall", " "],
    ["wall", "wall", "wall", " ", "box", "storage", "wall", " "],
    ["wall", "storage", "wall", "wall", "box", " ", "wall", " "],
    ["wall", " ", "wall", " ", "storage", " ", "wall", "wall"],
    ["wall", "box", " ", "storageBox", "box", "box", "storage", "wall"],
    ["wall", " ", " ", " ", "storage", " ", " ", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"]
];

let isGameOver = false;

let createDiv = (type) => {
    divEl = document.createElement("div");
    divEl.className = "cell " + type;
    document.getElementById("container").appendChild(divEl);
}

let createBoard = () => {
    for (let i = 0; i < mapArray.length; i++) {
        for (let j = 0; j < mapArray[0].length; j++) {
            if (mapArray[i][j] === "wall") {
                createDiv("walls");
            }
            if (mapArray[i][j] === " ") {
                createDiv("floors");
            }
            if (mapArray[i][j] === "storage") {
                createDiv("storages");
            }
            if (mapArray[i][j] === "box") {
                createDiv("boxes")
            }
            if (mapArray[i][j] === "player") {
                createDiv("start");
            }
            if (mapArray[i][j] === "storageBox") {
                createDiv("storageBoxes");
            }
            if (mapArray[i][j] === "storagePlayer") {
                createDiv("storagePlayers")
            }
        }
    }
}

window.onload = function () {
    createBoard();
}

let redrawBoard = () => {
    let board = document.getElementById("container");
    board.innerHTML = "";
    createBoard();
}

let checkWin = () => {
    if (isGameOver) return false;

    let wins = document.getElementsByClassName("storageBoxes");
    let destination = document.getElementById("win");
    let winText = document.createTextNode("You win!");

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

                // The following 9 functions set new values to specific variables before redrawing the board...these variables are much easier to read and understand.

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

                // The following 12 functions are used to move the player (and boxes, if the player is next to a box) from floor spaces, storage spaces, and 'player storage spaces' (or previously empty storage spaces that the player now occupies)

                let movePlayer = (direction) => {
                    currentCell(" ");
                    direction("player");
                }


                // let moveRightOne = () => {
                //     currentCell(" ");
                //     rightOne("player");
                // }

                // let moveLeftOne = () => {
                //     currentCell(" ");
                //     leftOne("player");
                // }

                // let moveUpOne = () => {
                //     currentCell(" ");
                //     upOne("player");
                // }

                // let moveDownOne = () => {
                //     currentCell(" ");
                //     downOne("player");
                // }

                let rightOneToP = () => {
                    currentCell(" ");
                    rightOne("storagePlayer");
                }

                let leftOneToP = () => {
                    currentCell(" ");
                    leftOne("storagePlayer");
                }

                let upOneToP = () => {
                    currentCell(" ");
                    upOne("storagePlayer");
                }

                let downOneToP = () => {
                    currentCell(" ");
                    downOne("storagePlayer");
                }

                let rightOneFromO = () => {
                    currentCell("storage");
                    rightOne("player");
                }

                let leftOneFromO = () => {
                    currentCell("storage");
                    leftOne("player");
                }

                let upOneFromO = () => {
                    currentCell("storage");
                    upOne("player");
                }

                let downOneFromO = () => {
                    currentCell("storage");
                    downOne("player");
                }

                // if (currentCell() === "player" && rightOne() != "wall" && rightOne() != "storage" && rightOne() != "storageBox" && keyName === "ArrowRight") {
                    
                //         moveRightOne();
                //         rightTwo("box");
                //         redrawBoard();
                    
                //     if (rightOne() === "box" && rightTwo() === "O") {
                //         moveRightOne();
                //         rightTwo("storageBox");
                //         redrawBoard();
                //     }
                // }

                // First 4 'if statements' move the player right/left/up/down on the condition that there is a box to move in the next cell, and that there is no storage space 2 cells over

                if (currentCell() === "player" && rightOne() === "box" && rightTwo() === " " && keyName === "ArrowRight") {
                    // moveRightOne();
                    movePlayer(rightOne);
                    rightTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "box" && leftTwo() === " " && keyName === "ArrowLeft") {
                    // moveLeftOne();
                    movePlayer(leftOne);
                    leftTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && upOne() === "box" && upTwo() === " " && keyName === "ArrowUp") {
                    // moveUpOne();
                    movePlayer(upOne);
                    upTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && downOne() === "box" && downTwo() === " " && keyName === "ArrowDown") {
                    // moveDownOne();
                    movePlayer(downOne);
                    downTwo("box");
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player right/left/up/down on the condition there is an empty space for them to move to

                if (currentCell() === "player" && rightOne() === " " && keyName === "ArrowRight") {
                    // moveRightOne();
                    movePlayer(rightOne);
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === " " && keyName === "ArrowLeft") {
                    // moveLeftOne();
                    movePlayer(leftOne);
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && upOne() === " " && keyName === "ArrowUp") {
                    // moveUpOne();
                    movePlayer(upOne);
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && downOne() === " " && keyName === "ArrowDown") {
                    // moveDownOne();
                    movePlayer(downOne);
                    redrawBoard();
                    break outerloop;
                }

                // next 4 if statements allow a player to move into a storage space 

                if (currentCell() === "player" && rightOne() === "storage" && keyName === "ArrowRight") {
                    rightOneToP();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "storage" && keyName === "ArrowLeft") {
                    leftOneToP();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && upOne() === "storage" && keyName === "ArrowUp") {
                    upOneToP();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && downOne() === "storage" && keyName === "ArrowDown") {
                    downOneToP();

                    redrawBoard();
                    break outerloop;
                }

                if (currentCell() === "player" && rightOne() === "storageBox" && rightTwo() === " " && keyName === "ArrowRight") {
                    rightOneToP();

                    rightTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "storageBox" && leftTwo() === " " && keyName === "ArrowLeft") {
                    leftOneToP();

                    leftTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && upOne() === "storageBox" && upTwo() === " " && keyName === "ArrowUp") {
                    upOneToP();

                    upTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && downOne() === "storageBox" && downTwo() === " " && keyName === "ArrowDown") {
                    downOneToP();

                    downTwo("box");
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player and adjacent box onto a storage space, and change the storage space into a boxDot div (box occupying a storage space)

                if (currentCell() === "player" && rightOne() === "box" && rightTwo() === "storage" && keyName === "ArrowRight") {
                    // moveRightOne();
                    movePlayer(rightOne);
                    rightTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "box" && leftTwo() === "storage" && keyName === "ArrowLeft") {
                    // moveLeftOne();
                    movePlayer(leftOne);
                    leftTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && upOne() === "box" && upTwo() === "storage" && keyName === "ArrowUp") {
                    // moveUpOne();
                    movePlayer(upOne);
                    upTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "player" && downOne() === "box" && downTwo() === "storage" && keyName === "ArrowDown") {
                    // moveDownOne();
                    movePlayer(downOne);
                    downTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player off the storage space onto an adjacent space

                if (currentCell() === "storagePlayer" && rightOne() === " " && keyName === "ArrowRight") {
                    rightOneFromO();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && leftOne() === " " && keyName === "ArrowLeft") {
                    leftOneFromO();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && upOne() === " " && keyName === "ArrowUp") {
                    upOneFromO();

                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && downOne() === " " && keyName === "ArrowDown") {
                    downOneFromO();

                    redrawBoard();
                    break outerloop;
                }

                // next 4 'if statements' move the player from a storage space (P) into a box (B)

                if (currentCell() === "storagePlayer" && rightOne() === "box" && rightTwo() === " " && keyName === "ArrowRight") {
                    rightOneFromO();

                    rightTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && leftOne() === "box" && leftTwo() === " " && keyName === "ArrowLeft") {
                    leftOneFromO();

                    leftTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && upOne() === "box" && upTwo() === " " && keyName === "ArrowUp") {
                    upOneFromO();

                    upTwo("box");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && downOne() === "box" && downTwo() === " " && keyName === "ArrowDown") {
                    downOneFromO();

                    downTwo("box");
                    redrawBoard();
                    break outerloop;
                }

                // this line may be completely redundant

                if (currentCell() === "storagePlayer" && rightOne() === "box" && rightTwo() === "storage" && keyName === "ArrowRight") {
                    rightOneFromO();

                    rightTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && leftOne() === "box" && leftTwo() === "storage" && keyName === "ArrowLeft") {
                    leftOneFromO();

                    leftTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && upOne() === "box" && upTwo() === "storage" && keyName === "ArrowUp") {
                    upOneFromO();

                    upTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && downOne() === "box" && downTwo() === "storage" && keyName === "ArrowDown") {
                    downOneFromO();

                    downTwo("storageBox");
                    redrawBoard();
                    break outerloop;
                }
            }
        }
    checkWin();
}

document.addEventListener("keydown", onKeyEvent);