#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

/*
    Columnar Transposition Cipher:
    - Bản rõ được viết theo hàng vào 1 bảng (số cột = độ dài khóa).
    - Khóa là 1 dãy số (ví dụ: 4312567), chỉ ra thứ tự đọc các cột.
    - Mã hóa: đọc bảng theo cột, theo thứ tự trong khóa.
    - Giải mã: điền ciphertext theo cột, theo thứ tự khóa → đọc lại theo hàng.
*/

// Hàm loại bỏ khoảng trắng (cho dễ xử lý)
string removeSpaces(string text) {
    string result = "";
    for (char c : text) {
        if (c != ' ') result += c;
    }
    return result;
}

// Mã hóa bằng Columnar Transposition
string encrypt(string plaintext, string key) {
    plaintext = removeSpaces(plaintext);
    int col = key.length();
    int row = (plaintext.length() + col - 1) / col; // số hàng

    // Tạo bảng
    vector<vector<char>> table(row, vector<char>(col, 'X')); // điền X nếu thiếu

    // Điền bản rõ vào bảng theo hàng
    int k = 0;
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            if (k < plaintext.length()) {
                table[i][j] = plaintext[k++];
            }
        }
    }

    // Tạo thứ tự cột dựa vào khóa
    vector<pair<int, int>> order;
    for (int i = 0; i < col; i++) {
        order.push_back({key[i] - '0', i}); // (giá trị, vị trí cột)
    }
    sort(order.begin(), order.end()); // sắp xếp theo giá trị khóa

    // Đọc cột theo thứ tự khóa
    string ciphertext = "";
    for (auto p : order) {
        int j = p.second; // vị trí cột
        for (int i = 0; i < row; i++) {
            ciphertext += table[i][j];
        }
    }
    return ciphertext;
}

// Giải mã bằng Columnar Transposition
string decrypt(string ciphertext, string key) {
    int col = key.length();
    int row = (ciphertext.length() + col - 1) / col;

    // Tạo thứ tự cột dựa vào khóa
    vector<pair<int, int>> order;
    for (int i = 0; i < col; i++) {
        order.push_back({key[i] - '0', i});
    }
    sort(order.begin(), order.end());

    // Tạo bảng rỗng
    vector<vector<char>> table(row, vector<char>(col, 'X'));

    // Điền ciphertext theo thứ tự cột
    int k = 0;
    for (auto p : order) {
        int j = p.second; // vị trí cột
        for (int i = 0; i < row; i++) {
            if (k < ciphertext.length()) {
                table[i][j] = ciphertext[k++];
            }
        }
    }

    // Đọc theo hàng để lấy plaintext
    string plaintext = "";
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            plaintext += table[i][j];
        }
    }
    return plaintext;
}

int main() {
    string plaintext, ciphertext, key;

    cout << "=== MA HOA HOAN VI (COLUMNAR) ===" << endl;
    cout << "Nhap ban ro: ";
    getline(cin, plaintext);

    cout << "Nhap khoa (VD: 4312567): ";
    cin >> key;

    ciphertext = encrypt(plaintext, key);
    cout << "Ban ma: " << ciphertext << endl;

    cout << "\n=== GIAI MA HOAN VI (COLUMNAR) ===" << endl;
    cout << "Nhap ban ma: ";
    cin >> ciphertext;

    cout << "Nhap khoa: ";
    cin >> key;

    string decrypted = decrypt(ciphertext, key);
    cout << "Ban ro: " << decrypted << endl;

    return 0;
}
