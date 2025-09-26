function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
}

function affineEncryptChar(c, a, b) {
    if (/[A-Z]/.test(c)) {
        let x = c.charCodeAt(0) - 65;
        return String.fromCharCode(((a * x + b) % 26) + 65);
    }
    return c;
}


function affineDecryptChar(c, a, b) {
    if (/[A-Z]/.test(c)) {
        let invA = modInverse(a, 26);
        if (invA === null) return c;
        let y = c.charCodeAt(0) - 65;
        return String.fromCharCode(((invA * (y - b + 26)) % 26) + 65);
    }
    return c;
}

function affineEncrypt(text, a, b) {
    return text.toUpperCase().split('').map(c => affineEncryptChar(c, a, b)).join('');
}

function affineDecrypt(text, a, b) {
    return text.toUpperCase().split('').map(c => affineDecryptChar(c, a, b)).join('');
}

function encrypt() {
    let text = document.getElementById('plaintext').value;
    let a = parseInt(document.getElementById('a').value);
    let b = parseInt(document.getElementById('b').value);

    if (isNaN(a) || isNaN(b)) return alert("Vui lòng nhập a và b!");

    let res = affineEncrypt(text, a, b);
    document.getElementById('result').innerHTML = "<b>Kết quả mã hoá:</b> " + res;
}

function decrypt() {
    let text = document.getElementById('plaintext').value;
    let a = parseInt(document.getElementById('a').value);
    let b = parseInt(document.getElementById('b').value);

    if (isNaN(a) || isNaN(b)) return alert("Vui lòng nhập a và b!");

    let res = affineDecrypt(text, a, b);
    document.getElementById('result').innerHTML = "<b>Kết quả giải mã:</b> " + res;
}