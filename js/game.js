// ゲームメイン処理

// DOM要素の取得
const blackCountElement = document.getElementById("blackCount");
const whiteCountElement = document.getElementById("whiteCount");
const turnDisplay = document.getElementById("turnDisplay");
const resetButton = document.getElementById("resetButton");
const backToStartButton = document.getElementById("backToStartButton");

// セルクリックの処理
function handleCellClick(row, col) {
  if (gameState.gameOver || gameState.currentPlayer !== 1) return;

  if (isValidMove(row, col, gameState.currentPlayer)) {
    makeMove(row, col, gameState.currentPlayer);

    // コンピューターのターン
    setTimeout(() => {
      if (!gameState.gameOver && gameState.currentPlayer === -1) {
        makeComputerMove();
      }
    }, 500);
  }
}

// 表示更新
function updateDisplay() {
  blackCountElement.textContent = gameState.blackCount;
  whiteCountElement.textContent = gameState.whiteCount;

  if (gameState.gameOver) {
    turnDisplay.textContent = "ゲーム終了";
  } else {
    turnDisplay.textContent = gameState.currentPlayer === 1 ? "あなたの番です" : "コンピューターの番です";
  }
}

// ゲーム終了チェック
function checkGameEnd() {
  const blackMoves = getValidMoves(1);
  const whiteMoves = getValidMoves(-1);

  if (blackMoves.length === 0 && whiteMoves.length === 0) {
    endGame();
  } else if (blackMoves.length === 0 && gameState.currentPlayer === 1) {
    // プレイヤーがパス
    gameState.currentPlayer = -1;
    updateDisplay();
    setTimeout(() => {
      if (!gameState.gameOver) {
        makeComputerMove();
      }
    }, 1000);
  }
}

// ゲーム終了
function endGame() {
  gameState.gameOver = true;

  // 結果をセッションストレージに保存
  const result = {
    blackCount: gameState.blackCount,
    whiteCount: gameState.whiteCount,
    winner:
      gameState.blackCount > gameState.whiteCount
        ? "player"
        : gameState.whiteCount > gameState.blackCount
        ? "computer"
        : "draw",
  };

  sessionStorage.setItem("gameResult", JSON.stringify(result));

  // 結果画面に遷移
  setTimeout(() => {
    window.location.href = "result.html";
  }, 1500);
}

// イベントリスナー設定
resetButton.addEventListener("click", () => {
  initGame();
  createBoard();
  updateDisplay();
});

backToStartButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// ページ読み込み時の初期化
document.addEventListener("DOMContentLoaded", () => {
  initGame();
  createBoard();
  updateDisplay();
});
