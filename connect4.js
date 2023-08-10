"use strict";

//Refactor to divs. Grid for CSS



/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // DONE: set "board" to empty HEIGHT x WIDTH matrix array

  for (let row = 0; row < HEIGHT; row++) {
    let newRow = [];
    for (let col = 0; col < WIDTH; col++) {
      newRow.push(null);
    }
    //DONE: could push to board here?
    board.push(newRow);
  }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.getElementById('board');

  // DONE: add comment for this code
  /* This is the empty row at the top of the board*/
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // DONE: add comment for this code
  /**Fills the top row with clickable cells, which players use to make moves. */
  for (let col = 0; col < WIDTH; col++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${col}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let row = 0; row < HEIGHT; row++) {
    // DONE: Create a table row element and assign to a "row" variable
    //create a row class, rather than an element.
    let tableRow = document.createElement('tr');
    //console.log(`tableRow is ${tableRow}`);
    tableRow.setAttribute("id", `row${row}`); //make this an id?
    //console.log(`tableRow ID is ${tableRow.id}`);
    for (let col = 0; col < WIDTH; col++) {
      // DONE: Create a table cell element and assign to a "cell" variable
      let tableCell = document.createElement('td');
      tableCell.setAttribute("id", `c-${row}-${col}`);
      // DONE: add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x

      // DONE: append the table cell to the table row
      tableRow.appendChild(tableCell);
    }
    // DONE: append the row to the html board
    htmlBoard.appendChild(tableRow);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(col) {
  // DONE: write the real version of this, rather than always returning 5

  //check board variable, search bottom row first, then work up. If we hit row0,
  //should exit out?
  let spot = null;
  for (let row = 5; row >= 0; row--) { //change to height - 1
    //console.log('row is ', row);
    //console.log('col is ', col);
    if (board[row][col] === null) {
      //console.log('made it to the inside');
      spot = row;
      break;
    }
  }
  //could switch to return row/return null, instead of making spot var.
  return spot; //Check if typeof is number?
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(row, col) {
  // TODO: make a div and insert into correct table cell
  let htmlBoard = document.getElementById('board'); //consider making a global variable

  //try to find table cell with id 'c-row-col';
  let targetID = `c-${row}-${col}`;
  let tableCell = document.getElementById(targetID);
  console.log(`targetID is ${targetID}`);
  console.log(`tableCell is ${tableCell.id}`);

  //update board with currPlayer value

  //insert piece,
  let currPiece = document.createElement('div');
  currPiece.classList.add('piece', `p${currPlayer}`);
  tableCell.appendChild(currPiece);
  //possible refactor: use const for a lot of these
}

/** endGame: announce game end */

function endGame(msg) {
  // DONE: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  /*   console.log(evt.target.id[evt.target.id.length-1]);
    console.log(evt.target.id.split('-')[1]); */
  //Now refactored to grab column!
  let col = +evt.target.id[evt.target.id.length - 1];
  //console.log('tried to handle click');

  // get next spot in column (if none, ignore click)
  let row = findSpotForCol(col);
  console.log('row is: ', row);
  if (row === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  //Subtle: flip placeInTable and board
  placeInTable(row, col);
  board[row][col] = currPlayer;
  console.log('new board state is: ', board); //we should see this fill.

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // DONE: check if all cells in board are filled; if so call, call endGame
  let tie = true;
  for (let cell of board[0]) { //only need to check top row.
    if (cell === null) {
      tie = false;
      break;
    }
  }
  //refactor: board[0].every(cell => cell === null);
  if (tie) {
    endGame("All pieces filled! You an even match!");
  }
  // switch players
  // DONE: switch currPlayer 1 <-> 2
  currPlayer = 3 - currPlayer; //ternary more readable here.
  console.log('new currPlayer is: ', currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */

  //refactor to remove match/break pattern. Use every instead.
  function checkFourMatch(cells) {
    let match = true;
    for (let pair of cells) {
      let [row, col] = pair;
      //first, check legel coordinate
      if ((row < 0 || row >= HEIGHT) || (col < 0 || col >= WIDTH)) {
        match = false;
        break;
      }
      //Then, check for player value
      if (!(board[row][col] === currPlayer)) {
        match = false;
        break;
      }
    }
    // DONE: Check four cells to see if they're all legal & all color of current
    // player
    return match;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL

  //Possible refactor: rowInd rather than row.
  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      // DONE: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
      let vert = [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]];
      let diagDL = [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]];
      let diagDR = [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]];

      // find winner (only checking each win-possibility as needed)
      if (checkFourMatch(horiz) || checkFourMatch(vert) ||
        checkFourMatch(diagDR) || checkFourMatch(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
