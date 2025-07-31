// AI（コンピューター）の処理

// コンピューターの手
function makeComputerMove() {
  const validMoves = getValidMoves(-1);

  if (validMoves.length === 0) {
    // コンピューターがパス
    gameState.currentPlayer = 1;
    updateDisplay();

    // プレイヤーも打てない場合はゲーム終了
    if (getValidMoves(1).length === 0) {
      endGame();
    }
    return;
  }

  // シンプルなAI: 戦略的に選択
  const selectedMove = selectBestMove(validMoves);
  makeMove(selectedMove[0], selectedMove[1], -1);
}

// 最適な手を選択（簡単な戦略）
function selectBestMove(validMoves) {
  // 1. コーナーを最優先
  const corners = validMoves.filter(([row, col]) => (row === 0 || row === 7) && (col === 0 || col === 7));
  if (corners.length > 0) {
    return corners[0];
  }

  // 2. エッジを次に優先
  const edges = validMoves.filter(([row, col]) => row === 0 || row === 7 || col === 0 || col === 7);
  if (edges.length > 0) {
    return edges[0];
  }

  // 3. 最も多くディスクを取れる手を選択
  let bestMove = validMoves[0];
  let maxFlips = 0;

  for (let move of validMoves) {
    const flips = countFlips(move[0], move[1], -1);
    if (flips > maxFlips) {
      maxFlips = flips;
      bestMove = move;
    }
  }

  return bestMove;
}

// ひっくり返せるディスク数をカウント
function countFlips(row, col, player) {
  let totalFlips = 0;

  for (let [dx, dy] of DIRECTIONS) {
    if (canFlipInDirection(row, col, dx, dy, player)) {
      let x = row + dx;
      let y = col + dy;
      let flips = 0;

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (gameState.board[x][y] === -player) {
          flips++;
        } else if (gameState.board[x][y] === player) {
          totalFlips += flips;
          break;
        }
        x += dx;
        y += dy;
      }
    }
  }

  return totalFlips;
}
