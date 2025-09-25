#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

/*
    Playfair Cipher
    - Sử dụng bảng 5x5 (I và J gộp chung).
    - Mã hóa/giải mã theo từng cặp ký tự.
*/

// Tạo bảng khóa Playfair 5x5
vector<vector<char>> generateKeyMatrix(string key) {
    vector<vector<char>> matrix(5, vector<char>(5));
    string used = "";
    key += "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // bỏ chữ J

    for (char &c : key) {
        c = toupper(c);
        if (c == 'J') c = 'I'; // gộp I và J
        if (used.find(c) == string::npos && isalpha(c)) {
            used += c;
        }
    }

    int k = 0;
    for (int i = 0; i < 5; i++)
        for (int j = 0; j < 5; j++)
            matrix[i][j] = used[k++];
    return matrix;
}

// Tìm vị trí ký tự trong bảng
pair<int,int> findPosition(char c, vector<vector<char>> &matrix) {
    if (c == 'J') c = 'I'; // đổi J thành I
    for (int i = 0; i < 5; i++)
        for (int j = 0; j < 5; j++)
            if (matrix[i][j] == c)
                return {i, j};
    return {-1,-1};
}

// Chuẩn hóa bản rõ thành các cặp ký tự
string prepareText(string text) {
    string result = "";
    for (char c : text) {
        if (isalpha(c)) {
            result += toupper(c);
        }
    }
    // chèn X nếu gặp cặp giống nhau
    for (int i = 0; i < result.size(); i += 2) {
        if (i + 1 < result.size() && result[i] == result[i+1]) {
            result.insert(i+1, "X");
        }
    }
    // thêm X nếu lẻ ký tự
    if (result.size() % 2 != 0)
        result += 'X';
    return result;
}

// Mã hóa bằng Playfair
string encrypt(string text, vector<vector<char>> &matrix) {
    string cipher = "";
    text = prepareText(text);

    for (int i = 0; i < text.size(); i += 2) {
        auto [r1, c1] = findPosition(text[i], matrix);
        auto [r2, c2] = findPosition(text[i+1], matrix);

        if (r1 == r2) { // cùng hàng
            cipher += matrix[r1][(c1+1)%5];
            cipher += matrix[r2][(c2+1)%5];
        } else if (c1 == c2) { // cùng cột
            cipher += matrix[(r1+1)%5][c1];
            cipher += matrix[(r2+1)%5][c2];
        } else { // khác hàng và cột
            cipher += matrix[r1][c2];
            cipher += matrix[r2][c1];
        }
    }
    return cipher;
}

// Giải mã Playfair
string decrypt(string text, vector<vector<char>> &matrix) {
    string plain = "";
    for (int i = 0; i < text.size(); i += 2) {
        auto [r1, c1] = findPosition(text[i], matrix);
        auto [r2, c2] = findPosition(text[i+1], matrix);

        if (r1 == r2) { // cùng hàng
            plain += matrix[r1][(c1+4)%5];
            plain += matrix[r2][(c2+4)%5];
        } else if (c1 == c2) { // cùng cột
            plain += matrix[(r1+4)%5][c1];
            plain += matrix[(r2+4)%5][c2];
        } else { // khác hàng/cột
            plain += matrix[r1][c2];
            plain += matrix[r2][c1];
        }
    }
    return plain;
}

int main() {
    string key, text;
    cout << "Nhap khoa: ";
    getline(cin, key);

    auto matrix = generateKeyMatrix(key);

    cout << "Ma tran khoa:" << endl;
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++)
            cout << matrix[i][j] << " ";
        cout << endl;
    }

    cout << "\nNhap ban ro: ";
    getline(cin, text);

    string cipher = encrypt(text, matrix);
    cout << "Ban ma: " << cipher << endl;

    cout << "Giai ma: " << decrypt(cipher, matrix) << endl;

    return 0;
}
