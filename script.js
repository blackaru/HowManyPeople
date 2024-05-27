// CSVデータのURL
const csvFile = 'data.csv';
let csvData = [];

// HTMLテーブルを生成する関数
function generateTable(data) {
    const table = document.querySelector('#csv-table');
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');

    // テーブルをクリア
    tbody.innerHTML = '';
    thead.innerHTML = '';

    // カラムヘッダーを生成
    if (data.length > 0) {
        const theadRow = document.createElement('tr');
        Object.keys(data[0]).forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            theadRow.appendChild(th);
        });
        thead.appendChild(theadRow);

        // データをテーブルに追加
        data.forEach(rowData => {
            const tr = document.createElement('tr');
            Object.values(rowData).forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }
}

// CSVファイルを読み込んでパースする関数
function loadCsvFile(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const rows = xhr.responseText.split('\n').map(row => row.split(','));
                    const headers = rows[0];
                    const data = rows.slice(1).map(row => {
                        return headers.reduce((acc, header, i) => {
                            acc[header] = row[i];
                            return acc;
                        }, {});
                    });
                    resolve(data);
                } else {
                    reject(new Error('CSV読み込みエラー'));
                }
            }
        };
        xhr.open('GET', file, true);
        xhr.send();
    });
}

// 検索機能
function search() {
    const ageInput = document.querySelector('#age').value;
    const cityInput = document.querySelector('#city').value;

    const filteredData = csvData.filter(row => {
        const ageMatch = ageInput ? row['年齢'] === ageInput : true;
        const cityMatch = cityInput ? row[cityInput] : true;
        return ageMatch && cityMatch;
    });

    generateTable(filteredData);
}

// ページ読み込み時にCSVファイルを読み込む
document.addEventListener('DOMContentLoaded', function() {
    loadCsvFile(csvFile)
        .then(data => {
            csvData = data;
            generateTable(data);
        })
        .catch(error => console.error('CSV読み込みエラー:', error));
});
