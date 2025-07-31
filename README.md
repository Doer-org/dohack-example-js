# シンプルオセロ JavaScript版

Vanilla HTML、CSS、JavaScriptで構築したクラシックなオセロ（リバーシ）ゲームです。

![オセロゲーム画面](https://img.shields.io/badge/Game-Othello-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## 🎮 ゲームの特徴

- **人間 vs コンピューター**: 戦略的なAI相手との対戦
- **3つの画面遷移**: スタート画面 → ゲーム画面 → 結果画面
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応
- **視覚的フィードバック**: 有効手のハイライト表示
- **キーボード操作**: アクセシビリティに配慮

## 🚀 環境構築と起動方法

### 必要な環境

- **Webブラウザ**: モダンブラウザ（Chrome、Firefox、Safari、Edge）
- **HTTPサーバー**: 本格運用時のみ（開発時は不要）

### 1. 簡単起動（開発・テスト用）

```bash
# プロジェクトディレクトリに移動
cd dohack-example-js

# index.html をブラウザで直接開く
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 2. HTTPサーバーでの起動（推奨）

#### Python（Python 3.x）
```bash
cd dohack-example-js
python -m http.server 8000
# ブラウザで http://localhost:8000 にアクセス
```

#### Node.js（npx使用）
```bash
cd dohack-example-js
npx serve .
# または
npx http-server .
```

#### VS Code Live Server
1. VS Codeで dohack-example-js フォルダを開く
2. Live Server 拡張機能をインストール
3. index.html を右クリック→「Open with Live Server」

## 🎯 ゲームルール

### 基本ルール
1. **8×8の盤面**: 中央4マスに白黒2個ずつ配置してスタート
2. **交互に配置**: 黒（プレイヤー）→白（コンピューター）の順
3. **挟んでひっくり返し**: 相手の駒を自分の駒で挟むとひっくり返る
4. **勝敗判定**: 盤面が埋まった時、駒数が多い方の勝利

### 有効手の条件
- 空いているマスに配置
- 配置により相手の駒を最低1個以上ひっくり返せる
- 8方向（縦・横・斜め）のいずれかで挟める

## 🏗 プロジェクト構成

```
dohack-example-js/
├── index.html              # スタート画面
├── game.html               # ゲーム画面  
├── result.html             # 結果画面
├── css/                    # スタイルシート
│   ├── common.css          # 共通スタイル
│   ├── start.css           # スタート画面専用
│   ├── game.css            # ゲーム画面専用
│   └── result.css          # 結果画面専用
├── js/                     # JavaScript
│   ├── start.js            # スタート画面ロジック
│   ├── game.js             # メインゲームロジック
│   ├── game-state.js       # ゲーム状態管理
│   ├── board.js            # 盤面描画と手の処理
│   ├── ai.js               # コンピューターAI
│   └── result.js           # 結果画面ロジック
└── README.md               # このファイル
```

## 🧠 アーキテクチャ詳細

### ファイル別役割

#### **HTML ファイル**
- `index.html`: タイトル画面、ゲーム開始
- `game.html`: メインゲーム画面、盤面表示
- `result.html`: 勝敗結果表示、再プレイ

#### **CSS ファイル**
- `common.css`: レイアウト、ボタン、ディスクの共通スタイル
- `start.css`: スタート画面専用レイアウト
- `game.css`: ゲーム盤面、プレイヤー情報のスタイル
- `result.css`: 結果表示、スコア表示のスタイル

#### **JavaScript ファイル**
- `game-state.js`: グローバル状態、盤面データ、有効手判定
- `board.js`: HTML描画、クリックイベント、駒の配置
- `ai.js`: コンピューターの手選択、戦略アルゴリズム
- `game.js`: ゲーム進行制御、表示更新、終了判定
- `start.js`: スタート画面の制御
- `result.js`: 結果画面の制御、セッションストレージ

### データフロー

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ game-state  │◄──►│    board     │◄──►│     ai      │
│  (状態管理)  │    │   (盤面制御)  │    │  (AI思考)   │
└─────────────┘    └──────────────┘    └─────────────┘
       ▲                    ▲                    ▲
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│    game     │    │    start     │    │   result    │
│ (進行制御)   │    │ (開始画面)    │    │ (結果画面)   │
└─────────────┘    └──────────────┘    └─────────────┘
```

## 🤖 AI戦略アルゴリズム

### 思考の優先順位

1. **角取り戦略**: 四隅（最重要ポジション）
   ```javascript
   const corners = validMoves.filter(([row, col]) => 
     (row === 0 || row === 7) && (col === 0 || col === 7)
   );
   ```

2. **辺取り戦略**: 端の安全なポジション
   ```javascript
   const edges = validMoves.filter(([row, col]) => 
     row === 0 || row === 7 || col === 0 || col === 7
   );
   ```

3. **獲得数最大戦略**: 最も多くの駒を取れる手
   ```javascript
   const bestMove = validMoves.reduce((best, move) => {
     const flips = countFlips(move[0], move[1], -1);
     return flips > best.flips ? {move, flips} : best;
   });
   ```

## 🎨 スタイリング設計

### CSS設計原則

- **BEM風命名**: `.game-info`, `.player-info`, `.current-turn`
- **コンポーネント指向**: 画面ごとの専用CSS分離
- **レスポンシブファースト**: モバイル対応メディアクエリ
- **視覚的階層**: グラデーション、シャドウ、アニメーション

### カラーパレット

```css
/* メインカラー */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--board-green: #2d5016;      /* ボード背景 */
--cell-green: #4a7c23;       /* セル背景 */
--valid-green: #6aa038;      /* 有効手 */

/* フィードバックカラー */
--success-green: #28a745;    /* 勝利 */
--danger-red: #dc3545;       /* 敗北 */
--warning-yellow: #ffc107;   /* 引き分け */
```

## 🔧 カスタマイズガイド

### AIの難易度調整

`js/ai.js` の `selectBestMove` 関数を修正：

```javascript
// 簡単AI（ランダム選択）
function selectBestMove(validMoves) {
  return validMoves[Math.floor(Math.random() * validMoves.length)];
}

// より高度なAI（位置評価追加）
const POSITION_WEIGHTS = [
  [100, -20,  10,   5,   5,  10, -20, 100],
  [-20, -50,  -2,  -2,  -2,  -2, -50, -20],
  // ... 評価テーブル
];
```

### 盤面サイズの変更

`js/game-state.js` で盤面サイズの変更：

```javascript
// 6x6盤面への変更例
const BOARD_SIZE = 6;
gameState.board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));

// 初期配置も調整
gameState.board[2][2] = -1;
gameState.board[2][3] = 1;
gameState.board[3][2] = 1;
gameState.board[3][3] = -1;
```

### 見た目のカスタマイズ

`css/common.css` での色変更：

```css
/* テーマカラーの変更 */
body {
  background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
}

.btn {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
```

## 🐛 トラブルシューティング

### よくある問題

1. **ファイルが読み込まれない**
   ```bash
   # CORS エラーの場合、HTTPサーバーを使用
   python -m http.server 8000
   ```

2. **JavaScript エラー**
   ```bash
   # ブラウザの開発者ツールでコンソール確認
   F12 → Console タブ
   ```

3. **スタイルが適用されない**
   ```bash
   # キャッシュクリア
   Ctrl+F5 (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

4. **ゲーム状態の不具合**
   ```javascript
   // セッションストレージのクリア
   sessionStorage.clear();
   ```

## 📱 ブラウザ対応

### サポートブラウザ

| ブラウザ | 最小バージョン | 対応状況 |
|----------|----------------|----------|
| Chrome | 60+ | ✅ 完全対応 |
| Firefox | 55+ | ✅ 完全対応 |
| Safari | 11+ | ✅ 完全対応 |
| Edge | 79+ | ✅ 完全対応 |
| IE | - | ❌ 非対応 |

### 使用している現代的なJavaScript機能

- ES6+ Arrow Functions
- const/let 宣言
- Template Literals
- Array Methods (map, filter, reduce)
- Destructuring Assignment

## 📚 学習リソース

### 基礎技術の学習

- **HTML5**: [MDN HTML ガイド](https://developer.mozilla.org/ja/docs/Web/HTML)
- **CSS3**: [MDN CSS ガイド](https://developer.mozilla.org/ja/docs/Web/CSS)
- **JavaScript**: [MDN JavaScript ガイド](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- **DOM操作**: [DOM インターフェイス](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model)

### オセロゲーム開発の参考

- **ゲームアルゴリズム**: Minimax法、Alpha-Beta枝刈り
- **評価関数**: 位置価値、安定度、機動力
- **UI/UX**: ゲームデザインパターン、ユーザビリティ

## 🆚 React版との比較

| 項目 | JavaScript版 | React版 |
|------|-------------|---------|
| **学習コストの低さ** | ✅ 高い | ⚠️ 中程度 |
| **ファイルサイズ** | ✅ 軽量 | ⚠️ 重い |
| **状態管理** | ⚠️ 手動 | ✅ 自動 |
| **保守性** | ⚠️ 低い | ✅ 高い |
| **再利用性** | ⚠️ 低い | ✅ 高い |
| **エコシステム** | ⚠️ 限定的 | ✅ 豊富 |

---

**学習者へのメッセージ**: このJavaScript版オセロは、Web開発の基礎を学ぶのに最適なプロジェクトです。DOM操作、イベント処理、状態管理の基本概念を実践的に学べます。React版と比較することで、フレームワークの価値も理解できるでしょう！