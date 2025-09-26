function encrypt() {
    let text = document.getElementById('plaintext').value.replace(/\s/g, '');
    let key = document.getElementById('key').value.split(',').map(x => parseInt(x) - 1);
    let n = key.length;
    let res = '';

    for (let i = 0; i < text.length; i += n) {
        let block = text.slice(i, i + n).split('');
        let newBlock = [];
        for (let j = 0; j < n; j++) {
            newBlock[j] = block[key[j]] || 'X';
        }
        res += newBlock.join('');
    }
    document.getElementById('result').innerText = res;
}

function decrypt() {
    let text = document.getElementById('plaintext').value.replace(/\s/g, '');
    let key = document.getElementById('key').value.split(',').map(x => parseInt(x) - 1);
    let n = key.length;

    let invKey = [];
    for (let i = 0; i < n; i++) {
        invKey[key[i]] = i;
    }

    let res = '';
    for (let i = 0; i < text.length; i += n) {
        let block = text.slice(i, i + n).split('');
        let newBlock = [];
        for (let j = 0; j < n; j++) {
            newBlock[j] = (invKey[j] < block.length) ? block[invKey[j]] : '';
        }
        res += newBlock.join('');
    }

    document.getElementById('result').innerText = res;
}