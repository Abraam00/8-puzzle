import React, { useState } from "react";

function Square({ value, onSquareclick }) {
  return (
    <button className="square" onClick={onSquareclick}>
      {value}
    </button>
  );
}

function Board() {
  // using a 1D array to store the board instead of 2D
  const [board, setBoard] = useState([1, 2, 3, 8, null, 4, 7, 6, 5]);
  // used for adding the moves to the unordered list which displays the moves
  const [items, setItems] = useState([]);

  function handleClick(i) {
    if (!isValidMove(i, board)) {
      return;
    }

    //doing the swap if the move is valid and adding the move to the unordered list
    const nextBoard = board.slice();
    const temp = nextBoard[i];
    nextBoard[nextBoard.indexOf(null)] = temp;
    nextBoard[i] = null;
    setBoard(nextBoard);
    addItem(temp);
    if (calculateWinner(nextBoard)) {
      alert("You won");
    }
  }

  function scramble() {
    const newBoard = board.slice();
    let temp;
    let index = 0;

    // scrambling the board using a random number from 0 to 8 every iteration
    while (index < 50) {
      let i = Math.floor(Math.random() * 9);
      if (isValidMove(i, board)) {
        temp = newBoard[i];
        newBoard[newBoard.indexOf(null)] = temp;
        newBoard[i] = null;
      }
      index += 1;
    }
    setBoard(newBoard);
  }

  function addItem(move) {
    const newItem = "square number " + move + " swapped with empty ";
    setItems([...items, newItem]);
  }

  return (
    <React.Fragment>
      <button className="scramble" onClick={() => scramble()}>
        Scramble
      </button>
      <div className="table">
        <div className="board-row">
          <Square value={board[0]} onSquareclick={() => handleClick(0)} />
          <Square value={board[1]} onSquareclick={() => handleClick(1)} />
          <Square value={board[2]} onSquareclick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={board[3]} onSquareclick={() => handleClick(3)} />
          <Square value={board[4]} onSquareclick={() => handleClick(4)} />
          <Square value={board[5]} onSquareclick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={board[6]} onSquareclick={() => handleClick(6)} />
          <Square value={board[7]} onSquareclick={() => handleClick(7)} />
          <Square value={board[8]} onSquareclick={() => handleClick(8)} />
        </div>
      </div>
      <ul className="moves">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default function Game() {
  return <Board></Board>;
}

//compares the current board to the winning board (the beginning state)
function calculateWinner(board) {
  const winningBoard = [1, 2, 3, 8, null, 4, 7, 6, 5];

  return JSON.stringify(board) === JSON.stringify(winningBoard);
}

//using a 1D array, the clicked square index needs to be +-1 or +-3 steps away from the null square index so that the move can be valid
function isValidMove(i, board) {
  return (
    board[i + 1] === null ||
    board[i - 1] === null ||
    board[i + 3] === null ||
    board[i - 3] === null
  );
}
