# MathEdu Studio — Website Cá nhân Giáo viên Toán học THPT (Cloudflare Workers Static Assets)

Website cá nhân chuyên nghiệp dành cho giáo viên Toán học THPT, tích hợp kho chuyên đề Toán 10-11-12, thư viện đề thi PDF kèm hướng dẫn giải, phòng thí nghiệm vẽ đồ thị hàm số tương tác, trình hiển thị công thức KaTeX, công cụ tạo câu hỏi LaTeX `ex_test` và kho câu lệnh Gemini AI phục vụ giảng dạy.

---

## 1. Cấu trúc thư mục mã nguồn

Dự án được tổ chức rõ ràng, không phụ thuộc máy chủ riêng (Serverless Static), sẵn sàng triển khai trực tiếp lên **Cloudflare Workers Static Assets**:

```text
math-teacher-portal/
├── index.html                    # Giao diện chính với 7 khu vực chức năng & điều hướng URL Hash
├── wrangler.jsonc                # Cấu hình triển khai Cloudflare Workers Static Assets chuẩn mới nhất
├── package.json                  # Khai báo script chạy thử (wrangler dev) và xuất bản (wrangler deploy)
├── README.md                     # Tài liệu hướng dẫn sử dụng, chỉnh sửa và triển khai toàn diện
└── assets/
    ├── css/
    │   └── style.css             # Định kiểu giao diện hiện đại (tông xanh dương - trắng), hiệu ứng thẻ & responsive
    ├── js/
    │   └── app.js                # Logic điều hướng Hash, lọc tài liệu, vẽ đồ thị, KaTeX, tạo mã ex_test & CMS
    ├── images/
    │   └── hero-banner.jpg       # Hình ảnh minh họa Banner trang chủ
    └── documents/                # Thư mục chứa các file đề thi & chuyên đề PDF thực tế
        ├── de-thi-thu-tot-nghiep-thpt-2026-so-1.pdf
        ├── chuyen-de-khao-sat-ham-so-toan-12.pdf
        ├── chuyen-de-nguyen-ham-tich-phan-ung-dung.pdf
        ├── de-kiem-tra-giua-ky-1-toan-11.pdf
        ├── de-cuong-on-tap-hoc-ky-1-toan-10.pdf
        ├── so-tay-cong-thuc-xac-suat-thong-ke-thpt.pdf
        └── mau-de-thi-latex-ex-test-chuan-2025.pdf
```

---

## 2. Hướng dẫn chỉnh sửa nội dung (3 cách linh hoạt)

### Cách 1: Chỉnh sửa trực tiếp trên giao diện Website (Nhanh nhất)
1. Cuộn xuống mục **Bảng Điều khiển Cập nhật Nội dung Nhanh (Local CMS & JSON)** ngay phía trên phần Liên hệ.
2. Tại đây bạn có thể:
   - **Thêm tài liệu PDF / Đề thi mới**: Nhập tên đề, chọn Lớp (10, 11, 12), Loại tài liệu, Mức độ, đường dẫn file PDF và lời giải tóm tắt.
   - **Thay đổi Banner & Thông tin Giáo viên**: Đổi tiêu đề chính, mô tả phụ và họ tên giáo viên.
   - **Thêm Liên kết Ứng dụng bên ngoài**: Bổ sung các trang web hỗ trợ dạy học mới.
3. Dữ liệu sẽ tự động lưu vào trình duyệt (`localStorage`). Bạn có thể nhấn nút **"⬇ Xuất dữ liệu JSON (mathedu-site-data.json)"** để tải toàn bộ cấu hình về máy.

### Cách 2: Chỉnh sửa cố định trong file `assets/js/app.js`
Mở file `assets/js/app.js`, tìm đối tượng `DEFAULT_SITE_DATA` ở đầu file:
- **`siteInfo`**: Sửa tên website (`siteName`), thông tin giáo viên (`teacherName`, `teacherRole`, `teacherBio`), email, số điện thoại và trường công tác.
- **`newsUpdates`**: Thêm hoặc sửa các bản tin mới cập nhật trên trang chủ.
- **`mathTopics`**: Thêm/sửa các chuyên đề Toán học, công thức LaTeX (`formulaLatex`) và ví dụ minh họa (`exampleLatex`).
- **`documents`**: Thêm tài liệu PDF mới. Chỉ cần chép file `.pdf` của bạn vào thư mục `assets/documents/` rồi khai báo đường dẫn `fileUrl: 'assets/documents/ten-file-cua-ban.pdf'`.

### Cách 3: Thay đổi hình ảnh Banner
Chép ảnh mới của bạn đè lên file `assets/images/hero-banner.jpg` (khuyến nghị tỷ lệ `16:9`, kích thước khoảng `1280x720` hoặc `1376x768` để hiển thị sắc nét nhất).

---

## 3. Hướng dẫn chạy thử trên máy tính (Local Development)

Vì website sử dụng chuẩn HTML5/CSS3/JS tĩnh hoàn toàn, bạn có thể chạy thử bằng 1 trong 3 cách sau:

### Cách A: Dùng Visual Studio Code (Khuyên dùng)
1. Mở thư mục dự án trong **VS Code**.
2. Cài đặt tiện ích mở rộng **Live Server** (của Ritwick Dey).
3. Nhấp chuột phải vào file `index.html` → chọn **"Open with Live Server"**. Trình duyệt sẽ tự động mở tại `http://127.0.0.1:5500`.

### Cách B: Dùng Python có sẵn trên máy
Mở Terminal / Command Prompt tại thư mục dự án và chạy:
```bash
python3 -m http.server 8080
```
Sau đó mở trình duyệt truy cập `http://localhost:8080`.

### Cách C: Dùng Cloudflare Wrangler CLI (Mô phỏng giống hệt môi trường thật)
Nếu máy đã cài đặt [Node.js](https://nodejs.org/):
```bash
npm install
npx wrangler dev
```
Wrangler sẽ khởi chạy máy chủ cục bộ của Cloudflare Workers tại `http://localhost:8787`.

---

## 4. Hướng dẫn đưa mã nguồn lên GitHub

1. Đăng nhập tài khoản [GitHub](https://github.com/) và nhấn **New repository** để tạo kho chứa mới (ví dụ đặt tên: `mathedu-teacher-portal`).
2. Mở Terminal (hoặc Git Bash) tại thư mục dự án trên máy tính của bạn và chạy lần lượt các lệnh:

```bash
git init
git add .
git commit -m "Khởi tạo website cá nhân giáo viên Toán học THPT"
git branch -M main
git remote add origin https://github.com/<TEN_TAI_KHOAN_GITHUB_CUA_BAN>/mathedu-teacher-portal.git
git push -u origin main
```

---

## 5. Hướng dẫn triển khai trên Cloudflare Workers (Static Assets)

Dự án đã được cấu hình sẵn file `wrangler.jsonc` theo chuẩn [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/). Bạn có thể triển khai bằng 1 trong 2 phương thức:

### Phương thức 1: Kết nối tự động từ GitHub trên giao diện Web Cloudflare (Khuyên dùng)
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Ở menu bên trái, chọn **Compute (Workers)** → **Workers & Pages** → nhấn nút **Create**.
3. Chọn tab **Import a repository** → Kết nối tài khoản GitHub và chọn kho chứa `mathedu-teacher-portal` vừa tạo ở Mục 4.
4. Tại màn hình cấu hình Build:
   - **Project name**: Đặt tên tùy ý (ví dụ: `toan-thay-khoa` → tên miền miễn phí sẽ là `https://toan-thay-khoa.<subdomain>.workers.dev`).
   - **Build command**: Để trống (vì là HTML/CSS/JS thuần không cần biên dịch).
   - **Deploy command**: Giữ mặc định `npx wrangler deploy`.
5. Nhấn **Save and Deploy**. Sau khoảng 20–30 giây, website của bạn sẽ chính thức hoạt động trên mạng lưới toàn cầu của Cloudflare.

### Phương thức 2: Triển khai trực tiếp từ máy tính bằng dòng lệnh (Wrangler CLI)
1. Mở Terminal tại thư mục dự án, đăng nhập tài khoản Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Chạy lệnh xuất bản:
   ```bash
   npx wrangler deploy
   ```
   Ngay lập tức Wrangler sẽ tải toàn bộ thư mục tĩnh lên Cloudflare Workers và trả về đường dẫn `https://mathedu-teacher-portal.<ten-ban>.workers.dev`.

---

## 6. Hướng dẫn cập nhật Website sau khi xuất bản

Khi bạn muốn thêm đề thi PDF mới, cập nhật tin tức hoặc sửa giao diện:

1. **Bước 1**: Chép file PDF mới vào thư mục `assets/documents/` và thêm thông tin đề thi vào mảng `documents` trong `assets/js/app.js`.
2. **Bước 2**: Lưu file và kiểm tra nhanh trên máy tính.
3. **Bước 3**:
   - **Nếu dùng GitHub tích hợp tự động**: Chỉ cần chạy 3 lệnh Git quen thuộc:
     ```bash
     git add .
     git commit -m "Thêm đề thi thử THPT số 02"
     git push
     ```
     Cloudflare Workers sẽ tự động phát hiện thay đổi trên nhánh `main` và cập nhật website trong vòng 15 giây.
   - **Nếu dùng Wrangler CLI trực tiếp**: Chỉ cần chạy lại lệnh:
     ```bash
     npx wrangler deploy
     ```

---

## 7. Phân định Kiến trúc Frontend & Hướng mở rộng Cơ sở dữ liệu (Giai đoạn 2)

| Nhóm tính năng | Trạng thái hiện tại (Frontend Serverless) | Hướng nâng cấp Backend trên Cloudflare (Tùy chọn) |
| :--- | :--- | :--- |
| **Điều hướng `#hash`, Tìm kiếm & Lọc đề thi** | Hoạt động 100% tức thì trên trình duyệt | Không cần thay đổi (hoặc tìm kiếm toàn văn với Cloudflare D1) |
| **Vẽ đồ thị, giải PT, KaTeX, Tạo mã `ex_test`** | Hoạt động 100% ở phía trình duyệt (Client-side) | Không cần máy chủ |
| **Tải tài liệu PDF** | Phục vụ trực tiếp từ `assets/documents/` qua CDN | Khi kho đề vượt quá 1.000 file lớn, gắn thêm **Cloudflare R2** |
| **Thêm/sửa danh mục, tài liệu & Banner** | Lưu qua `localStorage` + Xuất file cấu hình JSON | Kết nối **Cloudflare D1 (SQLite)** kèm **Cloudflare Access** để bảo mật trang quản trị |
