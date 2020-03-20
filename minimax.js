function minimax(position, depth, alpha, beta, maximizingPlayer) {
  if (depth === 0 || checkWinner(position) != null) {
    // console.log(position, boardEvaluation(position));
    return boardEvaluation(position);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    const children = nextBoards(position, 'X');
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      let eval = minimax(child, depth - 1, alpha, beta, false);
      maxEval = max(maxEval, eval);
      alpha = max(alpha, eval);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else { // minimizingPlayer
    let minEval = Infinity;
    const children = nextBoards(position, 'O');
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      let eval = minimax(child, depth - 1, alpha, beta, true);
      minEval = min(minEval, eval);
      beta = min(beta, eval);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
}

function bestMove(position, activePlayer) {
  // find best Move for the maximixing Player ('X')
  let bestScore = -Infinity;
  let bestMove = null;
  const options = nextBoards(position, activePlayer);
  for (let i = 0; i < options.length; i++) {
    const move = options[i];
    const score = minimax(move, spotsAvailable(position), -Infinity, Infinity, (activePlayer === 'O'));
    if (score > bestScore) {
      bestScore = score;
      bestMove = copyBoard(move);
    }
  }
  console.log(bestMove);
  return bestMove;
}
