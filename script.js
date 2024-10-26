// HTML要素を取得
const calculator = document.getElementById('calculator');
const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
let correctAnswers = []; // 正解のリストを保持

// 100マス計算の表を作成する関数
function createCalculator() {
    calculator.innerHTML = ''; // テーブルの内容をリセット
    correctAnswers = []; // 正解リストをリセット
    
    // 10行10列の表を作成
    for (let row = 0; row < 10; row++) {
        let tr = document.createElement('tr'); // 新しい行を作成
        for (let col = 0; col < 10; col++) {
            let td = document.createElement('td'); // 新しいセルを作成
            let input = document.createElement('input'); // 入力フィールドを作成
            input.type = 'number'; // 数値入力フィールドに設定
            input.id = `cell-${row}-${col}`; // セルごとに固有のIDを設定
            td.appendChild(input); // セルに入力フィールドを追加
            tr.appendChild(td); // 行にセルを追加

            // 答えをランダムに生成（例: 掛け算）
            let num1 = Math.floor(Math.random() * 10) + 1; // 1から10のランダムな数字
            let num2 = Math.floor(Math.random() * 10) + 1;
            correctAnswers.push(num1 * num2); // 正解をリストに保存
            input.setAttribute('data-answer', num1 * num2); // 答えをデータ属性に保存
        }
        calculator.appendChild(tr); // テーブルに行を追加
    }
}

// 入力をチェックする関数
function checkAnswers() {
    let score = 0; // スコアを初期化
    correctAnswers.forEach((answer, index) => {
        const input = document.querySelector(`#cell-${Math.floor(index / 10)}-${index % 10}`);
        if (parseInt(input.value) === answer) { // 答えが正しいか確認
            score++; // 正解ならスコアを増加
            input.style.backgroundColor = 'lightgreen'; // 正解なら緑に
        } else {
            input.style.backgroundColor = 'lightcoral'; // 間違いなら赤に
        }
    });
    alert(`正解数: ${score}/100`); // スコアを表示
}

// スタートボタンとチェックボタンにイベントリスナーを追加
startBtn.addEventListener('click', createCalculator); // スタートボタンを押すと新しい計算表を生成
checkBtn.addEventListener('click', checkAnswers); // チェックボタンを押すと答えをチェック
