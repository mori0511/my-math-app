let currentCell = null; // 現在選択されているセルを保持する変数
let timer; // タイマーのID
let timeElapsed = 0; // 経過時間を保持する変数
let timerDisplay = null; // タイマー表示用の要素
let timerStarted = false; // タイマーが開始されたかどうかのフラグ

function createTable() {
    const table = document.getElementById("calculationTable");
    
    for (let i = 0; i <= 10; i++) {
        const row = table.insertRow();
        
        for (let j = 0; j <= 10; j++) {
            const cell = row.insertCell();
            
            // 左上のセルに「+」を表示
            if (i === 0 && j === 0) {
                cell.innerHTML = "+"; 
            } 
            // 上端に1~9のランダム数字を表示
            else if (i === 0) {
                cell.innerHTML = Math.floor(Math.random() * 9) + 1; 
            } 
            // 左端に1~9のランダム数字を表示
            else if (j === 0) {
                cell.innerHTML = Math.floor(Math.random() * 9) + 1; 
            } 
            // 2行2列目から計算結果を入力できるようにする
            else if (i >= 1 && j >= 1) {
                cell.contentEditable = true; 
                cell.addEventListener('click', () => {
                    currentCell = cell; // セルをクリックしたときにcurrentCellを更新
                    startTimer(); // 入力が始まったらタイマーを開始
                });
            }
        }
    }

    // 初期選択セルを2行2列目に設定
    currentCell = table.rows[1].cells[1]; 
    currentCell.focus(); // 初期選択セルにフォーカス
}

// 数字を選択したセルに追加する関数
function appendNumber(number) {
    if (currentCell) {
        const currentValue = currentCell.innerHTML;
        currentCell.innerHTML = currentValue + number; // 選択されているセルに数字を追加
    }
}

// 入力を確定し、次のセルに移動する関数
function confirmInput() {
    if (currentCell) {
        const currentValue = currentCell.innerHTML;
        currentCell.innerHTML = currentValue; // 現在の値を保持

        // 右のセルを取得
        const nextCell = currentCell.nextElementSibling;

        if (nextCell) {
            nextCell.contentEditable = true; // 次のセルを編集可能にする
            nextCell.focus(); // 次のセルにフォーカスを移動
            currentCell = nextCell; // 現在のセルを更新
        } else {
            // 右端のセルに到達した場合、次の行の最初のセルに移動
            const currentRow = currentCell.parentElement;
            const nextRow = currentRow.nextElementSibling; // 次の行を取得
            if (nextRow) {
                const firstCellInNextRow = nextRow.cells[1]; // 次の行の1列目を取得
                firstCellInNextRow.contentEditable = true; // 次の行の1列目を編集可能にする
                firstCellInNextRow.focus(); // 次の行の1列目にフォーカスを移動
                currentCell = firstCellInNextRow; // 現在のセルを更新
            }
        }
    }
}

// 現在のセルの入力をクリアする関数
function clearInput() {
    if (currentCell) {
        currentCell.innerHTML = ""; // 現在のセルの内容をクリア
    }
}

// タイマーを開始する関数
function startTimer() {
    if (!timerStarted) { // タイマーがまだ開始されていない場合
        timeElapsed = 0; // 経過時間をリセット
        timerDisplay = document.getElementById("timerDisplay");
        timerDisplay.innerHTML = "経過時間: 0秒"; // タイマーの初期表示

        timer = setInterval(() => {
            timeElapsed++;
            timerDisplay.innerHTML = "経過時間: " + timeElapsed + "秒"; // 経過時間を表示
        }, 1000); // 1秒ごとに更新

        timerStarted = true; // タイマーを開始したフラグを立てる
    }
}

// 計算を終了する関数
function stopTimer() {
    clearInterval(timer); // タイマーを停止
    alert("計算が終了しました！経過時間: " + timeElapsed + "秒"); // 終了メッセージを表示
}

// ページ読み込み時にテーブルを生成
window.onload = function() {
    createTable();
};
