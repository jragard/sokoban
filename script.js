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

                let movePlayer = (direction, boxDirection = false, storageBoxDirection = false) => {
                    currentCell(" ");
                    direction("player");
                    if (boxDirection) boxDirection("box");
                    if (storageBoxDirection) storageBoxDirection("storageBox");
                    redrawBoard();
                }

                let playerToStorage = (direction, boxDirection = false) => {
                    currentCell(" ");
                    direction("storagePlayer");
                    if (boxDirection) boxDirection("box");
                    redrawBoard();
                }

                let playerFromStorage = (direction, boxDirection = false, storageBoxDirection = false) => {
                    currentCell("storage");
                    direction("player");
                    if (boxDirection) boxDirection("box");
                    if (storageBoxDirection) storageBoxDirection("storageBox")
                    redrawBoard();
                }

    
                if (currentCell() === "player" && rightOne() === "box" && rightTwo() === " " && keyName === "ArrowRight") {
                    movePlayer(rightOne, rightTwo);
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "box" && leftTwo() === " " && keyName === "ArrowLeft") {
                    movePlayer(leftOne, leftTwo);
                }
                if (currentCell() === "player" && upOne() === "box" && upTwo() === " " && keyName === "ArrowUp") {
                    movePlayer(upOne, upTwo);
                }
                if (currentCell() === "player" && downOne() === "box" && downTwo() === " " && keyName === "ArrowDown") {
                    movePlayer(downOne, downTwo);
                    break outerloop;
                }
                if (currentCell() === "player" && rightOne() === " " && keyName === "ArrowRight") {
                    movePlayer(rightOne);
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === " " && keyName === "ArrowLeft") {
                    movePlayer(leftOne);
                }
                if (currentCell() === "player" && upOne() === " " && keyName === "ArrowUp") {
                    movePlayer(upOne);
                }
                if (currentCell() === "player" && downOne() === " " && keyName === "ArrowDown") {
                    movePlayer(downOne);
                    break outerloop;
                }
                if (currentCell() === "player" && rightOne() === "storage" && keyName === "ArrowRight") {
                    playerToStorage(rightOne);
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "storage" && keyName === "ArrowLeft") {
                    playerToStorage(leftOne);
                }
                if (currentCell() === "player" && upOne() === "storage" && keyName === "ArrowUp") {
                    playerToStorage(upOne);
                }
                if (currentCell() === "player" && downOne() === "storage" && keyName === "ArrowDown") {
                    playerToStorage(downOne);
                    break outerloop;
                }
                if (currentCell() === "player" && rightOne() === "storageBox" && rightTwo() === " " && keyName === "ArrowRight") {
                    playerToStorage(rightOne, rightTwo);
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "storageBox" && leftTwo() === " " && keyName === "ArrowLeft") {
                    playerToStorage(leftOne, leftTwo);
                }
                if (currentCell() === "player" && upOne() === "storageBox" && upTwo() === " " && keyName === "ArrowUp") {
                    playerToStorage(upOne, upTwo);
                }
                if (currentCell() === "player" && downOne() === "storageBox" && downTwo() === " " && keyName === "ArrowDown") {
                    playerToStorage(downOne, downTwo);
                    break outerloop;
                }
                if (currentCell() === "player" && rightOne() === "box" && rightTwo() === "storage" && keyName === "ArrowRight") {
                    movePlayer(rightOne, false, rightTwo);
                    break outerloop;
                }
                if (currentCell() === "player" && leftOne() === "box" && leftTwo() === "storage" && keyName === "ArrowLeft") {
                    movePlayer(leftOne, false, leftTwo);
                }
                if (currentCell() === "player" && upOne() === "box" && upTwo() === "storage" && keyName === "ArrowUp") {
                    movePlayer(upOne, false, upTwo);
                }
                if (currentCell() === "player" && downOne() === "box" && downTwo() === "storage" && keyName === "ArrowDown") {
                    movePlayer(downOne, false, downTwo);
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && rightOne() === " " && keyName === "ArrowRight") {
                    playerFromStorage(rightOne);
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && leftOne() === " " && keyName === "ArrowLeft") {
                    playerFromStorage(leftOne);
                }
                if (currentCell() === "storagePlayer" && upOne() === " " && keyName === "ArrowUp") {
                    playerFromStorage(upOne);
                }
                if (currentCell() === "storagePlayer" && downOne() === " " && keyName === "ArrowDown") {
                    playerFromStorage(downOne);
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && rightOne() === "box" && rightTwo() === " " && keyName === "ArrowRight") {
                    playerFromStorage(rightOne, rightTwo, false);
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && leftOne() === "box" && leftTwo() === " " && keyName === "ArrowLeft") {
                    playerFromStorage(leftOne, leftTwo, false);
                }
                if (currentCell() === "storagePlayer" && upOne() === "box" && upTwo() === " " && keyName === "ArrowUp") {
                    playerFromStorage(upOne, upTwo, false);

                }
                if (currentCell() === "storagePlayer" && downOne() === "box" && downTwo() === " " && keyName === "ArrowDown") {
                    playerFromStorage(downOne, downTwo, false);
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && rightOne() === "box" && rightTwo() === "storage" && keyName === "ArrowRight") {
                    playerFromStorage(rightOne, false, rightTwo);
                    break outerloop;
                }
                if (currentCell() === "storagePlayer" && leftOne() === "box" && leftTwo() === "storage" && keyName === "ArrowLeft") {
                    playerFromStorage(leftOne, false, leftTwo);
                }
                if (currentCell() === "storagePlayer" && upOne() === "box" && upTwo() === "storage" && keyName === "ArrowUp") {
                    playerFromStorage(upOne, false, upTwo);
                }
                if (currentCell() === "storagePlayer" && downOne() === "box" && downTwo() === "storage" && keyName === "ArrowDown") {
                    playerFromStorage(downOne, false, downTwo);
                    break outerloop;
                }
            }
        }
    checkWin();
}

document.addEventListener("keydown", onKeyEvent);