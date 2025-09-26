TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN<br>
1.Caesar<br>
2.Affine<br>
3.Hoán vị<br>
4.Vigenère<br>
5.Playfair<br>

Với mỗi phương pháp, hãy tìm hiểu:<br>
- Tên gọi<br>
- Thuật toán mã hoá, thuật toán giải mã<br>
- Không gian khóa<br>
- Cách phá mã (mà không cần khoá)<br>
- Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript<br><br><br>


**1. Caesar cipher (Dịch Caesar**)
- Tên gọi:

   + Caesar cipher (một dạng dịch chữ theo dịch chuyển vòng) — tác giả nổi tiếng: Julius Caesar.

 - Thuật toá:

    + Mã hóa: với khóa k (0..25), mỗi ký tự P chuyển thành C = (P + k) mod 26
    + Giải mã: P = (C - k mod 26).

(Áp dụng chỉ cho chữ cái, giữ nguyên khoảng trắng/ký tự khác nếu muốn.)

- Không gian khóa:

  + 26 khóa (k = 0..25). Thực tế chỉ 25 hiệu lực (k=0 là danh nghĩa).

- Cách phá: (không cần khóa)

  + Brute-force: thử 26 giá trị, chọn kết quả có nghĩa.

  + Phân tích tần suất: dịch thử sao cho tần suất chữ cái xuất hiện phù hợp với E/T/A... trong tiếng Anh.
 
    
* **Mã Hóa:**<br>
      + <img width="964" height="879" alt="image" src="https://github.com/user-attachments/assets/3f0196f3-6b6f-4352-a70b-2bf1d3728676" />
* **Giải mã:**<br>
      + <img width="915" height="928" alt="image" src="https://github.com/user-attachments/assets/c0130161-4223-4e93-a7cf-a53a15e9ed36" />

**2) Affine**
- Tên:

  + Affine cipher — ánh xạ affine trên Z26.

- Thuật toán:

  + Đại diện ký tự bằng x = 0..25.

  + Mã hoá: E(x) = (a*x + b) mod 26, với gcd(a,26)=1.

  + Giải mã: cần a_inv (ngược modulo 26), D(y) = a_inv * (y - b) mod 26.

- Không gian khoá:

  + a phải là nguyên tố cùng nhau với 26 → có φ(26)=12 lựa chọn cho a (a ∈ {1,3,5,7,9,11,15,17,19,21,23,25}).

  + b có 26 lựa chọn. Tổng: 12 × 26 = 312 tổ hợp.

- Cách phá (không cần khoá):

  + Brute-force trên 312 cặp (a,b).

  + Phân tích tần suất kết hợp với thử a,b.

  + Nếu có mẫu/tiếng phổ biến (ví dụ 'E' hay 'TH'...), suy ra a,b.

**Mã Hóa:**<br>
  + <img width="673" height="681" alt="image" src="https://github.com/user-attachments/assets/8be18ac1-7c77-4c25-b3e8-075cc07bf199" />
**Giải Mã:**<br>
  + <img width="703" height="626" alt="image" src="https://github.com/user-attachments/assets/73594822-2bc4-421d-8cde-bb406e67b4e9" />

**3) Hoán vị (Permutation cipher — Simple substitution by permutation)**
- Giải thích: "Hoán vị" có thể hiểu là monoalphabetic substitution (gán mỗi chữ cái một chữ cái khác theo một hoán vị của 26 chữ cái). (Nếu bạn ý là transposition (hoán vị vị trí) hoặc columnar transposition, mình có thể bổ sung.)

- Thuật toán:

  + Mã hoá: có khoá là một hoán vị perm của 26 chữ cái; cho ký tự c, thay bằng perm[c-'A'].

  + Giải mã: đảo hoán vị (mapping ngược).

- Không gian khoá:

  + 26! hoán vị (rất lớn) — nhưng thực tế bị tấn công bằng phân tích tần suất.

- Cách phá:

  + Phân tích tần suất (monoalphabetic substitution dễ bị phân tích tần suất).

  + Công cụ suy đoán từ (pattern matching), giải mã bán tự động bằng thuật toán tối ưu hoá (simulated annealing) hoặc dùng từ vựng.

* **Mã Hóa:**<br>
      +<img width="539" height="523" alt="image" src="https://github.com/user-attachments/assets/be1b1157-5b9e-4636-87dc-24a63b16d6a1" />

* **Giải mã:**<br>
      + <img width="670" height="523" alt="image" src="https://github.com/user-attachments/assets/462f0486-a8d0-4071-81da-d2e6fe44ad20" />



**4) Vigenère**
- Tên:

  + Vigenère cipher — chìa khoá là từ (polyalphabetic Caesar).

- Thuật toán:

  + Mã hoá: có khóa K = k0 k1 ... km-1 (chữ), với plaintext P = p0 p1 .... Cho mỗi vị trí i: E(pi) = (pi + k_{i mod m}) mod 26.

  + Giải mã: D(ci) = (ci - k_{i mod m} + 26) mod 26.

- Không gian khoá:

  + Với khóa dài m: 26^m. Nếu khóa ngắn thì rủi ro.

- Cách phá:

  + Kasiski và Friedman test để xác định độ dài khóa m.

  + Khi biết m, chia ciphertext thành m chuỗi rồi dùng phân tích tần suất như Caesar trên từng chuỗi.

  + Brute-force cho m nhỏ hoặc nếu khóa ngắn.

* **Mã Hóa:**<br>
      + <img width="547" height="503" alt="image" src="https://github.com/user-attachments/assets/f37e5db7-e7a3-443c-a05b-d49bee83b04d" />

* **Giải mã:**<br>
      + <img width="521" height="485" alt="image" src="https://github.com/user-attachments/assets/447f24e9-1fb8-46af-aad6-0386fbbd3b5c" />



**5) Playfair**
- Tên: 

  + Playfair cipher — dùng ma trận 5×5, mã hoá theo cặp (digraph).

  + Ma trận & quy ước

  + Tạo ma trận 5×5 từ khóa (loại trùng) + phần còn lại của bảng chữ cái.

  + Quy ước: I và J được gộp chung (thay J bằng I).

  + Tiền xử lý plaintext: tách thành cặp; nếu hai chữ cùng cặp nhau thì chèn X (hoặc ký tự filler), nếu độ dài lẻ thì thêm filler.

- Thuật toán: 

  + Với cặp (A,B) áp dụng luật:

  + Nếu A và B cùng hàng → thay mỗi chữ bằng chữ bên phải tiếp theo (mã hoá), ngược lại (giải mã) lấy bên trái.

  + Nếu cùng cột → thay bằng chữ bên dưới (mã hoá), ngược lại lấy bên trên.

  + Nếu khác hàng và cột → thay mỗi chữ bằng chữ cùng hàng nhưng cột của chữ kia (tạo hình chữ nhật).

- Không gian khoá:

  + Không gian khoá tương ứng với mọi ma trận 5×5 → xấp xỉ 25! hoán vị, nhưng thực tế bị hạn chế vì cấu trúc digraph.

- Cách phá: 

  + Tấn công phân tích digram: tần suất digram (2-chữ) chứ không phải đơn chữ.

  + Dùng thuật toán tối ưu hoá để dò ma trận khóa.

* **Mã Hóa:**<br>
      + <img width="583" height="560" alt="image" src="https://github.com/user-attachments/assets/6b309019-3256-44bd-8c16-3a1baa350ae8" />

* **Giải mã:**<br>
      + <img width="566" height="499" alt="image" src="https://github.com/user-attachments/assets/2b8bf83f-46ce-49b3-988c-e531225f95c7" />


