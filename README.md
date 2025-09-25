# K58_BAO_MAT_B1
# BÀI TẬP 1:
# TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN  
Caesar  
Affine  
Hoán vị  
Vigenère  
Playfair  
# Với mỗi phương pháp, hãy tìm hiểu:  
Tên gọi  
Thuật toán mã hoá, thuật toán giải mã  
Không gian khóa  
Cách phá mã (mà không cần khoá)  
Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript  
# ============================

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
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/645b1347-ab73-4449-89fd-57091ac103b4" />  

# Giải mã:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/96ba6b4c-7161-45d0-a05d-33f191bf673c" />  

# Tên gọi: Mật mã Vigenère.

Nguyên lý: Dùng một chuỗi khóa lặp lại để dịch chuyển từng chữ cái trong bản rõ.

Mã hóa: Lấy vị trí chữ cái bản rõ cộng với vị trí chữ cái trong khóa, rồi lấy phần dư chia 26 để ra chữ cái bản mã.

Giải mã: Lấy vị trí chữ cái bản mã trừ đi vị trí chữ cái trong khóa, cộng thêm 26 nếu âm, rồi lấy phần dư chia 26 để ra chữ cái gốc.

Không gian khóa: 26 mũ độ dài khóa.

Cách phá mã: Dùng phương pháp Kasiski hoặc Friedman để đoán độ dài khóa, sau đó tách thành nhiều Caesar để phá.  
# Hình ảnh kiểm thử  
# Mã hóa:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/27462e2d-51e0-48e2-b39e-4304a564195a" />  

# Giải mã: 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fa3937cf-bec5-4e38-8750-def4b0a32af7" />  

# Tên gọi: Mật mã Playfair.

Nguyên lý: Mã hóa theo cặp chữ cái bằng bảng 5x5 sinh từ khóa (gộp I và J).

Nếu hai chữ cái cùng hàng → thay mỗi chữ bằng chữ bên phải nó.

Nếu hai chữ cái cùng cột → thay mỗi chữ bằng chữ phía dưới nó.

Nếu khác hàng và cột → thay mỗi chữ bằng chữ cùng hàng nhưng ở cột của chữ kia (hình chữ nhật).

Khi chuẩn bị bản rõ: nếu hai chữ cái trong một cặp trùng nhau thì chèn chữ X vào giữa, nếu số chữ lẻ thì thêm X ở cuối.

Không gian khóa: xấp xỉ 25! (rất lớn).

Cách phá mã: Dùng phân tích tần suất cặp chữ cái (digraph frequency analysis).  
# Hình ảnh kiểm thử  
# Mã hóa:  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8b21359d-63db-4467-8a57-45761be090d7" />  

# Giải mã: 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a8bc1bfc-9d42-4555-a4e0-5b622c9a805a" />

# Các thuật toán mã hoá cổ điển như Caesar, Affine, Hoán vị, Vigenère và Playfair đều đóng vai trò quan trọng trong lịch sử phát triển của mật mã học. Mặc dù ngày nay chúng đã trở nên đơn giản và không còn an toàn trước các kỹ thuật phá mã hiện đại, nhưng lại có giá trị lớn về mặt giáo dục và lý thuyết.

# Điểm chung:

Dựa trên những nguyên tắc toán học cơ bản như dịch chuyển, đồng dư, hoán vị và tổ hợp.

Biến đổi bản rõ (plaintext) thành bản mã (ciphertext) thông qua khóa.

Có thể được giải mã thủ công hoặc bằng các phương pháp thống kê, tần suất chữ cái.

# Điểm khác nhau:

Caesar: đơn giản nhất, chỉ dịch chuyển theo một số bước.

Affine: kết hợp phép nhân và cộng để tăng độ phức tạp.

Hoán vị: thay đổi trật tự ký tự mà không thay đổi bản thân ký tự.

Vigenère: dùng khóa nhiều ký tự → tránh được phần nào phân tích tần suất.

Playfair: mã hóa theo cặp chữ cái, che giấu tần suất đơn chữ tốt hơn.

# Ý nghĩa thực tiễn:

Dù không còn dùng trong an ninh hiện đại, chúng chính là nền tảng cho các thuật toán mật mã hiện đại như RSA, AES, DES.

Giúp sinh viên và nhà nghiên cứu hiểu rõ hơn về tư duy bảo mật, nguyên tắc mã hóa – giải mã.

Là bước đệm để học các phương pháp mã hóa phức tạp hơn.








