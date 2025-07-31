// ゲーム状態の管理
let gameState = {
  board: [],
  currentPlayer: 1, // 1: 黒（プレイヤー）, -1: 白（コンピューター）
  gameOver: false,
  blackCount: 2,
  whiteCount: 2,
};

// 方向定数（8方向）
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// ゲーム初期化
function initGame() {
  // ボードを8x8で初期化
  gameState.board = Array(8)
    .fill()
    .map(() => Array(8).fill(0));

  // 初期配置
  gameState.board[3][3] = -1; // 白
  gameState.board[3][4] = 1; // 黒
  gameState.board[4][3] = 1; // 黒
  gameState.board[4][4] = -1; // 白

  gameState.currentPlayer = 1;
  gameState.gameOver = false;
  gameState.blackCount = 2;
  gameState.whiteCount = 2;
}

// ディスク数をカウント
function updateCounts() {
  gameState.blackCount = 0;
  gameState.whiteCount = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (gameState.board[row][col] === 1) {
        gameState.blackCount++;
      } else if (gameState.board[row][col] === -1) {
        gameState.whiteCount++;
      }
    }
  }
}

// 有効な手の一覧を取得
function getValidMoves(player) {
  const moves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (isValidMove(row, col, player)) {
        moves.push([row, col]);
      }
    }
  }
  return moves;
}

// 有効な手かどうかチェック
function isValidMove(row, col, player) {
  if (gameState.board[row][col] !== 0) return false;

  for (let [dx, dy] of DIRECTIONS) {
    if (canFlipInDirection(row, col, dx, dy, player)) {
      return true;
    }
  }
  return false;
}

// 指定方向にひっくり返せるかチェック
function canFlipInDirection(row, col, dx, dy, player) {
  let x = row + dx;
  let y = col + dy;
  let hasOpponent = false;

  while (x >= 0 && x < 8 && y >= 0 && y < 8) {
    if (gameState.board[x][y] === 0) return false;
    if (gameState.board[x][y] === -player) {
      hasOpponent = true;
    } else if (gameState.board[x][y] === player) {
      return hasOpponent;
    }
    x += dx;
    y += dy;
  }
  return false;
}
