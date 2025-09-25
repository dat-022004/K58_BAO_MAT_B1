#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

/*
    Thuật toán Affine Cipher:
    - Công thức mã hóa:    C = (a*P + b) mod 26
    - Công thức giải mã:   P = a^(-1) * (C - b) mod 26
    Trong đó:
      + P: ký tự gốc (plaintext)
      + C: ký tự mã hóa (ciphertext)
      + a, b: khóa (a phải nguyên tố cùng nhau với 26)
      + a^(-1): nghịch đảo modular của a theo mod 26
*/

// Hàm tính GCD (ước chung lớn nhất)
int gcd(int a, int b) {
    return (b == 0) ? a : gcd(b, a % b);
}

// Hàm tìm nghịch đảo modular của a theo mod m (dùng brute force)
int modInverse(int a, int m) {
    a = a % m;
    for (int x = 1; x < m; x++) {
        if ((a * x) % m == 1) return x;
    }
    return -1; // không tồn tại nghịch đảo
}

// Hàm mã hóa Affine
string affineEncrypt(string text, int a, int b) {
    string result = "";
    for (char c : text) {
        if (isupper(c)) {
            // 'A' = 65 → 0, ..., 'Z' = 90 → 25
            result += char(((a * (c - 'A') + b) % 26) + 'A');
        } else if (islower(c)) {
            result += char(((a * (c - 'a') + b) % 26) + 'a');
        } else {
            result += c; // giữ nguyên ký tự không phải chữ
        }
    }
    return result;
}

// Hàm giải mã Affine
string affineDecrypt(string text, int a, int b) {
    string result = "";
    int a_inv = modInverse(a, 26); // tính nghịch đảo của a theo mod 26

    if (a_inv == -1) {
        return "Loi: khong ton tai nghich dao cua a, hay chon khoa khac!";
    }

    for (char c : text) {
        if (isupper(c)) {
            result += char((a_inv * ((c - 'A' - b + 26)) % 26) + 'A');
        } else if (islower(c)) {
            result += char((a_inv * ((c - 'a' - b + 26)) % 26) + 'a');
        } else {
            result += c;
        }
    }
    return result;
}

int main() {
    string plaintext, ciphertext;
    int a, b;

    cout << "=== MA HOA AFFINE ===" << endl;
    cout << "Nhap chuoi can ma hoa: ";
    getline(cin, plaintext);

    cout << "Nhap khoa a (nguyen to cung nhau voi 26): ";
    cin >> a;
    cout << "Nhap khoa b: ";
    cin >> b;

    // Kiểm tra điều kiện của a
    if (gcd(a, 26) != 1) {
        cout << "Khoa a khong hop le! a phai nguyen to cung nhau voi 26." << endl;
        return 0;
    }

    ciphertext = affineEncrypt(plaintext, a, b);
    cout << "Ban ma: " << ciphertext << endl;

    cin.ignore(); // clear buffer
    cout << "\n=== GIAI MA AFFINE ===" << endl;
    cout << "Nhap chuoi can giai ma: ";
    getline(cin, ciphertext);

    cout << "Nhap khoa a: ";
    cin >> a;
    cout << "Nhap khoa b: ";
    cin >> b;

    string decrypted = affineDecrypt(ciphertext, a, b);
    cout << "Ban ro: " << decrypted << endl;

    return 0;
}
