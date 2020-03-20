class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = [];
    for (let i = 0; i < this.rows; i++) {
      let line = [];
      for (let j = 0; j < this.cols; j++) {
        line.push('');
      }
      this.board.push(line);
    }
    this._available = this.rows * this.cols;
    this._fieldHeight = height / this.rows;
    this._fieldWidth = width / this.cols;
  }

  get(i, j) {
    return this.board[i][j];
  }

  setBoardPos(i, j, value) {
    this.board[i][j] = value;
    this._available -= 1;
  }

  setBoard(board) {
    this.board = copyBoard(board);
  }

  getClickedTile(mouseX, mouseY) {
    const i = Math.floor(mouseY / this._fieldHeight);
    const j = Math.floor(mouseX / this._fieldWidth);
    console.log(`Clicked on tile: ${i}, ${j}: ${this.get(i, j)}`);
    return {i, j};
  }

  // clone() {
  //   let clone = new Board(this.rows, this.cols);
  //   Object.assign({}, this);
  //   //clone.setState(this.board.map(arr => arr.slice()), this._available)
  //   return board;
  // }

  draw() {
    stroke(0);
    // draw layout
    for (let i = 1; i < this.rows; i++) {
      for (let j = 1; j < this.cols; j++) {
        const xCor = (width / this.cols) * j;
        line(xCor, 0, xCor, height);
      }
      const yCor = (height / this.rows) * i;
      line(0, yCor, width, yCor);
    }

    // draw the contents
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const spot = this.board[i][j];
        // center pf current field
        const x = this._fieldWidth * j + this._fieldWidth / 2;
        const y = this._fieldHeight * i + this._fieldHeight / 2;
        const r = this._fieldWidth / 4; // radius
        if (spot === 'X') {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        } else if (spot === 'O') {
          noFill();
          ellipse(x, y, r * 2);
        }
      }
    }
  }
}

// board Tools

function checkWinner(position) {
  let winner = null;
  // Horizontal
  for (let i = 0; i < position.length; i++) {
    if (allEqual(position[i])) {
      winner = position[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < position[0].length; i++) {
    if (allEqual(arrayColumn(position, i))) {
      winner = position[0][i];
    }
  }

  // Diagonal
  if (position.rows !== position.cols) {
    console.error("can not check diagonally. Board is not a square!")
    return winner;
  }
  let d1 = [];
  let d2 = [];
  for (let i = 0; i < position.length; i++) {
    d1.push(position[i][i]);
    d2.push(position[i][position.length - i - 1]);
  }
  if (allEqual(d1)) {
    winner = d1[0];
  } else if (allEqual(d2)) {
    winner = d2[0];
  }

  // check for tie
  if (winner == null) {
    const available = spotsAvailable(position);
    if (available <= 0) winner = 'tie';
  }

  // if (winner !== 'tie' && winner !== null) gameOver = true;

  return winner;
}

function boardEvaluation(position) {
  const winner = checkWinner(position);
  if (winner === 'X') {
    return 1;
  } else if (winner === 'O') {
    return -1;
  } else {
    return 0;
  }
}

function nextBoards(position, activePlayer) {
  let boards = [];
  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[0].length; j++) {
      if (position[i][j] === '') {
        let copiedBoard = copyBoard(position); // make good clone
        copiedBoard[i][j] = activePlayer;
        boards.push(copiedBoard);
      }
    }
  }
  return boards;
}

function spotsAvailable(position) {
  let available = 0;
  position.forEach(row => available += row.filter(x => x === '').length);
  return available;
}

const
  allEqual = arr => arr.every(v => v === arr[0] && v !== '');

const
  arrayColumn = (arr, n) => arr.map(x => x[n]);

const copyBoard = board => board.map(arr => arr.slice());
