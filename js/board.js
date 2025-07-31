// ボード関連の処理

// ボードのHTML生成
function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;

      // セルクリックイベント
      cell.addEventListener("click", () => handleCellClick(row, col));

      // ディスクがある場合は追加
      if (gameState.board[row][col] !== 0) {
        const disc = document.createElement("div");
        disc.className = `disc ${gameState.board[row][col] === 1 ? "black" : "white"}`;
        cell.appendChild(disc);
      }

      board.appendChild(cell);
    }
  }

  // 有効な手をハイライト
  highlightValidMoves();
}

// 有効な手をハイライト
function highlightValidMoves() {
  const board = document.getElementById("board");
  if (gameState.currentPlayer === 1) {
    const validMoves = getValidMoves(1);
    validMoves.forEach(([row, col]) => {
      const cellIndex = row * 8 + col;
      const cell = board.children[cellIndex];
      cell.classList.add("valid-move");
    });
  }
}

// 手を打つ
function makeMove(row, col, player) {
  gameState.board[row][col] = player;

  // ディスクをひっくり返す
  for (let [dx, dy] of DIRECTIONS) {
    flipDiscsInDirection(row, col, dx, dy, player);
  }

  // プレイヤー交代
  gameState.currentPlayer = -gameState.currentPlayer;

  // カウント更新
  updateCounts();

  // 表示更新
  createBoard();
  updateDisplay();

  // ゲーム終了チェック
  checkGameEnd();
}

// 指定方向のディスクをひっくり返す
function flipDiscsInDirection(row, col, dx, dy, player) {
  if (!canFlipInDirection(row, col, dx, dy, player)) return;

  let x = row + dx;
  let y = col + dy;

  while (x >= 0 && x < 8 && y >= 0 && y < 8) {
    if (gameState.board[x][y] === -player) {
      gameState.board[x][y] = player;
    } else if (gameState.board[x][y] === player) {
      break;
    }
    x += dx;
    y += dy;
  }
}
