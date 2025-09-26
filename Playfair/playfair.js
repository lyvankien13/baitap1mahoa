function generateMatrix(key) {
    let cleanKey = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let letters = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    let seen = {};
    let matrix = [];

    for (let char of(cleanKey + letters)) {
        if (!seen[char]) {
            matrix.push(char);
            seen[char] = true;
        }
    }
    return matrix;
}

function findPos(matrix, letter) {
    let idx = matrix.indexOf(letter);
    return [~~(idx / 5), idx % 5];
}

function prepareText(text) {
    let clean = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let result = '';
    for (let i = 0; i < clean.length; i++) {
        result += clean[i];
        if (i < clean.length - 1 && clean[i] === clean[i + 1]) {
            result += 'X';
        }
    }
    if (result.length % 2) result += 'X';
    return result;
}

function encrypt() {
    let text = document.getElementById('plaintext').value;
    let key = document.getElementById('key').value;
    let matrix = generateMatrix(key);
    let prepared = prepareText(text);
    let res = '';

    for (let i = 0; i < prepared.length; i += 2) {
        let a = prepared[i],
            b = prepared[i + 1];
        let [r1, c1] = findPos(matrix, a);
        let [r2, c2] = findPos(matrix, b);

        if (r1 === r2) {
            res += matrix[r1 * 5 + ((c1 + 1) % 5)];
            res += matrix[r2 * 5 + ((c2 + 1) % 5)];
        } else if (c1 === c2) {
            res += matrix[((r1 + 1) % 5) * 5 + c1];
            res += matrix[((r2 + 1) % 5) * 5 + c2];
        } else {
            res += matrix[r1 * 5 + c2];
            res += matrix[r2 * 5 + c1];
        }
    }

    document.getElementById('result').innerText = res;
}

function decrypt() {
    let text = document.getElementById('plaintext').value
        .toUpperCase()
        .replace(/J/g, 'I')
        .replace(/[^A-Z]/g, '');
    let key = document.getElementById('key').value;
    let matrix = generateMatrix(key);
    let res = '';

    for (let i = 0; i < text.length; i += 2) {
        let a = text[i],
            b = text[i + 1];
        let [r1, c1] = findPos(matrix, a);
        let [r2, c2] = findPos(matrix, b);

        if (r1 === r2) {
            res += matrix[r1 * 5 + ((c1 + 4) % 5)];
            res += matrix[r2 * 5 + ((c2 + 4) % 5)];
        } else if (c1 === c2) {
            res += matrix[((r1 + 4) % 5) * 5 + c1];
            res += matrix[((r2 + 4) % 5) * 5 + c2];
        } else {
            res += matrix[r1 * 5 + c2];
            res += matrix[r2 * 5 + c1];
        }
    }

    document.getElementById('result').innerText = res;
}