// Initialize values ; Keep track of the states of the cells
var free = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var cross = [];
var nought = [];

// For checking if there is a win
var winningSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


// The player can choose its letter
var isX = true;

// For the first game, the player always plays first
// For the next games, the player always plays second (let's help the AI)
var gameOver = true;


// Click on button for choosing letter at the start of the first game
var buttons = document.getElementsByClassName("letter-button");
for (var button = 0; button < buttons.length; button++) {
    buttons[button].addEventListener("click", function(event) {
        isX = event.target.id === 'x';
        activateCells();
        document.getElementById("x").outerHTML='';
        document.getElementById("o").outerHTML='';
        document.getElementById("notice").innerHTML='Choose a free cell';
        gameOver = false;
    });
}


// Click on cell for ticking with letter
var cells = document.getElementsByClassName("cell");
for (var cell = 0; cell < cells.length; cell++) {
    cells[cell].addEventListener("click", cellClick);
}


// Change the appearance of the cells
function activateCells() {
    for (var cell = 0; cell < cells.length; cell++) {
        cells[cell].classList.remove("disabled");
        cells[cell].classList.add("available");
    }
}

function unableCell(cellNumber) {
    cells[cellNumber].classList.remove("available");
}

function disableCells() {
    for (var cell = 0; cell < cells.length; cell++) {
        cells[cell].classList.add("disabled");
    }
}


// Result of clicking a cell
function cellClick(event) {
    var cellNumber = parseInt(event.target.id[event.target.id.length - 1]);
    if (!gameOver && (free.indexOf(cellNumber) > -1)) {
        // Player play
        turnXtoY(cellNumber, isX ? 'x' : 'o');
        checkWin(isX ? 'x' : 'o');
        // Computer play
        if (!gameOver) {
            turnXtoY(free[Math.floor(Math.random() * free.length)], isX ? 'o' : 'x');
            checkWin(isX ? 'o' : 'x');
        }
    }
}


// Tick a cell
function turnXtoY (cellNumber, letter) {
    free.splice(free.indexOf(cellNumber), 1);
    var cellDiv = document.getElementById('cell' + cellNumber);
    cellDiv.innerHTML = letter;
    letter === 'x' ? cross.push(cellNumber) : nought.push(cellNumber);
    unableCell(cellNumber);
}


// If a win condition, or draw is detected, gameOver = true, and change display
function checkWin (letter) {
    var checkedArray = letter === 'x' ? cross : nought;

    // Test each winning set
    for (var i = 0; i < winningSets.length; i++ ) {
        if (winningSets[i].every(function (each) { return checkedArray.indexOf(each) > -1; })) {
            gameOver = true;
            document.getElementById("notice").innerHTML=letter + " wins | Game Over";
            disableCells();
            setTimeout(function () {
                restartGame();
            }, 2000);
            break;
        }
    }

    // Test if it is a draw
    if (!gameOver && free.length < 1) {
        gameOver = true;
        document.getElementById("notice").innerHTML="It's a draw";
        disableCells();
        setTimeout(function () {
            restartGame();
        }, 2000);
    }
}


// Restart the game
function restartGame() {
    clearGrid();
    activateCells();
    gameOver = false;
    document.getElementById("notice").innerHTML='Choose a free cell';
    turnXtoY(free[Math.floor(Math.random() * free.length)], isX ? 'o' : 'x'); // Computer play
}


// Remove all elements from the grid at the end of a game
function clearGrid() {
    var cells = document.getElementsByClassName("cell");
    for (var cell = 0; cell < cells.length; cell++) {
        var cellDiv = document.getElementById('cell' + cell);
        cellDiv.innerHTML = '';
    }
    free = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    cross = [];
    nought = [];
}