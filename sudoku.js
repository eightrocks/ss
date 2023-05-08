import './sudoku.css';
import React, {useState} from 'react'

function getCol(board, row, col) {
  const ret = [];
  for (let i = 0; i < 9; ++i) {
      ret.push(board[i][col]);
  }
  return ret;
}
function getBox(board, row, col) {
  const ret = [];
  if (row < 3 && col < 3) { //first box
      for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row < 3 && col >= 3 && col < 6) { //second box
      for (let i = 0; i < 3; ++i) {
          for (let j = 3; j < 6; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row < 3 && col >= 6 && col < 9) { //third box
      for (let i = 0; i < 3; ++i) {
          for (let j = 6; j < 9; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row >= 3 && row < 6 && col < 3) { //4th box
      for (let i = 3; i < 6; ++i) {
          for (let j = 0; j < 3; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row >= 3 && row < 6 && col >= 3 && col < 6) { //5th box
      for (let i = 3; i < 6; ++i) {
          for (let j = 3; j < 6; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row >= 3 && row < 6 && col >= 6 && col < 9) { //6th box
      for (let i = 3; i < 6; ++i) {
          for (let j = 6; j < 9; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row >= 6 && row < 9 && col < 3) { //7th box
      for (let i = 6; i < 9; ++i) {
          for (let j = 0; j < 3; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row >= 6  && row < 9 && col >= 3 && col < 6) { //8th box
      for (let i = 6; i < 9; ++i) {
          for (let j = 3; j < 6; ++j){
              ret.push(board[i][j]);
          }
      }
  } else if (row >= 6 && row < 9 && col >= 6 && col < 9) { //9th box
      for (let i = 6; i < 9; ++i) {
          for (let j = 6; j < 9; ++j){
              ret.push(board[i][j]);
          }
      }
  }
  return ret;
}
function member(list, c){
  if (list.includes(c)) {
    return true;
  }else {
    return false;
  }
}

//use a mutal recursion for generateVal maybe
function nextRow(board, i, j) {
  // base case
  if (i === 8 && j === 8) {
      return -1;
  }
  if (j === 8) {
      ++i;
      j = 0;
  } else {
      ++j;
  }
  if (board[i][j] !== ".") {
      return nextRow(board,i, j);
  } else {
      return i;
  }        
}
function nextCol(board, i, j) {
  // base case
  if (i === 8 && j === 8) {
      return -1;
  }
  if (j === 8) {
      ++i;
      j = 0;
  } else {
      ++j;
  }
  if (board[i][j] !== ".") {
      return nextCol(board,i, j);
  } else {
      return j;
  }    
}
function generateVal(board, row, col, box, i, j) {
  let stuff = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let ret = [];
  if (board[i][j] !== ".") {
      ret.push(board[i][j]);
      return ret;
  }
  for (let e of stuff) {
      if ((! (member(row, e))) && (! (member(col, e))) && (! (member(box, e)))) {
          ret.push(e);
      }
  }
  return ret;
}
function removeChar(stuff, id) {
  stuff = stuff.filter(item => item !== id);
  return stuff;
}
function nextVals(board, i, j) {
  let possible_values = generateVal(board, board[i], getCol(board, i, j), getBox(board, i, j), i, j);
  let copy = possible_values.slice();
          if (nextRow(board,i,j) == -1) {
              // cout <<"(" << i << "," << j << ")" << endl;
              return copy;
          }
          for (let it of copy) {
              board[i][j] = it;   
              let next_pos_values = nextVals(board, nextRow(board, i, j), nextCol(board, i, j));
              let len = next_pos_values.length;
              if (len > 0) { //good
                  break;
              } else {
                  possible_values = removeChar(possible_values, it);
                  board[i][j] = ".";
              } 
          }
  return possible_values;
}
function solveSudoku(board) {
  for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j){
          if (board[i][j] !== ".") { //move on to next cell
              continue;
          }
          let possible_values = generateVal(board, board[i], getCol(board, i, j), getBox(board, i, j), i, j);
          
          if (nextRow(board,i,j) === -1) {
              board[i][j] = possible_values[0];
              return;
          }
          for (let it of possible_values) {
              board[i][j] = it;   
              let next_pos_values = nextVals(board, nextRow(board,i,j), nextCol(board, i,j));
              let len = next_pos_values.length;
              if (len > 0) { //good
                  break;
              } else {
                  board[i][j] = '.';
              }
          }
      }
  }       
}



function Grid() {
  const [values, setValues] = useState(Array(81).fill(""))
  function getData(event, index) {
    const h = event.target.value // new value inputed
    setValues(preValues => {
      var newValues = [...preValues]
      newValues[index] = h
      return newValues
    })
  }

  function solveSudokuFlat(event, board) {
    const len = 81
    var chunkedList= []    
    for (let i = 0; i < len; i += 9) {
      chunkedList.push(board.slice(i, i + 9));
    }
    console.log(chunkedList)
    for (let i = 0; i < 9; ++i){
      for (let j = 0; j <9; ++j) {
        if (chunkedList[i][j] == "") {
          chunkedList[i][j] = "."
        }
      }
    }
    solveSudoku(chunkedList)
    console.log(chunkedList)
    setValues(chunkedList.flat())
  }
  function clear() {
    setValues(Array(81).fill(""))
  }
    
    const cells = [];
    for (let i = 0; i < 81; i++) {
      var c = i % 27;
      if (c === 10 || c === 13 || c === 16) { //no border
        cells.push(<input type = "text" key={i} value = {values[i]} onChange={event => getData(event, i)} />);
      } else if (c === 0 || c === 3 || c === 6 ) {
        cells.push(<input className ="upleft" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else if (c === 1 || c === 4|| c===7) {
        cells.push(<input className ="up" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else if (c === 2 || c === 5 || c === 8) {
        cells.push(<input className ="upright" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else if (c === 9 || c === 12 || c === 15) {
        cells.push(<input className ="left" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else if (c === 11 || c === 14 || c=== 17) {
        cells.push(<input className ="right" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else if (c=== 18 || c=== 21 || c=== 24) {
        cells.push(<input className ="downleft" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else if (c === 19 || c=== 22|| c=== 25) {
        cells.push(<input className ="down" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } else {
        cells.push(<input className ="downright" type = "text" value = {values[i]} key={i} onChange={event => getData(event, i)}/>);
      } 
    }
  
    return (
      <div className="grid">
        {cells}
        <div>
        <button type="button" onClick={event => solveSudokuFlat(event, values)}>
        Solve
      </button>
        </div>
        <div>
          <button type = "button" onClick={event => clear(event)}>
              Clear
          </button>
        </div>
      </div>
  
    );
  }

  export default Grid;