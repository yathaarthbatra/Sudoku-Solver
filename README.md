# Sudoku-Solver

### This project is based on the Sudoku Game which you all must played in your childhood days.

If you need to revise the Sudoku Rules , visit this link--> http://www.counton.org/sudoku/rules-of-sudoku.php

The approach to solve this Sudoku Problem is based on Recursion and Backtracking.
In this Project the main function is the SolveSudoku() which is present in index.js file.
<br><br><br>
## Approach:

--> Place the number at board[r][c] rowwise and change the row when it will surpass the last columnn.

--> Check whether that number is safe to place at the cell by applying rules which are that the number should not be repeated in the row and column and the SubGrid.

--> Then apply the recursion to the left over Sudoku , the Rec will bring the True or False that whether the Left over Sudoku has been Solved or not?

--> If the Left over Sudoku brings True then it means that we have inserted the right number and we will return from the function and exit.

--> If the Left over Sudoku brings false then the number to be placed is not correct so wiil try for next numbers(numbers are from 1 to 9). This is the backtracking Step.
          
--> Base case: If the row number becomes 9 it means we have completed the Sudoku Puzzle and we will return from the function.


