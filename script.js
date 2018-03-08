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

let classNames = {
    wall: "walls",
    " ": "floors",
    storage: "storages",
    box: "boxes",
    player: "start",
    storageBox: "storageBoxes",
    storagePlayer: "storagePlayers"
};

// use a look up table (forEach)
let createBoard = () => {
    mapArray.forEach(row => 
        row.forEach(cell => 
            createDiv(classNames[cell])
        )
    ); 
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

let getLocations = (key, rowIndex, cellIndex) => {
    let dirs = {
        one: {
            row: rowIndex, 
            cell: cellIndex
        }, 
        two: {
            row: rowIndex,
            cell: cellIndex
        }
    };

    switch (key) {
        case "ArrowRight":
            dirs.one.cell++;
            dirs.two.cell += 2;
            break;
        case "ArrowLeft":
            dirs.one.cell--;
            dirs.two.cell -= 2;
            break;
        case "ArrowUp":
            dirs.one.row--;
            dirs.two.row -= 2;
            break;
        case "ArrowDown":
            dirs.one.row++;
            dirs.two.row += 2;
            break;
    }
    return dirs;
}

let movePlayer = (currentSpace, firstSpace, secondSpace, cell = "box") => {
    mapArray[currentSpace.row][currentSpace.cell] = " ";
    mapArray[firstSpace.row][firstSpace.cell] = "player";
    if (secondSpace) {
        mapArray[secondSpace.row][secondSpace.cell] = cell;
    }
    redrawBoard();
}

let playerToStorage = (currentSpace, firstSpace, secondSpace) => {
    mapArray[currentSpace.row][currentSpace.cell] = " ";
    mapArray[firstSpace.row][firstSpace.cell] = "storagePlayer";
    if (secondSpace) {
        mapArray[secondSpace.row][secondSpace.cell] = "box";
    }
    redrawBoard();
}

let playerFromStorage = (currentSpace, firstSpace, secondSpace, cell = "box") => {
    mapArray[currentSpace.row][currentSpace.cell] = "storage";
    mapArray[firstSpace.row][firstSpace.cell] = "player";
    if (secondSpace) {
        mapArray[secondSpace.row][secondSpace.cell] = cell;
    }
    redrawBoard();
}

const onKeyEvent = (event) => {

    outerloop:
        for (let rowIndex = 0; rowIndex < mapArray.length; rowIndex++) {
            innerloop: for (let cellIndex = 0; cellIndex < mapArray[rowIndex].length; cellIndex++) {
       
                const {one, two} = getLocations(event.key, rowIndex, cellIndex);
                const current = mapArray[rowIndex][cellIndex];                
                const currentSpace = {
                    row: rowIndex,
                    cell: cellIndex
                }
                if (current === "player" && mapArray[one.row][one.cell] === "box" && mapArray[two.row][two.cell] === " ") {
                    movePlayer(currentSpace, one, two);
                    break outerloop;
                }
                
                if (current === "player" && mapArray[one.row][one.cell] === "box" && mapArray[two.row][two.cell] === "storage") {
                    movePlayer(currentSpace, one, two, "storageBox");
                    break outerloop;                
                }

                if (current === "player" && mapArray[one.row][one.cell] === " ") {
                    movePlayer(currentSpace, one);
                    break outerloop;
                }

                if (current === "player" && mapArray[one.row][one.cell] === "storage") {
                    playerToStorage(currentSpace, one);
                    break outerloop;
                }

                if (current === "player" && mapArray[one.row][one.cell] === "storageBox" && mapArray[two.row][two.cell] === " ") {
                    playerToStorage(currentSpace, one, two);
                    break outerloop;
                }

                if (current === "storagePlayer" && mapArray[one.row][one.cell] === " ") {
                    playerFromStorage(currentSpace, one);
                    break outerloop;
                }

                if (current === "storagePlayer" && mapArray[one.row][one.cell] === "box" && mapArray[two.row][two.cell] === " ") {
                    playerFromStorage(currentSpace, one, two);
                    break outerloop;
                }

                if (current === "storagePlayer" && mapArray[one.row][one.cell] === "box" && mapArray[two.row][two.cell] === "storage") {
                    playerFromStorage(currentSpace, one, two, "storageBox");
                    break outerloop;
                } 
            }
        }
    checkWin();
}

document.addEventListener("keydown", onKeyEvent);