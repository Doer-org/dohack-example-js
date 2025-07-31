// スタート画面の処理

// DOM要素の取得
const startButton = document.getElementById("startButton");

// ゲーム開始ボタンのイベントリスナー
startButton.addEventListener("click", () => {
  // ゲーム画面に遷移
  window.location.href = "game.html";
});

// ページ読み込み時のアニメーション
document.addEventListener("DOMContentLoaded", () => {
  // セッションストレージをクリア（新しいセッション開始）
  sessionStorage.clear();

  // ボタンにフォーカス（キーボード操作対応）
  startButton.focus();

  // Enterキーでもゲーム開始できるように
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startButton.click();
    }
  });
});
