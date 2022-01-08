// global variables
const innerCol = Array.from(document.querySelectorAll(".inner-col"));
let rowInput = document.querySelector("#row");
let columnInput = document.querySelector("#column");
let valueInput = document.querySelector("#value");
const insertBtn = document.querySelector("#insert");
const solveBtn = document.querySelector("#calculate");
const bodyElement = document.querySelector("body");
const noSoln = document.querySelector("#no-soln");
const resetBtn = document.querySelector("#reset");
const checkRules = document.querySelector("#check-rules");

const n = 9; // here it is a 9x9 grid so n is equal to 9

// setting the initial value of row, column and value
rowInput.value = 0;
columnInput.value = 0;
valueInput.value = 0;

/* 
to make the board configuration into a double dimensional matrix of 9 rows and
each row consisting of 9 columns
*/
const numFunc = () => {
    let board = [], innerRow = [], count = 0;
    for(let i = 0; i<n*n; i++){
        innerRow.push(Number(innerCol[i].innerHTML));
        count++;
        if(count == n){
            board.push(innerRow);
            innerRow = [];
            count = 0;
        }
    }
    return board;
};

let board = numFunc(); // to get the initial configuration of the board

/*
to check whether it is possible to insert a particular value for a particular (row, column)
following the rules of sudoku that is having each of the values from 1 to 9 in each row 
or each column or each of the 3x3 grid
*/
const isValid = (row, col, val) => {
    let sqrtVal = Math.sqrt(n), r = row - row % sqrtVal, c = col - col % sqrtVal;
    
    for(let i = 0; i<n; i++){
        // checking for row and column
        if(board[row][i] === val || board[i][col] === val) return false;
        // checking for 3x3 grid
        if(board[r + Math.floor(i/sqrtVal)][c + i%sqrtVal] === val) return false;
    }
    return true;
};



/*
to insert the initial configuration of the board by inserting the desired value for 
any row or column
*/

const insertInput = () => {
    rowInput.addEventListener("click", () => {
        checkRules.style.display = "none";
        insertBtn.disabled = false;
    });

    columnInput.addEventListener("click", () => {
        checkRules.style.display = "none";
        insertBtn.disabled = false;
    });

    valueInput.addEventListener("click", () => {
        checkRules.style.display = "none";
        insertBtn.disabled = false;
    });

    insertBtn.addEventListener("click", () => {
        const row = Number(rowInput.value), col = Number(columnInput.value), val = Number(valueInput.value);
        innerCol.forEach(ele => {
            ele.style.backgroundColor = "white";
        });
        if(noSoln !== null){
            noSoln.remove();
        }
        if((row>=0 && row<n) && (col>=0 && col<n) && (val>=0 && val<=n) && (isValid(row, col, val))){
            board[row][col] = val;
            innerCol[n*row + col].textContent = val;
            checkRules.style.display = "none";
            insertBtn.disabled = false;
            rowInput.value = "0";
            columnInput.value = "0";
            valueInput.value = "0";
        }
        else{
            checkRules.style.display = "block";
            insertBtn.disabled = true;
        } 
    });
};

/*
The logic is to solve the sudoku puzzle using backtracking
- go to a cell with empty value and check whether it is possible to fill it with a value 
from 1 to 9
- check recursively whether filling that value can actually obtain the answer
- if not then backtrack and fill it with a different value and then again check recursively
whether it is possible to obtain the answer
*/
const sudokuSolver = () => {
    let row = -1, col = -1;
    /*
     here we go to each square of the sudoku grid and check whether it is already filled (non-zero value) 
     or its empty (zero value). If its empty then update the value of row and column.
    */
    for(let i = 0; i<n; i++){
        for(let j = 0; j<n; j++){
            if(board[i][j] === 0){
                row = i;
                col = j;
                break;
            }
        }
        if(row !== -1 && col !== -1) break;
    }

    // when there are no empty cell left in the sudoku board then return true and it is fully solved
    if(row === -1 && col === -1) return true;

    /*
    then go to that cell assigned above initially having zero value and check whether it is possible 
    to fill that cell with any value ranging from 1 to 9, if it is possible to fill that cell with a 
    value then fill it and recursively go the next cell having empty value. If it is not possible to 
    fill that cell with any of the value from 1 to 9 then return false and backtract to the previous 
    cell which has been filled and fill it with 0 and check whether it is now possible to fill that 
    cell with the next value 
    */
    for(let val = 1; val<=n; val++){
        if(isValid(row, col, val)){
            board[row][col] = val;
            innerCol[n*row+col].textContent = val;
            if(sudokuSolver()) return true;
            board[row][col] = 0;
            innerCol[n*row+col].textContent = "0";
        }
    }
    return false;
};

/*
when pressing the solve button obtain the solved sudoku puzzle
*/
const calculateAns = () => {
    solveBtn.addEventListener("click", () => {
        // if solution is possible then show the solved version of the board and color it yellow
        let ans = sudokuSolver(board);
        if(ans){
            innerCol.forEach(ele => {
                ele.style.backgroundColor = "yellow";
            });
        }
        // if solution is not possible then display a message
        else{
            const h4Element = document.createElement("h4");
            h4Element.textContent = "No solution possible for this board configuration";
            const sectionElement = document.createElement("section");
            sectionElement.id = "no-soln";
            sectionElement.appendChild(h4Element);
            const bodyElement = document.querySelector("body");
            bodyElement.appendChild(sectionElement);
        }
    });
};

/*
when pressing the reset button then all the cell's value of the sudoku grid will be set to zero
and color it back to white and if solution is not possible then remove that message
*/
const resetBoard = () => {
    resetBtn.addEventListener("click", () => {
        innerCol.forEach(ele => {
            ele.textContent = "0";
            ele.style.backgroundColor = "white";
        });
        board = numFunc();
        if(noSoln !== null){
            noSoln.remove();
        }
        return board;
    });
};

// main function
const sudoku = () => {    
    resetBoard();
    insertInput();
    calculateAns();   
};

sudoku();