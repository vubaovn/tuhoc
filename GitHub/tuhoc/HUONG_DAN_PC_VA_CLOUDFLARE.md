# HƯỚNG DẪN SỬ DỤNG ỨNG DỤNG TDO-TUHOC v2.2

## Các nâng cấp ở Phiên bản v2.2
1. **Đã bỏ mục nhập file Excel (`.xlsx`), chỉ giữ lại nhập hàng loạt từ file CSV (`.csv`)**:
   - Giao diện gọn gàng, ổn định 100%, hỗ trợ tải trực tiếp file mẫu `Mau_Danh_Sach_Hoc_Sinh_TUHOC_v2.2.csv` (chuẩn UTF-8 mở bằng Excel hoặc Notepad) và nạp hàng loạt tài khoản học sinh từ file `.csv`.
2. **Bổ sung mục "4. Cấu trúc đề & Tính điểm" khi Giáo viên nạp đề gốc**:
   - Ngay khi Giáo viên chọn file đề gốc `.docx`, hệ thống **tự động đếm số câu từng phần** (Phần 1, Phần 2, Phần 3) và **điền sẵn gợi ý mức điểm chuẩn**:
     - **Phần 1 (nhiều lựa chọn)**: Số câu tự đếm + Điểm mỗi câu gợi ý `0.25`.
     - **Phần 2 (đúng/sai)**: Số câu tự đếm + Điểm đúng 1 ý (`0.1`), 2 ý (`0.25`), 3 ý (`0.5`), 4 ý (`1.0`).
     - **Phần 3 (điền số)**: Số câu tự đếm + Điểm mỗi câu gợi ý `0.5`.
   - Giáo viên có thể chỉnh sửa trực tiếp số câu (nhập `0` nếu không có phần đó) và sửa điểm số mỗi câu ngay trong quá trình nạp đề gốc.
   - Hệ thống tự động tính tổng điểm cấu trúc đề, nhúng cấu hình điểm vào Link/File giao bài và chấm điểm học sinh chính xác theo mức điểm Giáo viên đã thiết lập.
3. **Bảo mật Khu vực Giáo viên & Phân quyền Lớp học**:
   - Toàn bộ khu vực Giáo viên được khóa sau màn hình **Đăng nhập / Tạo tài khoản Giáo viên**.
   - Mỗi Giáo viên quản lý Lớp học, danh sách tài khoản Học sinh và Bảng điểm riêng của lớp mình.
