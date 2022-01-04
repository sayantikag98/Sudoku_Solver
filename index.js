const innerCol = Array.from(document.querySelectorAll(".inner-col"));
const innerGrid = Array.from(document.querySelectorAll(".inner-row"));

const numFunc = () => {
    let outerSq = [];
    for(let i = 0; i<9; i++){
        let innerSq = [];
        for(let j = 1; j<innerGrid[i].innerHTML.split(">").length; j+=2){
            innerSq.push(innerGrid[i].innerHTML.split(">")[j].split("<")[0]);
        }
        outerSq.push(innerSq);
    }
    return outerSq;
};

const helperFuncForRows = (outerSq, i_start, i_end, j_start, j_end) => {
    let rowNo = [];
    for(let i = i_start; i<i_end; i++){
        for(let j = j_start; j<j_end; j++){
            rowNo.push(outerSq[i][j]);
        }
    }
    return rowNo;
};

const numbersOfRow = (row, outerSq) => {
    let rowNo;
    if(row === 0) rowNo = helperFuncForRows(outerSq, 0, 3, 0, 3);
    else if(row === 1) rowNo = helperFuncForRows(outerSq, 0, 3, 3, 6);
    else if(row === 2) rowNo = helperFuncForRows(outerSq, 0, 3, 6, 9);
    else if(row === 3) rowNo = helperFuncForRows(outerSq, 3, 6, 0, 3);
    else if(row === 4) rowNo = helperFuncForRows(outerSq, 3, 6, 3, 6);
    else if(row === 5) rowNo = helperFuncForRows(outerSq, 3, 6, 6, 9);
    else if(row === 6) rowNo = helperFuncForRows(outerSq, 6, 9, 0, 3);
    else if(row === 7) rowNo = helperFuncForRows(outerSq, 6, 9, 3, 6);
    else if(row === 8) rowNo = helperFuncForRows(outerSq, 6, 9, 6, 9);
    return rowNo;
};

const helperFuncForCols = (outerSq, i_start, i_end, j_start, j_end) => {
    let colNo = [];
    for(let i = i_start; i<i_end; i+=3){
        for(let j = j_start; j<j_end; j+=3){
            colNo.push(outerSq[i][j]);
        }
    }
    return colNo;
};

const numbersOfColumn = (col, outerSq) => {
    let colNo;
    if(col === 0) colNo = helperFuncForCols(outerSq, 0, 7, 0, 7);
    else if(col === 1) colNo = helperFuncForCols(outerSq, 0, 7, 1, 8);
    else if(col === 2) colNo = helperFuncForCols(outerSq, 0, 7, 2, 9);
    else if(col === 3) colNo = helperFuncForCols(outerSq, 1, 8, 0, 7);
    else if(col === 4) colNo = helperFuncForCols(outerSq, 1, 8, 1, 8);
    else if(col === 5) colNo = helperFuncForCols(outerSq, 1, 8, 2, 9);
    else if(col === 6) colNo = helperFuncForCols(outerSq, 2, 9, 0, 7);
    else if(col === 7) colNo = helperFuncForCols(outerSq, 2, 9, 1, 8);
    else if(col === 8) colNo = helperFuncForCols(outerSq, 2, 9, 2, 9);
    return colNo;
};

const numbersOfInnerGrid = (ind, outerSq) => outerSq[ind];

const isDistinct = arr => {
    let sum = 0;
    arr.forEach(ele => {
        sum += ele;
    });
    if(sum === 9*((9+1)/2)) return true;
    else false;
};

const distinctCheckRowCol = (outerSq, row, col) => {
    let flag = false;
    for(let i = row; i<=row+2; i++){
        if(isDistinct(numbersOfRow(i, outerSq))){
            flag = true;
            break;
        }
    }
    if(flag){
        for(let i = col; i<=col+2; i++){
            if(isDistinct(numbersOfColumn(i, outerSq))) return true;
        }
    }
    return false;
};

const isSolved = outerSq => {
    let ind = -1;
    for(let i = 0; i<9; i++){
        if(isDistinct(numbersOfInnerGrid(i, outerSq))){
            ind = i
            break;
        };
    }
    if(ind === 0) return distinctCheckRowCol(outerSq, 0, 0);
    else if(ind === 1) return distinctCheckRowCol(outerSq, 0, 3);
    else if(ind === 2) return distinctCheckRowCol(outerSq, 0, 6);
    else if(ind === 3) return distinctCheckRowCol(outerSq, 3, 0);
    else if(ind === 4) return distinctCheckRowCol(outerSq, 3, 3);
    else if(ind === 5) return distinctCheckRowCol(outerSq, 3, 6);
    else if(ind === 6) return distinctCheckRowCol(outerSq, 6, 0);
    else if(ind === 7) return distinctCheckRowCol(outerSq, 6, 3);
    else if(ind === 8) return distinctCheckRowCol(outerSq, 6, 6);
    else if(ind === -1) return false;

};

const boardInstance = outerSq => {
    for(let i = 0; i<9; i++){
        console.log(...numbersOfRow(i, outerSq));
    }
};

const isValid = (num, outerSq, row, col) => {
    let grid;
    if((row>=0 && row<=2) && (col>=0 && col<=2)) grid = 0;
    else if((row>=0 && row<=2) && (col>=3 && col<=5)) grid = 1;
    else if((row>=0 && row<=2) && (col>=6 && col<=8)) grid = 2;
    else if((row>=3 && row<=5) && (col>=0 && col<=2)) grid = 3;
    else if((row>=3 && row<=5) && (col>=3 && col<=5)) grid = 4;
    else if((row>=3 && row<=5) && (col>=6 && col<=8)) grid = 5;
    else if((row>=6 && row<=8) && (col>=0 && col<=2)) grid = 6;
    else if((row>=6 && row<=8) && (col>=3 && col<=5)) grid = 7;
    else if((row>=6 && row<=8) && (col>=6 && col<=8)) grid = 8;

    if(!(num in numbersOfRow(row, outerSq)) && !(num in numbersOfColumn(col, outerSq)) && !(num in numbersOfInnerGrid(grid, outerSq)))
        return true;
    return false;    
};

const sudokuSolver = () => {
    let outerSq = numFunc();
    console.log(innerCol);
    for(let i = 0; i<9; i++){
        for(let j = 0; j<9; j++){
            if(Number(outerSq[i][j]) === 0){
                // innerCol[9*i+j].textContent = 100;
            }
        }
    }
};

sudokuSolver();