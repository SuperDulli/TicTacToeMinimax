let board;
const players = ['X', 'O'];

let isGameOver = false;
let currentPlayer;

function setup() {
  resetSketch();
}

function resetSketch() {
  const winnerP = select(".winner");
  if (winnerP) winnerP.remove();
  createCanvas(500, 500);
  isGameOver = false;
  background(255);
  board = new Board(3, 3);
  currentPlayer = players[1];
  loop();
}

function draw() {
  background(255);
  board.draw();
  let winner = checkWinner(board.board);
  if (winner) {
    gameOver(winner);
  }
}

function gameOver(winner) {
  isGameOver = true;
  noLoop();
  let resultP = createP('');
  resultP.addClass("winner");
  resultP.style('font-size', '32pt');
  if (winner === 'tie') {
    resultP.html('Tie!');
  } else {
    resultP.html(`${winner} wins!`);
  }

}

function mousePressed() {
  if (isGameOver) {
    resetSketch();
    return;
  }
  const tile = board.getClickedTile(mouseX, mouseY);

  if (currentPlayer === 'O' && board.get(tile.i, tile.j) === '') {
    board.setBoardPos(tile.i, tile.j, currentPlayer);
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // switch active Player
  }

  // let winner = checkWinner(board.board);
  // if (winner) {
  //   gameOver(winner);
  // }

  board.setBoard(bestMove(board.board, currentPlayer));
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // switch active Player




}
