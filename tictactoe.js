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
  }

  get(i, j) {
    return this.board[i][j];
  }

  set(i, j, value) {
    this.board[i][j] = value;
  }

  getClickedTile(mouseX, mouseY) {
    const i = Math.floor(mouseY / (height / this.rows));
    const j = Math.floor(mouseX / (width / this.cols));
    console.log(`Clicked on tile: ${i}, ${j}: ${this.get(i,j)}`)
  }

  draw() {
    stroke(0);
    for (let i = 1; i < this.rows; i++) {
      for (let j = 1; j < this.cols; j++) {
        const xCor = (width / this.cols) * j;
        line(xCor, 0, xCor, height);
      }
      const yCor = (height / this.rows) * i;
      line(0, yCor, width, yCor);
    }
  }
}
