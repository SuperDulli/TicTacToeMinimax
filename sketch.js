let board;
const players = ['X', 'O'];

let currentPlayer;

function setup() {
  createCanvas(500, 500);
  background(255);
  board = new Board(3, 3);
  currentPlayer = players[0];

}

function draw() {
  board.draw();
}

function gameOver(winner) {
  noLoop();
  let resultP = createP('');
  resultP.style('font-size', '32pt');
  if (winner === 'tie') {
    resultP.html('Tie!');
  } else {
    resultP.html(`${winner} wins!`);
  }

}

function mousePressed() {
  const tile = board.getClickedTile(mouseX, mouseY);
  if (board.get(tile.i, tile.j) === '') {
    board.set(tile.i, tile.j, currentPlayer)
    const winner = board.checkWinner();
    if (winner) {
      gameOver(winner);
    }
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // switch active Player
  }
}
