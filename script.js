var arr = [[], [], [], [], [], [], [], [], []];
var temp = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

function initializeTemp(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      temp[i][j] = false;
    }
  }
}

function setTemp(board, temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        temp[i][j] = true;
      }
    }
  }
}

function setColor(temp) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (temp[i][j] == true) {
        arr[i][j].style.color = "#DC3545";
      }
    }
  }
}

function resetColor() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j].style.color = "green";
    }
  }
}

var board = [[], [], [], [], [], [], [], [], []];

let button = document.getElementById("generate-sudoku");
let solve = document.getElementById("solve");

console.log(arr);
function changeBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}

button.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response);
    initializeTemp(temp);
    resetColor();

    board = response.board;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
  };
  xhrRequest.open("get", "https://sugoku.herokuapp.com/board?difficulty=easy");
  //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
  xhrRequest.send();
};

function isSafe(board, r, c, num) {
  //in this function our aim is to check that the number which we want to insert it in the cell
  //is safe to insert --> it should not repeat in the same row or column
  // and the num should not be repeated in the subGrid

  for (var i = 0; i < 9; i++) {
    if (board[i][c] == num || board[r][i] == num) return false;
    //it means that this number is not safe to insert in this cell
  }

  //Now by this point the num is not being repeated in the row or column
  //Last check is that it should not be included in its Sub Grid

  //to find the starting row and col the num's subgrid
  var sr = r - (r % 3);
  var sc = c - (c % 3);

  for (var l = sr; l < sr + 3; l++) {
    for (var j = sc; j < sc + 3; j++) {
      if (board[l][j] == num) return false;
    }
  }

  //By this point we have checked all the conditions
  //Thus this num is safe to insert
  return true;
}

function solveSudokuHelper(board, r, c) {
  //Sudoku will be solved in row wise direction

  //base case:
  if (r == 9) {
    //it means that we have completed the whole sudoku Puzzle
    //and we have filled the answers
    changeBoard(board); //it will fill the answers to the puzzle on the HTML Page
    return true; //it means that the Sudoku has been solved
  }

  //Other cases:
  if (c == 9) {
    //it means that we have completed one row and we need to shift to the next row
    //and solve the subproblem starting from the next row using recursion
    return solveSudokuHelper(board, r + 1, 0);
  }

  //if the current cell is not zero it means it is already filled and we just want to solve left over sudoku
  if (board[r][c] != 0) {
    return solveSudokuHelper(board, r, c + 1);
  }

  //if we reached this point then the cell must be zero and we need to fill it
  //we can use the numbers from 1 to 9 to fill the cell
  for (var i = 1; i <= 9; i++) {
    if (isSafe(board, r, c, i)) {
      board[r][c] = i;
      var smallAns = solveSudokuHelper(board, r, c + 1);
      if (smallAns == true) {
        //it means that the left over Sudoku is Solved
        return true; //that whole sudoku has solved
      }
      //if left over grid is not solved it means that we have to update the current cell value
      board[r][c] = 0; //this is the backtracking step
    }
  }
  //by this point we have tried all the numbers from 1 to 9
  //thus sudoku cant be solved
  return false;
}

function solveSudoku(board) {
  //Here we will use backtracking to generate the answer of the sudoku puzzle
  //We will require a Helper function because we also want row and column variables also to find that in which row
  //or column we are

  solveSudokuHelper(board, 0, 0); //initially we will pass row and column as zero
}

solve.onclick = function () {
  solveSudoku(board);
};
