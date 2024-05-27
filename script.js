// CSVデータのURL
const csvFile = 'data.csv';
let csvData = [];

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
        return row['年齢'] === ageInput;
    });

    const result = filteredData.length > 0 ? filteredData[0][cityInput] : '該当なし';

    document.querySelector('#search-conditions').textContent = `条件\n　　　年齢: ${ageInput}、都道府県: ${cityInput}`;
    document.querySelector('#search-output').textContent = `検索結果\n　　　${result}`;
}

// ページ読み込み時にCSVファイルを読み込む
document.addEventListener('DOMContentLoaded', function() {
    loadCsvFile(csvFile)
        .then(data => {
            csvData = data;
        })
        .catch(error => console.error('CSV読み込みエラー:', error));
});
