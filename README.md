# K58_BAO_MAT_B1
BÀI TẬP 1:
TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN
Caesar
Affine
Hoán vị
Vigenère
Playfair
Với mỗi phương pháp, hãy tìm hiểu:

Tên gọi
Thuật toán mã hoá, thuật toán giải mã
Không gian khóa
Cách phá mã (mà không cần khoá)
Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript
====================================================================  
#Tên gọi: Mật mã Caesar.

Nguyên lý: Mỗi chữ cái trong bản rõ sẽ được dịch chuyển đi một số bước nhất định trong bảng chữ cái.

Mã hóa: Lấy vị trí chữ cái trong bản rõ cộng với khóa rồi lấy phần dư chia cho 26 để ra chữ cái trong bản mã.

Giải mã: Lấy vị trí chữ cái trong bản mã trừ đi khóa, cộng thêm 26 nếu âm, rồi chia dư cho 26 để ra chữ cái gốc.

Không gian khóa: 26 (từ 0 đến 25).

Cách phá mã: Thử tất cả 26 khóa (brute force).  
#Hình ảnh kiểm thử 
Mã hóa:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a243c8db-82de-4acc-aea9-b6258323297f" />  

Giải mã:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6854814b-49e3-4cfb-bd5b-e105c4f59dca" />  




