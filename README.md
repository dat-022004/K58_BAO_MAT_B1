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
# Tên gọi: Mật mã Caesar.

Nguyên lý: Mỗi chữ cái trong bản rõ sẽ được dịch chuyển đi một số bước nhất định trong bảng chữ cái.

Mã hóa: Lấy vị trí chữ cái trong bản rõ cộng với khóa rồi lấy phần dư chia cho 26 để ra chữ cái trong bản mã.

Giải mã: Lấy vị trí chữ cái trong bản mã trừ đi khóa, cộng thêm 26 nếu âm, rồi chia dư cho 26 để ra chữ cái gốc.

Không gian khóa: 26 (từ 0 đến 25).

Cách phá mã: Thử tất cả 26 khóa (brute force).  
# Hình ảnh kiểm thử  
# Mã hóa:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a243c8db-82de-4acc-aea9-b6258323297f" />  

# Giải mã:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6854814b-49e3-4cfb-bd5b-e105c4f59dca" />  

# Tên gọi: Mật mã Affine.

Nguyên lý: Mỗi chữ cái trong bản rõ được biến đổi tuyến tính bằng hai tham số khóa là a và b.

Mã hóa: Nhân vị trí chữ cái trong bản rõ với a rồi cộng b, sau đó lấy phần dư chia 26 để ra chữ cái trong bản mã.

Giải mã: Lấy vị trí chữ cái trong bản mã trừ b, sau đó nhân với nghịch đảo của a (theo modulo 26), rồi lấy phần dư chia 26 để ra chữ cái gốc.

Không gian khóa: 312 (có 12 giá trị hợp lệ của a nhân với 26 giá trị của b).

Cách phá mã: Dùng phân tích tần suất hoặc thử brute force toàn bộ 312 khóa.  
# Hình ảnh kiểm thử  
# Mã hóa:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/83968058-8e04-4770-843f-617f2d6617ee" />  

# Giải mã:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/81a461e0-abdd-46e7-a062-7ba66916e6e1" />  

#  Tên gọi: Mật mã hoán vị.

Nguyên lý: Không thay đổi chữ cái, chỉ thay đổi vị trí của chúng theo một khóa là một hoán vị.

Mã hóa: Sắp xếp lại các chữ cái theo thứ tự được chỉ định bởi khóa.

Giải mã: Sắp xếp ngược lại theo hoán vị đảo.

Không gian khóa: n! (n giai thừa), với n là số vị trí cần hoán đổi.

Cách phá mã: Với n nhỏ thì có thể brute force, với n lớn thì phân tích mẫu từ và tần suất để suy ra.  
# Hình ảnh kiểm thử  
# Mã hóa:  

# Giải mã:  






