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
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let newBoard = [];
  for (let row = 0; row < HEIGHT; row++) {
    let newRow = [];
    for (let col = 0; col < WIDTH; col++){
      newRow.push(null);
    }
    newBoard.push(newRow);
  }
  board = newBoard;
  console.log(board);

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // TODO: add comment for this code
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
    // TODO: Create a table row element and assign to a "row" variable
    //create a row class, rather than an element.
    let tableRow = document.createElement('tr');
    tableRow.setAttribute("class", `row${row}`);
    for (let col = 0; col < WIDTH; col++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let tableCell = document.createElement('td');
      //newdiv.setAttribute('id', 'brand-new'); if we need to make these IDs.
      //tableCell.classList.add('cell', 'white', `${row}-${col}`);
      tableCell.setAttribute('id', `c-${row}-${col}`); 
      // TODO: add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x

      // TODO: append the table cell to the table row
      tableRow.appendChild(tableCell);
    }
    // TODO: append the row to the html board
    htmlBoard.appendChild(tableRow);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(col) {
  // TODO: write the real version of this, rather than always returning 5

  //check board variable, search bottom row first, then work up. If we hit row0,
  //should exit out?
  let spot = null;
  for (let row = 5; row >= 0; row--){
    if (board[row][col] === null){
      spot = row;
      break;
    }
  }

  return spot; //Check if typeof is number?
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(row, col) {
  // TODO: make a div and insert into correct table cell
  let htmlBoard = document.getElementById('board');

  //try to find table cell with id 'c-row-col';
  let targetID = `c-${row}-${col}`;
  let tableCell = document.getElementById(targetID);

  //update board with currPlayer value

  //insert piece,
  let currPiece = document.createElement('div');
  currPiece.classList.add('piece', `${currPlayer}`);
  tableCell.appendChild(currPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let col = +evt.target.id; //what are we grabbing. Refactor so class gives row/col info

  // get next spot in column (if none, ignore click)
  let row = findSpotForCol(col);
  if (row === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(row, col);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function checkFourMatch(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
      let vert;
      let diagDL;
      let diagDR;

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
