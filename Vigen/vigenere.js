function process(text, key, mode) {
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    let cleanKey = key.toUpperCase();
    let res = '';

    for (let i = 0; i < cleanText.length; i++) {
        let c = cleanText.charCodeAt(i) - 65;
        let k = cleanKey.charCodeAt(i % cleanKey.length) - 65;
        let offset;
        if (mode === 'enc') {
            offset = (c + k) % 26;
        } else {
            offset = (c + 26 - k) % 26;
        }

        res += String.fromCharCode(offset + 65);
    }
    return res;
}

function encrypt() {
    let text = document.getElementById('plaintext').value;
    let key = document.getElementById('key').value;
    document.getElementById('result').innerText = process(text, key, 'enc');
}

function decrypt() {
    let text = document.getElementById('plaintext').value;
    let key = document.getElementById('key').value;
    document.getElementById('result').innerText = process(text, key, 'dec');
}