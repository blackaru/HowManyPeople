// CSVデータのURL
const csvFile = 'data.csv';

// HTMLテーブルを生成する関数
function generateTable(data) {
    const table = document.querySelector('#csv-table');
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');

    // カラムヘッダーを生成
    const theadRow = document.createElement('tr');
    data[0].forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        theadRow.appendChild(th);
    });
    thead.appendChild(theadRow);

    // データをテーブルに追加
    data.slice(1).forEach(rowData => {
        const tr = document.createElement('tr');
        rowData.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// CSVファイルを読み込む関数
function loadCsvFile(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error('CSV読み込みエラー'));
                }
            }
        };
        xhr.open('GET', file, true);
        xhr.send();
    });
}

// ページ読み込み時にCSVファイルを読み込んでHTMLテーブルに変換する
document.addEventListener('DOMContentLoaded', function() {
    loadCsvFile(csvFile)
        .then(csv => {
            const rows = csv.split('\n').map(row => row.split(','));
            generateTable(rows);
        })
        .catch(error => console.error('CSV読み込みエラー:', error));
});
