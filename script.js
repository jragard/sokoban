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

// function createPlayer() {
//     playerDiv = document.createElement("div");
//     playerDiv.className = "player";
//     startCell = document.getElementsByClassName("start");
//     startCell[0].appendChild(playerDiv);
// }

let boxOnStorage = document.createElement("div");
boxOnStorage.className = "box cell"

// function checkWin() {
//     let wins = document.getElementsByClassName("boxDot");
//     let destination = document.createElement("div");
//     let winText = document.createTextNode("You Win");
//     if (wins.length === 7) {
//         destination.appendChild(winText);
//     }
// }

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

// let startTop = 0;
// let startLeft = 0;

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
        for (let i = 0; i < mapArray.length; i++) {
            innerloop: 
                for (let j = 0; j < mapArray[i].length; j++) {

                // var currentCell = mapArray[i][j];

                // var rightOne = mapArray[i][j + 1];
                // var rightTwo = mapArray[i][j + 2];

                // var leftOne = mapArray[i][j - 1];
                // var leftTwo = mapArray[i][j - 2];

                // var upOne = mapArray[i - 1][j];
                // var upTwo = mapArray[i - 2][j];

                // var downOne = mapArray[i + 1][j];
                // var downTwo = mapArray[i + 2][j];

                function moveRight() {
                    mapArray[i][j] = " ";
                    mapArray[i][j + 1] = "S";
                }

                function moveLeft() {
                    mapArray[i][j] = " ";
                    mapArray[i][j - 1] = "S";
                }

                function moveUp() {
                    mapArray[i][j] = " ";
                    mapArray[i - 1][j] = "S";
                }

                function moveDown() {
                    mapArray[i][j] = " ";
                    mapArray[i + 1][j] = "S";
                }
                
                

                // First 4 'if statements' move the player right/left/up/down on the condition that there is a box to move in the next cell, and that there is no storage space 2 cells over

                if (mapArray[i][j] === "S" && mapArray[i][j + 1] === "B" && mapArray[i][j + 2] != "O" && mapArray[i][j + 2] != "B" && mapArray[i][j + 2] != "X" && mapArray[i][j + 2] != "W" && keyName === "ArrowRight") {
                    moveRight();
                    mapArray[i][j + 2] = "B";
                    redrawBoard();
                    break outerloop;
                }
                if (mapArray[i][j] === "S" && mapArray[i][j - 1] === "B" && mapArray[i][j - 2] != "O" && mapArray[i][j - 2] != "B" && mapArray[i][j - 2] != "X" && mapArray[i][j - 2] != "W" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 2] = "B";
                    redrawBoard();
                    break outerloop;
                }
                if (mapArray[i][j] === "S" && mapArray[i - 1][j] === "B" && mapArray[i - 2][j] != "O" && mapArray[i - 2][j] != "B" && mapArray[i - 2][j] != "X" && mapArray[i - 2][j] != "W" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 2][j] = "B";
                    redrawBoard();
                    break outerloop;
                }
                if (mapArray[i][j] === "S" && mapArray[i + 1][j] === "B" && mapArray[i + 2][j] != "O" && mapArray[i + 2][j] != "B" && mapArray[i + 2][j] != "X" && mapArray[i + 2][j] != "W" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 2][j] = "B";
                    redrawBoard();
                    break outerloop;
                }
                
                
                
                // next 4 'if statements' move the player right/left/up/down on the condition there is an empty space for them to move to
                
                if (mapArray[i][j] === "S" && mapArray[i][j + 1] === " " && keyName === "ArrowRight") {
                    moveRight();
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i][j - 1] === " " && keyName === "ArrowLeft") {
                    moveLeft();
                    redrawBoard();
                    break;
                } if (mapArray[i][j] === "S" && mapArray[i - 1][j] === " " && keyName === "ArrowUp") {
                    moveUp();
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i + 1][j] === " " && keyName === "ArrowDown") {
                    moveDown();
                    redrawBoard();
                    break outerloop;
                } 
                
                
                // next 4 if statements allow a player to move into a storage space 
                
                
                if (mapArray[i][j] === "S" && mapArray[i][j + 1] === "O" && keyName === "ArrowRight") {
                    moveRight();
                    mapArray[i][j + 1] = "P";
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i][j - 1] === "O" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 1] = "P";
                    redrawBoard();
                    break;
                } if (mapArray[i][j] === "S" && mapArray[i - 1][j] === "O" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 1][j] = "P";
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i + 1][j] === "O" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 1][j] = "P";
                    redrawBoard();
                    break outerloop;    
                } 

                // next 4 'if statements' move the player off the storage space onto an adjacent space

                if (mapArray[i][j] === "P" && mapArray[i][j + 1] === " " && keyName === "ArrowRight") {
                    moveRight();
                    mapArray[i][j + 1] = "S";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "P" && mapArray[i][j - 1] === " " && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 1] = "S";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break;
                } if (mapArray[i][j] === "P" && mapArray[i - 1][j] === " " && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 1][j] = "S";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "P" && mapArray[i + 1][j] === " " && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 1][j] = "S";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;    
                } 


                // next 4 'if statements' move the player from a storage space (P) into a box (B)

                if (mapArray[i][j] === "P" && mapArray[i][j + 1] === "B" && mapArray[i][j + 2] != "O" && mapArray[i][j + 2] != "B" && mapArray[i][j + 2] != "W" && keyName === "ArrowRight") {
                    moveRight();
                    // mapArray[i][j + 1] = "S";
                    mapArray[i][j + 2] = "B"
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "P" && mapArray[i][j - 1] === "B" && mapArray[i][j - 2] != "O" && mapArray[i][j - 2] != "B" && mapArray[i][j - 2] != "W" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 2] = "B";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break;
                } if (mapArray[i][j] === "P" && mapArray[i - 1][j] === "B" && mapArray[i - 2][j] != "O" && mapArray[i - 2][j] != "B" && mapArray[i - 2][j] != "W" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 2][j] = "B";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "P" && mapArray[i + 1][j] === "B" && mapArray[i + 2][j] != "O" && mapArray[i + 2][j] != "B" && mapArray[i + 2][j] != "W" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 2][j] = "B";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;    
                } 



                if (mapArray[i][j] === "P" && mapArray[i][j + 1] === "B" && mapArray[i][j + 2] != "X" && mapArray[i][j + 2] != "B" && mapArray[i][j + 2] != "W" && keyName === "ArrowRight") {
                    moveRight();
                    // mapArray[i][j + 1] = "S";
                    mapArray[i][j + 2] = "X"
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "P" && mapArray[i][j - 1] === "B" && mapArray[i][j - 2] != "X" && mapArray[i][j - 2] != "B" && mapArray[i][j - 2] != "W" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 2] = "X";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break;
                } if (mapArray[i][j] === "P" && mapArray[i - 1][j] === "B" && mapArray[i - 2][j] != "X" && mapArray[i - 2][j] != "B" && mapArray[i - 2][j] != "W" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 2][j] = "X";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "P" && mapArray[i + 1][j] === "B" && mapArray[i + 2][j] != "X" && mapArray[i + 2][j] != "B" && mapArray[i + 2][j] != "W" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 2][j] = "X";
                    mapArray[i][j] = "O"
                    redrawBoard();
                    break outerloop;    
                } 

        

                if (mapArray[i][j] === "S" && mapArray[i][j + 1] === "X" && mapArray[i][j + 2] != "W" && mapArray[i][j + 2] != "B" && keyName === "ArrowRight") {
                    moveRight();
                    // mapArray[i][j + 1] = "S";
                    mapArray[i][j + 2] = "B"
                    mapArray[i][j + 1] = "P"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i][j - 1] === "X" && mapArray[i][j - 2] != "W" && mapArray[i][j - 2] != "B" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 2] = "B";
                    mapArray[i][j - 1] = "P"
                    redrawBoard();
                    break;
                } if (mapArray[i][j] === "S" && mapArray[i - 1][j] === "X" && mapArray[i - 2][j] != "W" && mapArray[i - 2][j] != "B" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 2][j] = "B";
                    mapArray[i - 1][j] = "P"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i + 1][j] === "X" && mapArray[i + 2][j] != "W" && mapArray[i + 2][j] != "B" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 2][j] = "B";
                    mapArray[i + 1][j] = "P"
                    redrawBoard();
                    break outerloop;    
                } 
                
                // next 4 'if statements' move the player and adjacent box onto a storage space, and change the storage space into a boxDot div (box occupying a storage space)
                
                if (mapArray[i][j] === "S" && mapArray[i][j + 1] === "B" && mapArray[i][j + 2] === "O" && keyName === "ArrowRight") {
                    moveRight();
                    mapArray[i][j + 2] = "X"
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i][j - 1] === "B" && mapArray[i][j - 2] === "O" && keyName === "ArrowLeft") {
                    moveLeft();
                    mapArray[i][j - 2] = "X";
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i - 1][j] === "B" && mapArray[i - 2][j] === "O" && keyName === "ArrowUp") {
                    moveUp();
                    mapArray[i - 2][j] = "X";
                    redrawBoard();
                    break outerloop;
                } if (mapArray[i][j] === "S" && mapArray[i + 1][j] === "B" && mapArray[i + 2][j] === "O" && keyName === "ArrowDown") {
                    moveDown();
                    mapArray[i + 2][j] = "X";
                    redrawBoard();
                    break outerloop;
                }



                
                
            }
        }
        checkWin();
}

document.addEventListener("keydown", onKeyEvent);