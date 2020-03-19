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

  set(i, j, value) {
    this.board[i][j] = value;
    this._available -= 1;
  }

  _fieldHeight;

  getClickedTile(mouseX, mouseY) {
    const i = Math.floor(mouseY / this._fieldHeight);
    const j = Math.floor(mouseX / this._fieldWidth);
    console.log(`Clicked on tile: ${i}, ${j}: ${this.get(i, j)}`);
    return {i, j};
  }

  checkWinner() {
    let winner = null;
    // Horizontal
    for (let i = 0; i < this.rows; i++) {
      if (allEqual(this.board[i])) {
        winner = this.board[i][0];
      }
    }

    // Vertical
    for (let i = 0; i < this.cols; i++) {
      if (allEqual(arrayColumn(this.board, i))) {
        winner = this.board[0][i];
      }
    }

    // Diagonal
    if (this.rows !== this.cols) {
      console.error("can not check diagonally. Board is not a square!")
      return winner;
    }
    let d1 = [];
    let d2 = [];
    for (let i = 0; i < this.rows; i++) {
      d1.push(this.board[i][i]);
      d2.push(this.board[this.rows - i - 1][this.cols - i - 1]);
    }
    if (allEqual(d1)) {
      winner = d1[0];
    } else if (allEqual(d2)) {
      winner = d2[0];
    }

    // check for tie
    if (winner == null && this._available === 0) {
      return 'tie'
    } else {
      return winner;
    }
  }

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

const allEqual = arr => arr.every(v => v === arr[0] && v !== '');

const arrayColumn = (arr, n) => arr.map(x => x[n]);
