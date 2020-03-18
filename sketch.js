let board;

function setup() {
  createCanvas(500,500);
  background(255);
  board = new Board(3,3);
}

function draw() {
  board.draw();
}

function mousePressed() {
  board.getClickedTile(mouseX, mouseY);
}
