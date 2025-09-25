#include <iostream>
#include <string>
using namespace std;

/*
    Vigenère Cipher:
    - Khóa là một chuỗi ký tự.
    - Mã hóa: mỗi chữ cái của bản rõ được dịch chuyển theo chữ cái tương ứng của khóa.
    - Giải mã: dịch ngược lại theo khóa.
*/

// Hàm chuẩn hóa ký tự (chỉ giữ A-Z)
char toUpperChar(char c) {
    if (c >= 'a' && c <= 'z')
        return c - 'a' + 'A';
    return c;
}

// Mở rộng khóa cho đủ độ dài bản rõ
string generateKey(string text, string key) {
    int x = text.size();
    for (int i = 0; ; i++) {
        if (key.size() == x)
            break;
        key.push_back(key[i % key.size()]);
    }
    return key;
}

// Hàm mã hóa Vigenère
string encrypt(string text, string key) {
    string cipher_text = "";
    for (int i = 0; i < text.size(); i++) {
        char p = toUpperChar(text[i]);
        char k = toUpperChar(key[i]);
        if (p >= 'A' && p <= 'Z') {
            char c = ((p - 'A') + (k - 'A')) % 26 + 'A';
            cipher_text.push_back(c);
        } else {
            cipher_text.push_back(text[i]); // giữ nguyên ký tự khác
        }
    }
    return cipher_text;
}

// Hàm giải mã Vigenère
string decrypt(string cipher_text, string key) {
    string orig_text = "";
    for (int i = 0; i < cipher_text.size(); i++) {
        char c = toUpperChar(cipher_text[i]);
        char k = toUpperChar(key[i]);
        if (c >= 'A' && c <= 'Z') {
            char p = ((c - 'A') - (k - 'A') + 26) % 26 + 'A';
            orig_text.push_back(p);
        } else {
            orig_text.push_back(cipher_text[i]); // giữ nguyên ký tự khác
        }
    }
    return orig_text;
}

int main() {
    string text, key;

    cout << "=== MA HOA VIGENERE ===" << endl;
    cout << "Nhap ban ro: ";
    getline(cin, text);

    cout << "Nhap khoa: ";
    cin >> key;

    key = generateKey(text, key);
    string cipher_text = encrypt(text, key);

    cout << "Ban ma: " << cipher_text << endl;

    cout << "\n=== GIAI MA VIGENERE ===" << endl;
    cout << "Nhap khoa: ";
    cin >> key;
    key = generateKey(cipher_text, key);
    cout << "Ban ro: " << decrypt(cipher_text, key) << endl;

    return 0;
}
