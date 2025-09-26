function encrypt() {
    const text = document.getElementById('plaintext').value;
    const key = parseInt(document.getElementById('key').value);
    const res = [...text].map(c => shiftChar(c, key)).join('');
    document.getElementById('result').innerText = res;
}

function decrypt() {
    const text = document.getElementById('plaintext').value;
    const key = parseInt(document.getElementById('key').value);
    const res = [...text].map(c => shiftChar(c, -key)).join('');
    document.getElementById('result').innerText = res;
}

function shiftChar(c, k) {
    const code = c.charCodeAt(0);
    if (c >= 'a' && c <= 'z') {
        return String.fromCharCode((code - 97 + k + 2600) % 26 + 97);
    }
    if (c >= 'A' && c <= 'Z') {
        return String.fromCharCode((code - 65 + k + 2600) % 26 + 65);
    }
    return c;
}