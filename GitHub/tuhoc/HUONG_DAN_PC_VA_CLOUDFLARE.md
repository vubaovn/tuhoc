# HƯỚNG DẪN SỬ DỤNG & ĐỒNG BỘ CSDL ĐA THIẾT BỊ TDO-TUHOC v2.3

## 1. Giải thích vì sao bản cũ tạo tài khoản trên Windows 11 nhưng mở Điện thoại không đăng nhập được?
- Ở các bản trước, ứng dụng chạy thuần tĩnh và chỉ lưu dữ liệu trong `localStorage` của trình duyệt trên chiếc máy tính Windows 11 đó. Khi bạn mở điện thoại truy cập `https://tuhoc.vubao.workers.dev/`, trình duyệt trên điện thoại có bộ nhớ riêng nên không thấy dữ liệu đã tạo trên máy tính.

## 2. Cách đồng bộ CSDL đa thiết bị (Windows 11 + Điện thoại + Máy tính Học sinh) ở Bản v2.3
Trong gói **`tuhoc_v2.3_full_package.zip`** đã tích hợp sẵn **3 phương thức lưu trữ CSDL**:

### Cách A (Đơn giản nhất - Không cần cấu hình KV hay PHP):
1. Bạn mở trang web trên máy tính Windows 11, tạo Tài khoản Giáo viên, tạo Lớp, nạp danh sách Học sinh từ file `.csv` và nạp Đề gốc `.docx` (kèm chỉnh điểm).
2. Bấm nút **"💾 CSDL Web"** ở góc trên bên phải -> chọn **"📦 Xuất file index.html (Đã nhúng sẵn toàn bộ CSDL)"** (hoặc tải file **`tuhoc_database.json`**).
3. Up file `index.html` (hoặc `tuhoc_database.json`) đó lên `tuhoc.vubao.workers.dev`. Ngay lập tức mọi điện thoại và máy tính truy cập `https://tuhoc.vubao.workers.dev/` đều có sẵn 100% Tài khoản Giáo viên, Tài khoản Học sinh và Đề thi!

### Cách B (Tự động đồng bộ 2 chiều thời gian thực trên Cloudflare `tuhoc.vubao.workers.dev`):
1. Trong gói ZIP đã có sẵn file **`_worker.js`**. Bạn đẩy toàn bộ thư mục (gồm `index.html`, `tuhoc_database.json`, `_worker.js`) lên Cloudflare Pages / Workers.
2. Trên `dash.cloudflare.com`, vào **Workers & Pages -> KV**, tạo một KV tên là `TUHOC_DB` và gắn (Bind) biến `TUHOC_DB` vào dự án.
3. Khi đó mọi thao tác tạo tài khoản GV/HS, nạp đề hay học sinh nộp bài trên bất kỳ điện thoại/máy tính nào đều tự động lưu thẳng vào CSDL đám mây qua API `/api/db`!

### Cách C (Chạy trên Hosting PHP):
- Giải nén gói ZIP lên Hosting PHP (có sẵn file `api_db.php` và `tuhoc_database.json`). Mọi dữ liệu sẽ tự động ghi trực tiếp vào file `tuhoc_database.json` trên host.

## 3. Xem chi tiết bài làm của Học sinh (Bản v2.3)
- Khi Giáo viên bấm **"🔍 Xem bài làm"**, hộp thoại chi tiết sẽ hiển thị đầy đủ:
  - Nội dung câu hỏi và công thức Toán KaTeX.
  - Toàn bộ 4 phương án `A, B, C, D` (Phần 1), từng ý `a, b, c, d` (Phần 2), hoặc câu trả lời ngắn (Phần 3) kèm đánh dấu rõ phương án Học sinh đã chọn và Đáp án đúng.
  - Nút **"📖 Hiện lời giải chi tiết"** ở từng câu cụ thể (và nút **"📖 Hiện tất cả lời giải chi tiết"** trên thanh tiêu đề hộp thoại).
