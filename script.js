// =============================================
// UTILITY FUNCTIONS
// =============================================

// Hàm chuyển ký tự thành chữ hoa
function toUpperChar(c) {
    if (c >= 'a' && c <= 'z') {
        return String.fromCharCode(c.charCodeAt(0) - 'a'.charCodeAt(0) + 'A'.charCodeAt(0));
    }
    return c;
}

// Hàm tính GCD (ước chung lớn nhất)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Hàm tìm nghịch đảo modular
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return -1;
}

// Hàm loại bỏ khoảng trắng
function removeSpaces(text) {
    return text.replace(/\s/g, '');
}

// Hiển thị thông báo lỗi
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.cipher-panel.active').insertBefore(errorDiv, document.querySelector('.cipher-panel.active').firstChild);
    setTimeout(() => errorDiv.remove(), 5000);
}

// =============================================
// UI MANAGEMENT
// =============================================

// Xử lý chuyển đổi giữa các thuật toán
document.addEventListener('DOMContentLoaded', function() {
    const algorithmBtns = document.querySelectorAll('.algorithm-btn');
    const cipherPanels = document.querySelectorAll('.cipher-panel');

    algorithmBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const algorithm = this.dataset.algorithm;
            
            // Cập nhật active button
            algorithmBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Hiển thị panel tương ứng
            cipherPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === algorithm) {
                    panel.classList.add('active');
                }
            });
        });
    });
});

// =============================================
// CAESAR CIPHER
// =============================================

function caesarEncrypt() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
    
    if (!text) {
        showError('Vui lòng nhập văn bản!');
        return;
    }
    
    let result = '';
    const normalizedShift = ((shift % 26) + 26) % 26;
    
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (/[a-zA-Z]/.test(c)) {
            const isLower = c >= 'a' && c <= 'z';
            const base = isLower ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode(base + (c.charCodeAt(0) - base + normalizedShift) % 26);
        } else {
            result += c;
        }
    }
    
    document.getElementById('caesar-result').value = result;
}

function caesarDecrypt() {
    const text = document.getElementById('caesar-text').value;
    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
    
    if (!text) {
        showError('Vui lòng nhập văn bản!');
        return;
    }
    
    // Giải mã = mã hóa với shift âm
    let result = '';
    const normalizedShift = ((-shift % 26) + 26) % 26;
    
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (/[a-zA-Z]/.test(c)) {
            const isLower = c >= 'a' && c <= 'z';
            const base = isLower ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode(base + (c.charCodeAt(0) - base + normalizedShift) % 26);
        } else {
            result += c;
        }
    }
    
    document.getElementById('caesar-result').value = result;
}

// =============================================
// AFFINE CIPHER
// =============================================

function affineEncrypt() {
    const text = document.getElementById('affine-text').value;
    const a = parseInt(document.getElementById('affine-a').value) || 5;
    const b = parseInt(document.getElementById('affine-b').value) || 8;
    
    if (!text) {
        showError('Vui lòng nhập văn bản!');
        return;
    }
    
    if (gcd(a, 26) !== 1) {
        showError('Khóa a phải nguyên tố cùng nhau với 26! Hãy chọn: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25');
        return;
    }
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c >= 'A' && c <= 'Z') {
            result += String.fromCharCode(((a * (c.charCodeAt(0) - 'A'.charCodeAt(0)) + b) % 26) + 'A'.charCodeAt(0));
        } else if (c >= 'a' && c <= 'z') {
            result += String.fromCharCode(((a * (c.charCodeAt(0) - 'a'.charCodeAt(0)) + b) % 26) + 'a'.charCodeAt(0));
        } else {
            result += c;
        }
    }
    
    document.getElementById('affine-result').value = result;
}

function affineDecrypt() {
    const text = document.getElementById('affine-text').value;
    const a = parseInt(document.getElementById('affine-a').value) ;
    const b = parseInt(document.getElementById('affine-b').value) ;
    
    if (!text) {
        showError('Vui lòng nhập văn bản!');
        return;
    }
    
    const aInv = modInverse(a, 26);
    if (aInv === -1) {
        showError('Không tồn tại nghịch đảo của a! Hãy chọn khóa khác.');
        return;
    }
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c >= 'A' && c <= 'Z') {
            result += String.fromCharCode((aInv * ((c.charCodeAt(0) - 'A'.charCodeAt(0) - b + 26)) % 26) + 'A'.charCodeAt(0));
        } else if (c >= 'a' && c <= 'z') {
            result += String.fromCharCode((aInv * ((c.charCodeAt(0) - 'a'.charCodeAt(0) - b + 26)) % 26) + 'a'.charCodeAt(0));
        } else {
            result += c;
        }
    }
    
    document.getElementById('affine-result').value = result;
}

// =============================================
// VIGENÈRE CIPHER
// =============================================

function generateVigenereKey(text, key) {
    const cleanText = text.replace(/[^a-zA-Z]/g, '');
    let result = '';
    for (let i = 0; i < cleanText.length; i++) {
        result += key[i % key.length];
    }
    return result;
}

function vigenereEncrypt() {
    const text = document.getElementById('vigenere-text').value;
    let key = document.getElementById('vigenere-key').value.toUpperCase();
    
    if (!text || !key) {
        showError('Vui lòng nhập văn bản và khóa!');
        return;
    }
    
    // Chỉ giữ lại chữ cái trong khóa
    key = key.replace(/[^A-Z]/g, '');
    if (!key) {
        showError('Khóa phải chứa ít nhất một chữ cái!');
        return;
    }
    
    const extendedKey = generateVigenereKey(text, key);
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        const c = toUpperChar(text[i]);
        const k = extendedKey[keyIndex];
        
        if (c >= 'A' && c <= 'Z') {
            result += String.fromCharCode(((c.charCodeAt(0) - 'A'.charCodeAt(0)) + (k.charCodeAt(0) - 'A'.charCodeAt(0))) % 26 + 'A'.charCodeAt(0));
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    document.getElementById('vigenere-result').value = result;
}

function vigenereDecrypt() {
    const text = document.getElementById('vigenere-text').value;
    let key = document.getElementById('vigenere-key').value.toUpperCase();
    
    if (!text || !key) {
        showError('Vui lòng nhập văn bản và khóa!');
        return;
    }
    
    key = key.replace(/[^A-Z]/g, '');
    if (!key) {
        showError('Khóa phải chứa ít nhất một chữ cái!');
        return;
    }
    
    const extendedKey = generateVigenereKey(text, key);
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        const c = toUpperChar(text[i]);
        const k = extendedKey[keyIndex];
        
        if (c >= 'A' && c <= 'Z') {
            result += String.fromCharCode(((c.charCodeAt(0) - 'A'.charCodeAt(0)) - (k.charCodeAt(0) - 'A'.charCodeAt(0)) + 26) % 26 + 'A'.charCodeAt(0));
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    document.getElementById('vigenere-result').value = result;
}

// =============================================
// PLAYFAIR CIPHER
// =============================================

function generatePlayfairMatrix(key) {
    const matrix = [];
    let used = '';
    const fullKey = (key + 'ABCDEFGHIKLMNOPQRSTUVWXYZ').toUpperCase();
    
    for (let c of fullKey) {
        c = c === 'J' ? 'I' : c; // Gộp I và J
        if (used.indexOf(c) === -1 && /[A-Z]/.test(c)) {
            used += c;
        }
    }
    
    // Tạo ma trận 5x5
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
        for (let j = 0; j < 5; j++) {
            matrix[i][j] = used[i * 5 + j];
        }
    }
    
    return matrix;
}

function findPlayfairPosition(c, matrix) {
    c = c === 'J' ? 'I' : c;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === c) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

function preparePlayfairText(text) {
    let result = '';
    for (let c of text) {
        if (/[A-Za-z]/.test(c)) {
            result += c.toUpperCase();
        }
    }
    
    // Chèn X nếu gặp cặp giống nhau
    for (let i = 0; i < result.length; i += 2) {
        if (i + 1 < result.length && result[i] === result[i + 1]) {
            result = result.substring(0, i + 1) + 'X' + result.substring(i + 1);
        }
    }
    
    // Thêm X nếu lẻ ký tự
    if (result.length % 2 !== 0) {
        result += 'X';
    }
    
    return result;
}

function playfairEncrypt() {
    const text = document.getElementById('playfair-text').value;
    const key = document.getElementById('playfair-key').value;
    
    if (!text || !key) {
        showError('Vui lòng nhập văn bản và khóa!');
        return;
    }
    
    const matrix = generatePlayfairMatrix(key);
    const preparedText = preparePlayfairText(text);
    let result = '';
    
    for (let i = 0; i < preparedText.length; i += 2) {
        const [r1, c1] = findPlayfairPosition(preparedText[i], matrix);
        const [r2, c2] = findPlayfairPosition(preparedText[i + 1], matrix);
        
        if (r1 === r2) { // Cùng hàng
            result += matrix[r1][(c1 + 1) % 5];
            result += matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) { // Cùng cột
            result += matrix[(r1 + 1) % 5][c1];
            result += matrix[(r2 + 1) % 5][c2];
        } else { // Khác hàng và cột
            result += matrix[r1][c2];
            result += matrix[r2][c1];
        }
    }
    
    document.getElementById('playfair-result').value = result;
}

function playfairDecrypt() {
    const text = document.getElementById('playfair-text').value;
    const key = document.getElementById('playfair-key').value;
    
    if (!text || !key) {
        showError('Vui lòng nhập văn bản và khóa!');
        return;
    }
    
    const matrix = generatePlayfairMatrix(key);
    const cleanText = text.replace(/[^A-Za-z]/g, '').toUpperCase();
    let result = '';
    
    for (let i = 0; i < cleanText.length; i += 2) {
        const [r1, c1] = findPlayfairPosition(cleanText[i], matrix);
        const [r2, c2] = findPlayfairPosition(cleanText[i + 1], matrix);
        
        if (r1 === r2) { // Cùng hàng
            result += matrix[r1][(c1 + 4) % 5];
            result += matrix[r2][(c2 + 4) % 5];
        } else if (c1 === c2) { // Cùng cột
            result += matrix[(r1 + 4) % 5][c1];
            result += matrix[(r2 + 4) % 5][c2];
        } else { // Khác hàng/cột
            result += matrix[r1][c2];
            result += matrix[r2][c1];
        }
    }
    
    document.getElementById('playfair-result').value = result;
}

function showPlayfairMatrix() {
    const key = document.getElementById('playfair-key').value;
    
    if (!key) {
        showError('Vui lòng nhập khóa!');
        return;
    }
    
    const matrix = generatePlayfairMatrix(key);
    const matrixDiv = document.getElementById('playfair-matrix');
    
    let html = '<h3>Ma trận khóa Playfair:</h3><table>';
    for (let i = 0; i < 5; i++) {
        html += '<tr>';
        for (let j = 0; j < 5; j++) {
            html += `<td>${matrix[i][j]}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    
    matrixDiv.innerHTML = html;
}

// =============================================
// COLUMNAR TRANSPOSITION CIPHER
// =============================================

function columnarEncrypt() {
    const text = document.getElementById('columnar-text').value;
    const key = document.getElementById('columnar-key').value;
    
    if (!text || !key) {
        showError('Vui lòng nhập văn bản và khóa!');
        return;
    }
    
    if (!/^\d+$/.test(key)) {
        showError('Khóa phải là dãy số (ví dụ: 4312567)!');
        return;
    }
    
    const cleanText = removeSpaces(text);
    const col = key.length;
    const row = Math.ceil(cleanText.length / col);
    
    // Tạo bảng
    const table = [];
    for (let i = 0; i < row; i++) {
        table[i] = [];
        for (let j = 0; j < col; j++) {
            table[i][j] = 'X';
        }
    }
    
    // Điền văn bản vào bảng theo hàng
    let k = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (k < cleanText.length) {
                table[i][j] = cleanText[k++];
            }
        }
    }
    
    // Tạo thứ tự cột
    const order = [];
    for (let i = 0; i < col; i++) {
        order.push([parseInt(key[i]), i]);
    }
    order.sort((a, b) => a[0] - b[0]);
    
    // Đọc cột theo thứ tự khóa
    let result = '';
    for (let [, colIndex] of order) {
        for (let i = 0; i < row; i++) {
            result += table[i][colIndex];
        }
    }
    
    document.getElementById('columnar-result').value = result;
}

function columnarDecrypt() {
    const text = document.getElementById('columnar-text').value;
    const key = document.getElementById('columnar-key').value;
    
    if (!text || !key) {
        showError('Vui lòng nhập văn bản và khóa!');
        return;
    }
    
    if (!/^\d+$/.test(key)) {
        showError('Khóa phải là dãy số (ví dụ: 4312567)!');
        return;
    }
    
    const col = key.length;
    const row = Math.ceil(text.length / col);
    
    // Tạo thứ tự cột
    const order = [];
    for (let i = 0; i < col; i++) {
        order.push([parseInt(key[i]), i]);
    }
    order.sort((a, b) => a[0] - b[0]);
    
    // Tạo bảng rỗng
    const table = [];
    for (let i = 0; i < row; i++) {
        table[i] = [];
        for (let j = 0; j < col; j++) {
            table[i][j] = 'X';
        }
    }
    
    // Điền ciphertext theo thứ tự cột
    let k = 0;
    for (let [, colIndex] of order) {
        for (let i = 0; i < row; i++) {
            if (k < text.length) {
                table[i][colIndex] = text[k++];
            }
        }
    }
    
    // Đọc theo hàng
    let result = '';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            result += table[i][j];
        }
    }
    
    document.getElementById('columnar-result').value = result;
}