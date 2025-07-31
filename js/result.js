// 結果画面の処理

// DOM要素の取得
const gameResult = document.getElementById("gameResult");
const finalBlackCount = document.getElementById("finalBlackCount");
const finalWhiteCount = document.getElementById("finalWhiteCount");
const playAgainButton = document.getElementById("playAgainButton");
const backToStartButton = document.getElementById("backToStartButton");

// 結果表示
function displayResult() {
  // セッションストレージから結果を取得
  const resultData = sessionStorage.getItem("gameResult");

  if (!resultData) {
    // 結果データがない場合はスタート画面に戻る
    window.location.href = "index.html";
    return;
  }

  const result = JSON.parse(resultData);

  // スコア表示
  finalBlackCount.textContent = result.blackCount;
  finalWhiteCount.textContent = result.whiteCount;

  // 勝敗結果表示
  switch (result.winner) {
    case "player":
      gameResult.textContent = "あなたの勝利！";
      gameResult.style.color = "#28a745";
      break;
    case "computer":
      gameResult.textContent = "コンピューターの勝利！";
      gameResult.style.color = "#dc3545";
      break;
    case "draw":
      gameResult.textContent = "引き分け！";
      gameResult.style.color = "#ffc107";
      break;
  }
}

// イベントリスナー設定
playAgainButton.addEventListener("click", () => {
  // 新しいゲームを開始
  window.location.href = "game.html";
});

backToStartButton.addEventListener("click", () => {
  // スタート画面に戻る
  window.location.href = "index.html";
});

// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", () => {
  displayResult();

  // キーボード操作対応
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      playAgainButton.click();
    } else if (event.key === "Escape") {
      event.preventDefault();
      backToStartButton.click();
    }
  });

  // もう一度プレイボタンにフォーカス
  playAgainButton.focus();
});
