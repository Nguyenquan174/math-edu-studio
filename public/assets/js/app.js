/**
 * MathEdu Studio - Logic Ứng dụng Frontend & Quản lý Nội dung (assets/js/app.js)
 * Tương thích hoàn toàn với Cloudflare Workers Static Assets
 * Không phụ thuộc máy chủ riêng, sử dụng KaTeX và Chart.js
 */

const STORAGE_KEY = 'mathedu_portal_cms_v1';

// Dữ liệu gốc mặc định (Chuẩn hóa cho chương trình Toán THPT GDPT 2018)
const DEFAULT_SITE_DATA = {
  siteInfo: {
    siteName: 'MathEdu Studio',
    tagline: 'Chuyên trang Toán học THPT, LaTeX & Ứng dụng AI Giáo dục',
    bannerBadge: 'Hệ sinh thái Học tập & Giảng dạy Toán THPT 2026',
    bannerTitle: 'Khơi nguồn Tư duy Toán học & Công nghệ Giáo dục Hiện đại',
    bannerSubtitle: 'Kho học liệu số chuẩn chương trình GDPT 2018, hệ thống đề thi cấu trúc mới, công cụ vẽ đồ thị trực quan, tiện ích soạn thảo LaTeX ex_test và trợ lý AI dành cho giáo viên & học sinh THPT.',
    teacherName: 'Thầy Nguyễn Minh Khoa, ThS.',
    teacherRole: 'Giáo viên Toán THPT Chuyên • Chuyên gia LaTeX & EdTech',
    teacherExp: '12+ năm kinh nghiệm bồi dưỡng HSG & luyện thi Tốt nghiệp THPT',
    teacherBio: 'Tốt nghiệp Thạc sĩ Phương pháp Toán sơ cấp, đam mê ứng dụng lập trình mã nguồn mở, hệ thống chế bản tài liệu LaTeX/LuaLaTeX và Trí tuệ nhân tạo (Gemini AI) nhằm tối ưu hóa việc dạy và học Toán học ở bậc Trung học Phổ thông.',
    teacherPhilosophy: '“Toán học không chỉ là những con số hay công thức khô khan, mà là nghệ thuật rèn luyện tư duy logic, khả năng mô hình hóa và giải quyết vấn đề thực tiễn.”',
    contactEmail: 'khoa.nguyen.math@edu.vn',
    contactPhone: '0988 654 321',
    contactSchool: 'Tổ Toán - Tin, Trường THPT Chuyên Lê Quý Đôn',
    contactLocation: 'Thành phố Bắc Ninh, Tỉnh Bắc Ninh'
  },

  newsUpdates: [
    {
      id: 'news-1',
      date: '15/11/2026',
      tag: 'Đề thi mới',
      title: 'Cập nhật Bộ 10 Đề thi thử Tốt nghiệp THPT 2026 theo cấu trúc định dạng mới (3 phần)',
      summary: 'Đầy đủ 12 câu trắc nghiệm 4 lựa chọn, 4 câu trắc nghiệm Đúng/Sai và 6 câu Trả lời ngắn kèm lời giải chi tiết bằng mã nguồn ex_test.',
      targetHash: '#tai-lieu'
    },
    {
      id: 'news-2',
      date: '10/11/2026',
      tag: 'LaTeX & LuaLaTeX',
      title: 'Ra mắt tiện ích chuyển đổi văn bản thô sang cấu trúc gói ex_test tự động ngay trên trình duyệt',
      summary: 'Hỗ trợ giáo viên tạo nhanh câu hỏi trắc nghiệm 4 phương án, câu hỏi Đúng/Sai (\\choiceTF) và câu hỏi trả lời ngắn (\\shortans).',
      targetHash: '#latex'
    },
    {
      id: 'news-3',
      date: '02/11/2026',
      tag: 'AI Giáo dục',
      title: 'Bộ thư viện Prompt Gemini 2.5 chuyên biệt thiết kế bài toán thực tế & kiểm tra lỗi lời giải',
      summary: 'Hướng dẫn từng bước cách dùng Gemini tạo bài toán tối ưu hóa thực tiễn (Lớp 12) và sinh mã TikZ vẽ hình không gian.',
      targetHash: '#cong-nghe'
    }
  ],

  mathTopics: [
    {
      id: 'cat-dai-so',
      slug: 'dai-so',
      name: 'Đại số & Tổ hợp',
      grade: 'Lớp 10 - 11',
      icon: '∑',
      color: 'blue',
      description: 'Mệnh đề, tập hợp, bất phương trình bậc nhất hai ẩn (quy hoạch tuyến tính), dãy số, cấp số cộng, cấp số nhân và nhị thức Newton.',
      formulaLatex: '(a + b)^n = \\sum_{k=0}^{n} C_n^k a^{n-k} b^k, \\quad u_n = u_1 + (n-1)d',
      keyPoints: [
        'Giải bài toán tối ưu bằng miền nghiệm hệ bất phương trình bậc nhất hai ẩn',
        'Công thức số hạng tổng quát và tổng n số hạng đầu của CSC, CSN',
        'Khai triển nhị thức Newton (n ≤ 5) và bài toán đếm tổ hợp'
      ],
      exampleTitle: 'Ví dụ: Tìm số hạng không chứa x trong khai triển',
      exampleLatex: 'P(x) = \\left(2x - \\frac{1}{x}\\right)^4 = \\sum_{k=0}^{4} C_4^k (2x)^{4-k} (-1)^k x^{-k} \\Rightarrow 4 - 2k = 0 \\Leftrightarrow k = 2 \\Rightarrow T_3 = 24.'
    },
    {
      id: 'cat-ham-so',
      slug: 'ham-so',
      name: 'Hàm số & Đồ thị',
      grade: 'Lớp 10 - 12',
      icon: 'ƒ(x)',
      color: 'indigo',
      description: 'Hàm số bậc hai, hàm số lượng giác, hàm số mũ - lôgarit, khảo sát sự biến thiên và vẽ đồ thị hàm bậc ba, hàm phân thức hữu tỉ.',
      formulaLatex: 'y = \\frac{ax^2 + bx + c}{mx + n}, \\quad \\lim_{x \\to x_0^\\pm} f(x) = \\pm\\infty',
      keyPoints: [
        'Xác định tính đơn điệu, điểm cực đại, cực tiểu từ bảng xét dấu đạo hàm',
        'Tìm đường tiệm cận đứng, tiệm cận ngang và tiệm cận xiên của đồ thị hàm số',
        'Nhận diện đồ thị hàm số và biện luận số nghiệm phương trình bằng tương giao'
      ],
      exampleTitle: 'Ví dụ: Tiệm cận xiên của hàm phân thức bậc hai trên bậc nhất',
      exampleLatex: 'y = \\frac{x^2 + 2x + 3}{x + 1} = x + 1 + \\frac{2}{x + 1} \\Rightarrow \\text{TCX: } y = x + 1, \\text{ TCĐ: } x = -1.'
    },
    {
      id: 'cat-dao-ham',
      slug: 'dao-ham',
      name: 'Đạo hàm & Ứng dụng',
      grade: 'Lớp 11 - 12',
      icon: "f'",
      color: 'cyan',
      description: 'Định nghĩa đạo hàm, quy tắc tính đạo hàm hàm hợp, phương trình tiếp tuyến, tốc độ thay đổi tức thời và bài toán tối ưu hóa thực tế.',
      formulaLatex: "f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}, \\quad [u(v(x))]' = u'(v(x))\\cdot v'(x)",
      keyPoints: [
        'Ý nghĩa hình học (hệ số góc tiếp tuyến) và ý nghĩa vật lý (vận tốc, gia tốc tức thời)',
        'Tìm giá trị lớn nhất (GTLN), giá trị nhỏ nhất (GTNN) của hàm số trên đoạn [a; b]',
        'Ứng dụng đạo hàm giải quyết bài toán tối ưu chi phí, doanh thu, thể tích'
      ],
      exampleTitle: 'Ví dụ: Bài toán tối ưu hóa vận tốc chuyển động',
      exampleLatex: 's(t) = -t^3 + 6t^2 + 15t \\Rightarrow v(t) = s\'(t) = -3t^2 + 12t + 15 \\le 27 \\text{ (m/s tại } t = 2\\text{s)}.'
    },
    {
      id: 'cat-tich-phan',
      slug: 'tich-phan',
      name: 'Nguyên hàm & Tích phân',
      grade: 'Lớp 12',
      icon: '∫',
      color: 'emerald',
      description: 'Nguyên hàm cơ bản, định nghĩa và tính chất tích phân, ứng dụng tích phân tính diện tích hình phẳng, thể tích vật thể và khối tròn xoay.',
      formulaLatex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a), \\quad V = \\pi \\int_{a}^{b} [f(x)]^2\\,dx',
      keyPoints: [
        'Bảng nguyên hàm các hàm sơ cấp cơ bản và tính chất tuyến tính của tích phân',
        'Tính diện tích hình phẳng giới hạn bởi hai đồ thị hàm số y = f(x) và y = g(x)',
        'Tính thể tích khối tròn xoay và bài toán tìm quãng đường từ đồ thị vận tốc v(t)'
      ],
      exampleTitle: 'Ví dụ: Diện tích hình phẳng giới hạn bởi Parabol và đường thẳng',
      exampleLatex: 'S = \\int_{0}^{2} |x^2 - 2x|\\,dx = \\int_{0}^{2} (2x - x^2)\\,dx = \\left.\\left(x^2 - \\frac{x^3}{3}\\right)\\right|_{0}^{2} = \\frac{4}{3}.'
    },
    {
      id: 'cat-hinh-hoc',
      slug: 'hinh-hoc',
      name: 'Hình học Không gian & Oxyz',
      grade: 'Lớp 10 - 12',
      icon: '△',
      color: 'amber',
      description: 'Hệ thức lượng trong tam giác, phương pháp tọa độ trong mặt phẳng (Oxy), quan hệ song song - vuông góc trong không gian và tọa độ Oxyz.',
      formulaLatex: 'd(M_0, (P)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}, \\quad \\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}||\\vec{v}|}',
      keyPoints: [
        'Khoảng cách từ một điểm đến mặt phẳng, góc giữa đường thẳng và mặt phẳng',
        'Phương trình mặt phẳng, phương trình đường thẳng (chính tắc, tham số) và mặt cầu trong Oxyz',
        'Ứng dụng tọa độ hóa giải bài toán hình học không gian cổ điển và thực tế (radar, định vị)'
      ],
      exampleTitle: 'Ví dụ: Phương trình mặt cầu tâm I(1; -2; 3) bán kính R = 5',
      exampleLatex: '(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25.'
    },
    {
      id: 'cat-xac-suat',
      slug: 'xac-suat',
      name: 'Xác suất & Thống kê',
      grade: 'Lớp 10 - 12',
      icon: 'P(A)',
      color: 'rose',
      description: 'Các số đặc trưng của mẫu số liệu ghép nhóm (khoảng biến thiên, tứ phân vị, phương sai, độ lệch chuẩn), xác suất có điều kiện và công thức Bayes.',
      formulaLatex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B_k|A) = \\frac{P(B_k)P(A|B_k)}{\\sum_{i=1}^{n} P(B_i)P(A|B_i)}',
      keyPoints: [
        'Tính số trung bình, trung vị, tứ phân vị, phương sai và độ lệch chuẩn mẫu số liệu ghép nhóm',
        'Sơ đồ hình cây biểu diễn xác suất có điều kiện và công thức xác suất toàn phần',
        'Ứng dụng công thức Bayes trong bài toán kiểm định y học, lọc thư rác và dự báo rủi ro'
      ],
      exampleTitle: 'Ví dụ: Xác suất toàn phần và công thức Bayes',
      exampleLatex: 'P(A) = P(B)P(A|B) + P(\\overline{B})P(A|\\overline{B}) = 0{,}02 \\times 0{,}95 + 0{,}98 \\times 0{,}03 = 0{,}0484.'
    },
    {
      id: 'cat-thpt-chuyen-de',
      slug: 'chuyen-de-thpt',
      name: 'Chuyên đề Học tập Toán THPT',
      grade: 'Lớp 10 - 12',
      icon: '★',
      color: 'purple',
      description: 'Hệ phương trình bậc nhất ba ẩn, quy hoạch tuyến tính, phép biến hình trong mặt phẳng, lý thuyết đồ thị, vẽ kỹ thuật và biến ngẫu nhiên rời rạc.',
      formulaLatex: 'E(X) = \\sum_{i=1}^{n} x_i p_i, \\quad V(X) = \\sum_{i=1}^{n} (x_i - E(X))^2 p_i, \\quad C_n^k = \\frac{n!}{k!(n-k)!}',
      keyPoints: [
        'Chuyên đề Lớp 10: Hệ phương trình 3 ẩn (Gauss) và Ba đường Conic (Elip, Hypebol, Parabol)',
        'Chuyên đề Lớp 11: Lý thuyết đồ thị (Bài toán đường đi Euler, thuật toán tìm đường đi ngắn nhất)',
        'Chuyên đề Lớp 12: Biến ngẫu nhiên rời rạc, phân bố nhị thức B(n; p) và Toán tài chính (lãi kép)'
      ],
      exampleTitle: 'Ví dụ: Kỳ vọng và phương sai của phân bố nhị thức B(n; p)',
      exampleLatex: 'X \\sim B(n, p) \\Rightarrow E(X) = np, \\quad V(X) = np(1 - p), \\quad \\sigma(X) = \\sqrt{np(1-p)}.'
    }
  ],

  documents: [
    {
      id: 'doc-1',
      title: 'Đề thi thử Tốt nghiệp THPT Quốc gia 2026 - Đề số 01 (Chuẩn cấu trúc mới)',
      category: 'Đề thi',
      grade: '12',
      topic: 'Tổng hợp THPT',
      level: 'Vận dụng cao',
      pages: 6,
      downloads: 1420,
      date: '15/11/2026',
      fileUrl: 'assets/documents/de-thi-thu-tot-nghiep-thpt-2026-so-1.pdf',
      summary: 'Đề thi gồm 3 phần: 12 câu trắc nghiệm 4 lựa chọn, 4 câu trắc nghiệm Đúng/Sai, 6 câu trả lời ngắn.',
      solutionGuide: 'Câu 18 (Đúng/Sai - Hàm số): Xét f\'(x) = 3x^2 - 3 = 0 <=> x = ±1. Bảng biến thiên suy ra hàm đạt cực đại tại x = -1 (y = 4) và cực tiểu tại x = 1 (y = 0).\nCâu 22 (Trả lời ngắn - Tối ưu hóa): Thiết lập hàm chi phí C(x) = 12x + 300/x, áp dụng BĐT Cauchy hoặc đạo hàm C\'(x) = 0 tại x = 5. Đáp số: 5.'
    },
    {
      id: 'doc-2',
      title: 'Chuyên đề Khảo sát và Vẽ đồ thị Hàm số - Toán 12 (Chương trình GDPT 2018)',
      category: 'Tài liệu học tập',
      grade: '12',
      topic: 'Hàm số',
      level: 'Thông hiểu',
      pages: 24,
      downloads: 985,
      date: '08/11/2026',
      fileUrl: 'assets/documents/chuyen-de-khao-sat-ham-so-toan-12.pdf',
      summary: 'Tổng hợp lý thuyết trọng tâm về tính đơn điệu, cực trị, GTLN-GTNN, đường tiệm cận (đứng, ngang, xiên) và nhận diện đồ thị.',
      solutionGuide: 'Phương pháp tìm tiệm cận xiên của hàm phân thức y = P(x)/Q(x) (bậc P = bậc Q + 1): Thực hiện phép chia đa thức P(x) = (ax + b)Q(x) + R(x). Khi đó đường thẳng y = ax + b là tiệm cận xiên của đồ thị.'
    },
    {
      id: 'doc-3',
      title: 'Chuyên đề Nguyên hàm, Tích phân và Ứng dụng Hình học - Vật lý',
      category: 'Tài liệu học tập',
      grade: '12',
      topic: 'Tích phân',
      level: 'Vận dụng',
      pages: 18,
      downloads: 860,
      date: '01/11/2026',
      fileUrl: 'assets/documents/chuyen-de-nguyen-ham-tich-phan-ung-dung.pdf',
      summary: 'Hệ thống công thức nguyên hàm, tích phân, ứng dụng tính diện tích hình phẳng, thể tích khối tròn xoay và bài toán chuyển động.',
      solutionGuide: 'Khi tính diện tích hình phẳng giới hạn bởi y = f(x), y = g(x) và x = a, x = b: Giải phương trình f(x) - g(x) = 0 trên (a; b) để tách tích phân hoặc sử dụng công thức S = \\int_a^b |f(x) - g(x)| dx.'
    },
    {
      id: 'doc-4',
      title: 'Đề kiểm tra Giữa Học kỳ I - Môn Toán Lớp 11 (Kèm đáp án & ma trận)',
      category: 'Đề kiểm tra',
      grade: '11',
      topic: 'Đại số',
      level: 'Thông hiểu',
      pages: 5,
      downloads: 740,
      date: '25/10/2026',
      fileUrl: 'assets/documents/de-kiem-tra-giua-ky-1-toan-11.pdf',
      summary: 'Đề kiểm tra định kỳ gồm kiến thức Hàm số lượng giác, Phương trình lượng giác, Dãy số - Cấp số cộng - Cấp số nhân và Hình học không gian.',
      solutionGuide: 'Phần II - Câu 2 (Cấp số cộng): Từ hệ u_1 + u_5 = 14 và S_4 = 20, giải hệ phương trình 2u_1 + 4d = 14 và 2(2u_1 + 3d) = 20 tìm được u_1 = 1, công sai d = 3.'
    },
    {
      id: 'doc-5',
      title: 'Đề cương Ôn tập Học kỳ I - Môn Toán Lớp 10 (150 Bài tập Phân dạng)',
      category: 'Tài liệu học tập',
      grade: '10',
      topic: 'Đại số',
      level: 'Cơ bản',
      pages: 20,
      downloads: 1120,
      date: '18/10/2026',
      fileUrl: 'assets/documents/de-cuong-on-tap-hoc-ky-1-toan-10.pdf',
      summary: 'Bao gồm Mệnh đề - Tập hợp, Hệ bất phương trình bậc nhất hai ẩn, Hàm số bậc hai, Hệ thức lượng trong tam giác và Vectơ.',
      solutionGuide: 'Bài toán Quy hoạch tuyến tính: Bước 1: Biểu diễn miền nghiệm đa giác lồi trên mặt phẳng Oxy. Bước 2: Tìm tọa độ các đỉnh của đa giác. Bước 3: Thay tọa độ các đỉnh vào biểu thức F(x; y) = ax + by để tìm GTLN, GTNN.'
    },
    {
      id: 'doc-6',
      title: 'Sổ tay Công thức Xác suất có điều kiện, Công thức Bayes & Thống kê THPT',
      category: 'Đáp án & Hướng dẫn',
      grade: '12',
      topic: 'Xác suất & Thống kê',
      level: 'Vận dụng',
      pages: 12,
      downloads: 930,
      date: '12/10/2026',
      fileUrl: 'assets/documents/so-tay-cong-thuc-xac-suat-thong-ke-thpt.pdf',
      summary: 'Tóm tắt toàn bộ công thức thống kê mẫu số liệu ghép nhóm (Lớp 11, 12) và sơ đồ hình cây giải nhanh bài toán xác suất Bayes.',
      solutionGuide: 'Mẹo vẽ sơ đồ cây Bayes: Nhánh cấp 1 biểu diễn biến cố phân hoạch B và \\overline{B} với xác suất tiên nghiệm P(B), P(\\overline{B}). Nhánh cấp 2 biểu diễn P(A|B) và P(A|\\overline{B}). Nhân dọc theo nhánh rồi cộng lại để được P(A).'
    },
    {
      id: 'doc-7',
      title: 'Tài liệu Hướng dẫn Cấu trúc Đề thi LaTeX / LuaLaTeX với gói ex_test chuẩn 2026',
      category: 'Đáp án & Hướng dẫn',
      grade: '12',
      topic: 'LaTeX & Công nghệ',
      level: 'Vận dụng cao',
      pages: 15,
      downloads: 1650,
      date: '05/10/2026',
      fileUrl: 'assets/documents/mau-de-thi-latex-ex-test-chuan-2025.pdf',
      summary: 'Hướng dẫn khai báo gói ex_test, môi trường câu hỏi 4 phương án, câu hỏi Đúng/Sai (\\choiceTF), câu hỏi trả lời ngắn (\\shortans) và vẽ bảng biến thiên tkz-tab.',
      solutionGuide: 'Sử dụng lệnh \\Opensolutionfile{ans}[ans/ans-phan1] trước phần thi và \\Closesolutionfile{ans} sau phần thi để tự động xuất bảng đáp án cuối đề thi.'
    }
  ],

  externalLinks: [
    {
      id: 'ext-1',
      name: 'GeoGebra Graphing & 3D Calculator',
      category: 'Vẽ hình & Đồ thị',
      url: 'https://www.geogebra.org/calculator',
      description: 'Công cụ vẽ đồ thị hàm số 2D và mô phỏng hình học không gian Oxyz trực quan.'
    },
    {
      id: 'ext-2',
      name: 'Desmos Graphing Calculator',
      category: 'Vẽ hình & Đồ thị',
      url: 'https://www.desmos.com/calculator',
      description: 'Vẽ đồ thị hàm số chứa tham số m với thanh trượt tương tác mượt mà.'
    },
    {
      id: 'ext-3',
      name: 'Overleaf Online LaTeX Editor',
      category: 'Soạn thảo LaTeX',
      url: 'https://www.overleaf.com',
      description: 'Trình biên dịch LaTeX / LuaLaTeX đám mây hỗ trợ cộng tác trực tuyến.'
    },
    {
      id: 'ext-4',
      name: 'Google Gemini AI Assistant',
      category: 'AI Giáo dục',
      url: 'https://gemini.google.com',
      description: 'Trợ lý trí tuệ nhân tạo hỗ trợ gợi ý bài toán thực tế, chuyển ảnh sang LaTeX và giải thích từng bước.'
    }
  ]
};

// Quản lý State toàn cục của ứng dụng
let siteState = loadStateFromStorage();
let graphChartInstance = null;

function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        siteInfo: { ...DEFAULT_SITE_DATA.siteInfo, ...(parsed.siteInfo || {}) },
        newsUpdates: Array.isArray(parsed.newsUpdates) ? parsed.newsUpdates : DEFAULT_SITE_DATA.newsUpdates,
        mathTopics: Array.isArray(parsed.mathTopics) ? parsed.mathTopics : DEFAULT_SITE_DATA.mathTopics,
        documents: Array.isArray(parsed.documents) ? parsed.documents : DEFAULT_SITE_DATA.documents,
        externalLinks: Array.isArray(parsed.externalLinks) ? parsed.externalLinks : DEFAULT_SITE_DATA.externalLinks
      };
    }
  } catch (err) {
    console.warn('Không thể đọc localStorage, dùng dữ liệu mặc định:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
}

function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(siteState));
  } catch (err) {
    console.warn('Không thể lưu vào localStorage:', err);
  }
}

// Hiển thị thông báo Toast hiện đại (không dùng alert/confirm)
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const colors = {
    success: 'bg-emerald-600 text-white border-emerald-500',
    info: 'bg-blue-700 text-white border-blue-500',
    warning: 'bg-amber-600 text-white border-amber-500'
  };
  const toast = document.createElement('div');
  toast.className = `px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2.5 animate-fade-in ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs font-bold">✓</span>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Render công thức KaTeX an toàn
function renderMathInContainer(el) {
  if (!el) return;
  if (typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX auto-render warning:', e);
    }
  }
}

function renderLatexString(latexStr, displayMode = true) {
  if (typeof window.katex !== 'undefined') {
    try {
      return window.katex.renderToString(latexStr, {
        displayMode: displayMode,
        throwOnError: false
      });
    } catch (e) {
      return `<code>${escapeHtml(latexStr)}</code>`;
    }
  }
  return `<code>$${escapeHtml(latexStr)}$</code>`;
}

// ============================================================================
// 1. RENDER THÔNG TIN TRANG CHỦ, GIỚI THIỆU & DANH MỤC
// ============================================================================
function renderSiteIdentity() {
  const info = siteState.siteInfo;
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('brand-site-name', info.siteName);
  setTxt('brand-site-tagline', info.tagline);
  setTxt('hero-badge-text', info.bannerBadge);
  setTxt('hero-title-text', info.bannerTitle);
  setTxt('hero-subtitle-text', info.bannerSubtitle);

  setTxt('teacher-name-text', info.teacherName);
  setTxt('teacher-role-text', info.teacherRole);
  setTxt('teacher-exp-text', info.teacherExp);
  setTxt('teacher-bio-text', info.teacherBio);
  setTxt('teacher-philosophy-text', info.teacherPhilosophy);

  setTxt('contact-email-display', info.contactEmail);
  setTxt('contact-phone-display', info.contactPhone);
  setTxt('contact-school-display', info.contactSchool);
  setTxt('contact-location-display', info.contactLocation);
  setTxt('footer-site-name', info.siteName);
  setTxt('footer-teacher-name', info.teacherName);

  // Thống kê nhanh trên Hero
  setTxt('stat-topics-count', `${siteState.mathTopics.length} Chuyên đề`);
  setTxt('stat-docs-count', `${siteState.documents.length} Đề & Tài liệu`);
}

function renderNewsUpdates() {
  const listEl = document.getElementById('news-updates-grid');
  if (!listEl) return;
  listEl.innerHTML = siteState.newsUpdates.map(item => `
    <article class="math-card p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">${escapeHtml(item.tag)}</span>
          <span class="text-xs text-slate-500 font-medium">${escapeHtml(item.date)}</span>
        </div>
        <h3 class="font-bold text-slate-900 text-base mb-2 leading-snug">${escapeHtml(item.title)}</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(item.summary)}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <a href="${escapeHtml(item.targetHash || '#tai-lieu')}" class="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1">
          Khám phá ngay <span>→</span>
        </a>
        <span class="text-xs text-emerald-600 font-medium">● Mới cập nhật</span>
      </div>
    </article>
  `).join('');
}

// ============================================================================
// 2. RENDER KHU VỰC TOÁN HỌC (7 CHỦ ĐỀ TRỌNG TÂM THPT)
// ============================================================================
let activeMathTopicId = 'all';

function renderMathTopicsSection() {
  const filterBar = document.getElementById('math-topic-pills');
  const grid = document.getElementById('math-topics-grid');
  if (!grid || !filterBar) return;

  const pillsHtml = [
    `<button type="button" data-topic-filter="all" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${activeMathTopicId === 'all' ? 'bg-blue-700 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50'}">Tất cả (${siteState.mathTopics.length})</button>`
  ].concat(
    siteState.mathTopics.map(t => `
      <button type="button" data-topic-filter="${escapeHtml(t.id)}" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${activeMathTopicId === t.id ? 'bg-blue-700 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50'}">
        ${escapeHtml(t.name)}
      </button>
    `)
  );
  filterBar.innerHTML = pillsHtml.join('');

  filterBar.querySelectorAll('[data-topic-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMathTopicId = btn.getAttribute('data-topic-filter');
      renderMathTopicsSection();
    });
  });

  const filtered = activeMathTopicId === 'all'
    ? siteState.mathTopics
    : siteState.mathTopics.filter(t => t.id === activeMathTopicId);

  grid.innerHTML = filtered.map(topic => `
    <div class="math-card math-card-accent p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center shrink-0">
            ${escapeHtml(topic.icon || '∑')}
          </div>
          <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">${escapeHtml(topic.grade)}</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-1.5">${escapeHtml(topic.name)}</h3>
        <p class="text-sm text-slate-600 mb-4 leading-relaxed">${escapeHtml(topic.description)}</p>
        
        <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4 overflow-x-auto">
          <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Công thức cốt lõi:</div>
          <div class="text-sm text-slate-900">${renderLatexString(topic.formulaLatex, true)}</div>
        </div>

        <ul class="space-y-1.5 mb-4">
          ${(topic.keyPoints || []).map(pt => `
            <li class="text-xs text-slate-700 flex items-start gap-2">
              <span class="text-blue-600 font-bold mt-0.5">•</span>
              <span>${escapeHtml(pt)}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button type="button" data-open-topic-modal="${escapeHtml(topic.id)}" class="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
          Xem ví dụ minh họa & bài tập
        </button>
        <button type="button" data-filter-doc-by-topic="${escapeHtml(topic.name)}" class="text-xs font-medium text-slate-600 hover:text-blue-700">
          Tài liệu liên quan →
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-open-topic-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const topicId = btn.getAttribute('data-open-topic-modal');
      openTopicDetailModal(topicId);
    });
  });

  grid.querySelectorAll('[data-filter-doc-by-topic]').forEach(btn => {
    btn.addEventListener('click', () => {
      const searchInput = document.getElementById('doc-search-input');
      const gradeSelect = document.getElementById('doc-grade-filter');
      const catSelect = document.getElementById('doc-category-filter');
      const levelSelect = document.getElementById('doc-level-filter');
      if (searchInput) searchInput.value = '';
      if (gradeSelect) gradeSelect.value = 'all';
      if (catSelect) catSelect.value = 'all';
      if (levelSelect) levelSelect.value = 'all';
      renderDocumentsSection();
      window.location.hash = '#tai-lieu';
    });
  });
}

function openTopicDetailModal(topicId) {
  const topic = siteState.mathTopics.find(t => t.id === topicId);
  if (!topic) return;
  const modal = document.getElementById('universal-modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  if (!modal || !titleEl || !bodyEl) return;

  titleEl.textContent = `${topic.name} (${topic.grade})`;
  bodyEl.innerHTML = `
    <div class="space-y-4">
      <p class="text-sm text-slate-700 leading-relaxed">${escapeHtml(topic.description)}</p>
      <div class="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
        <div class="text-xs font-bold uppercase text-blue-800 mb-2">Công thức trọng tâm</div>
        <div class="overflow-x-auto">${renderLatexString(topic.formulaLatex, true)}</div>
      </div>
      <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div class="text-xs font-bold uppercase text-slate-700 mb-2">${escapeHtml(topic.exampleTitle || 'Ví dụ minh họa có lời giải')}</div>
        <div class="overflow-x-auto">${renderLatexString(topic.exampleLatex || topic.formulaLatex, true)}</div>
      </div>
      <div>
        <div class="text-xs font-bold uppercase text-slate-700 mb-2">Nội dung kỹ năng cần nắm vững:</div>
        <ul class="space-y-2">
          ${(topic.keyPoints || []).map(pt => `
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span>${escapeHtml(pt)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

// ============================================================================
// 3. RENDER KHU VỰC ĐỀ THI & TÀI LIỆU (TÌM KIẾM, LỌC, TẢI PDF & XEM ĐÁP ÁN)
// ============================================================================
function renderDocumentsSection() {
  const searchInput = document.getElementById('doc-search-input');
  const gradeSelect = document.getElementById('doc-grade-filter');
  const catSelect = document.getElementById('doc-category-filter');
  const levelSelect = document.getElementById('doc-level-filter');
  const listContainer = document.getElementById('documents-list-grid');
  const countBadge = document.getElementById('doc-result-count');

  if (!listContainer) return;

  const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const grade = gradeSelect ? gradeSelect.value : 'all';
  const category = catSelect ? catSelect.value : 'all';
  const level = levelSelect ? levelSelect.value : 'all';

  const filtered = siteState.documents.filter(doc => {
    const matchQuery = !query ||
      doc.title.toLowerCase().includes(query) ||
      doc.topic.toLowerCase().includes(query) ||
      doc.summary.toLowerCase().includes(query);
    const matchGrade = grade === 'all' || String(doc.grade) === String(grade);
    const matchCat = category === 'all' || doc.category === category;
    const matchLevel = level === 'all' || doc.level === level;
    return matchQuery && matchGrade && matchCat && matchLevel;
  });

  if (countBadge) {
    countBadge.textContent = `Hiển thị ${filtered.length} / ${siteState.documents.length} tài liệu`;
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="col-span-full bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p class="text-slate-700 font-semibold mb-1">Không tìm thấy tài liệu phù hợp với bộ lọc hiện tại.</p>
        <p class="text-xs text-slate-500 mb-4">Hãy thử xóa từ khóa tìm kiếm hoặc chọn "Tất cả" ở các bộ lọc Lớp, Loại tài liệu và Mức độ.</p>
        <button type="button" id="reset-doc-filters-empty" class="px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition">
          Đặt lại bộ lọc
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-doc-filters-empty');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetDocumentFilters);
    }
    return;
  }

  listContainer.innerHTML = filtered.map(doc => {
    const gradeClass = doc.grade === '12' ? 'badge-grade-12' : (doc.grade === '11' ? 'badge-grade-11' : 'badge-grade-10');
    return `
      <article class="math-card p-5 flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span class="px-2.5 py-0.5 rounded-md text-xs font-bold ${gradeClass}">Lớp ${escapeHtml(doc.grade)}</span>
            <span class="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">${escapeHtml(doc.category)}</span>
            <span class="px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70">${escapeHtml(doc.level)}</span>
          </div>
          <h3 class="text-base font-bold text-slate-900 mb-2 leading-snug">${escapeHtml(doc.title)}</h3>
          <p class="text-xs text-slate-600 mb-3 leading-relaxed">${escapeHtml(doc.summary)}</p>
          <div class="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span>Chủ đề: <strong class="text-slate-700">${escapeHtml(doc.topic)}</strong></span>
            <span>• ${escapeHtml(doc.pages || 6)} trang</span>
            <span>• <span id="dl-count-${escapeHtml(doc.id)}">${escapeHtml(doc.downloads || 0)}</span> lượt tải</span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <button type="button" data-solution-id="${escapeHtml(doc.id)}" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition">
            Xem Đáp án & Hướng dẫn
          </button>
          <a href="${escapeHtml(doc.fileUrl)}" download data-download-id="${escapeHtml(doc.id)}" class="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition shadow-sm">
            <span>⬇ Tải PDF</span>
          </a>
        </div>
      </article>
    `;
  }).join('');

  listContainer.querySelectorAll('[data-solution-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      openDocumentSolutionModal(btn.getAttribute('data-solution-id'));
    });
  });

  listContainer.querySelectorAll('[data-download-id]').forEach(link => {
    link.addEventListener('click', (e) => {
      const docId = link.getAttribute('data-download-id');
      const doc = siteState.documents.find(d => d.id === docId);
      if (doc) {
        doc.downloads = (Number(doc.downloads) || 0) + 1;
        saveStateToStorage();
        const counterEl = document.getElementById(`dl-count-${doc.id}`);
        if (counterEl) counterEl.textContent = doc.downloads;

        // Nếu đang ở môi trường preview hoặc URL là blob/mẫu, tự động tạo bản tải xuống thực tế nếu href là đường dẫn tương đối không tồn tại trên iframe
        if (window.__IS_CANVAS_PREVIEW__) {
          e.preventDefault();
          triggerGeneratedDocumentDownload(doc);
        } else {
          showToast(`Đang tải tài liệu: ${doc.title}`, 'success');
        }
      }
    });
  });
}

function triggerGeneratedDocumentDownload(doc) {
  const content = [
    '======================================================================',
    `MATHEDU STUDIO - TAI LIEU TOAN HOC THPT (LOP ${doc.grade})`,
    '======================================================================',
    `Ten tai lieu : ${doc.title}`,
    `Phan loai    : ${doc.category} | Chu de: ${doc.topic} | Muc do: ${doc.level}`,
    `Ngay cap nhat: ${doc.date}`,
    '----------------------------------------------------------------------',
    'TOM TAT NOI DUNG:',
    doc.summary,
    '',
    'DAP AN & HUONG DAN GIAI CHI TIET:',
    doc.solutionGuide || 'Xem chi tiet trong phan huong dan giai tren website.',
    '======================================================================',
    `Nguon: ${siteState.siteInfo.siteName} - ${siteState.siteInfo.teacherName}`
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = doc.id + '-tai-lieu-toan.txt';
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`Đã tải xuống bản tóm tắt & hướng dẫn giải: ${doc.title}`, 'success');
}

function openDocumentSolutionModal(docId) {
  const doc = siteState.documents.find(d => d.id === docId);
  if (!doc) return;
  const modal = document.getElementById('universal-modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  if (!modal || !titleEl || !bodyEl) return;

  titleEl.textContent = `Đáp án & Hướng dẫn giải: ${doc.title}`;
  bodyEl.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2 text-xs">
        <span class="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-semibold">Lớp ${escapeHtml(doc.grade)}</span>
        <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">${escapeHtml(doc.category)}</span>
        <span class="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-semibold">${escapeHtml(doc.level)}</span>
      </div>
      <p class="text-sm text-slate-600">${escapeHtml(doc.summary)}</p>
      <div class="p-4 rounded-xl bg-slate-900 text-slate-100 text-sm leading-relaxed whitespace-pre-line font-mono">${escapeHtml(doc.solutionGuide || 'Đang cập nhật hướng dẫn giải chi tiết.')}</div>
      <div class="pt-2 flex justify-end">
        <a href="${escapeHtml(doc.fileUrl)}" download class="px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition">
          ⬇ Tải toàn bộ file PDF (${escapeHtml(doc.pages || 6)} trang)
        </a>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function resetDocumentFilters() {
  const searchInput = document.getElementById('doc-search-input');
  const gradeSelect = document.getElementById('doc-grade-filter');
  const catSelect = document.getElementById('doc-category-filter');
  const levelSelect = document.getElementById('doc-level-filter');
  if (searchInput) searchInput.value = '';
  if (gradeSelect) gradeSelect.value = 'all';
  if (catSelect) catSelect.value = 'all';
  if (levelSelect) levelSelect.value = 'all';
  renderDocumentsSection();
}

// ============================================================================
// 4. KHU VỰC CÔNG CỤ TOÁN HỌC TƯƠNG TÁC
// ============================================================================

// 4.1. Vẽ đồ thị hàm số & Khảo sát tự động y = ax^3 + bx^2 + cx + d
function updateFunctionGraph() {
  const a = parseFloat(document.getElementById('coef-a')?.value || '1');
  const b = parseFloat(document.getElementById('coef-b')?.value || '0');
  const c = parseFloat(document.getElementById('coef-c')?.value || '-3');
  const d = parseFloat(document.getElementById('coef-d')?.value || '1');
  const xMin = parseFloat(document.getElementById('graph-xmin')?.value || '-4');
  const xMax = parseFloat(document.getElementById('graph-xmax')?.value || '4');

  const analysisBox = document.getElementById('graph-analysis-output');
  const canvas = document.getElementById('mathGraphCanvas');
  if (!canvas) return;

  const validMin = isFinite(xMin) ? xMin : -4;
  const validMax = isFinite(xMax) && xMax > validMin ? xMax : validMin + 8;

  const xs = [];
  const ys = [];
  const dy = [];
  const steps = 80;
  const stepSize = (validMax - validMin) / steps;

  for (let i = 0; i <= steps; i++) {
    const x = validMin + i * stepSize;
    const y = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    const yPrime = 3 * a * Math.pow(x, 2) + 2 * b * x + c;
    xs.push(Number(x.toFixed(2)));
    ys.push(Number(y.toFixed(3)));
    dy.push(Number(yPrime.toFixed(3)));
  }

  // Phân tích đạo hàm và cực trị
  let analysisHtml = '';
  const fmt = (n) => Number(n.toFixed(3));
  analysisHtml += `<div class="text-xs text-slate-700 space-y-1.5">`;
  analysisHtml += `<div>• <strong>Hàm số:</strong> <span class="font-mono text-blue-800">y = ${fmt(a)}x³ + (${fmt(b)})x² + (${fmt(c)})x + (${fmt(d)})</span></div>`;
  analysisHtml += `<div>• <strong>Đạo hàm:</strong> <span class="font-mono text-emerald-800">y' = ${fmt(3 * a)}x² + (${fmt(2 * b)})x + (${fmt(c)})</span></div>`;

  if (Math.abs(a) > 1e-9) {
    const deltaPrime = b * b - 3 * a * c;
    if (deltaPrime <= 0) {
      analysisHtml += `<div>• <strong>Cực trị:</strong> Hàm số không có cực trị (Δ' = ${fmt(deltaPrime)} ≤ 0), đồng biến/nghịch biến trên toàn trục số ℝ.</div>`;
    } else {
      const x1 = (-b - Math.sqrt(deltaPrime)) / (3 * a);
      const x2 = (-b + Math.sqrt(deltaPrime)) / (3 * a);
      const y1 = a * Math.pow(x1, 3) + b * Math.pow(x1, 2) + c * x1 + d;
      const y2 = a * Math.pow(x2, 3) + b * Math.pow(x2, 2) + c * x2 + d;
      const xInf = -b / (3 * a);
      const yInf = a * Math.pow(xInf, 3) + b * Math.pow(xInf, 2) + c * xInf + d;
      analysisHtml += `<div>• <strong>Hai điểm cực trị:</strong> A(${fmt(x1)}; ${fmt(y1)}) và B(${fmt(x2)}; ${fmt(y2)})</div>`;
      analysisHtml += `<div>• <strong>Tâm đối xứng (Điểm uốn):</strong> I(${fmt(xInf)}; ${fmt(yInf)})</div>`;
    }
  } else if (Math.abs(b) > 1e-9) {
    const xv = -c / (2 * b);
    const yv = b * xv * xv + c * xv + d;
    analysisHtml += `<div>• <strong>Đồ thị Parabol (Bậc 2):</strong> Đỉnh I(${fmt(xv)}; ${fmt(yv)})</div>`;
  } else {
    analysisHtml += `<div>• <strong>Đồ thị Đường thẳng (Bậc 1):</strong> Hệ số góc k = ${fmt(c)}</div>`;
  }
  analysisHtml += `</div>`;
  if (analysisBox) analysisBox.innerHTML = analysisHtml;

  if (typeof window.Chart !== 'undefined') {
    if (graphChartInstance) {
      graphChartInstance.destroy();
    }
    const ctx = canvas.getContext('2d');
    graphChartInstance = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: xs,
        datasets: [
          {
            label: 'Đồ thị hàm số y = f(x)',
            data: ys,
            borderColor: '#1d4ed8',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.25,
            fill: true
          },
          {
            label: "Đồ thị đạo hàm y' = f'(x)",
            data: dy,
            borderColor: '#059669',
            borderDash: [5, 5],
            borderWidth: 1.8,
            pointRadius: 0,
            tension: 0.25,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
        },
        scales: {
          x: { title: { display: true, text: 'Trục hoành x' }, ticks: { maxTicksLimit: 9 } },
          y: { title: { display: true, text: 'Giá trị y' } }
        }
      }
    });
  }
}

// 4.2. Công cụ giải phương trình bậc hai & Thống kê mẫu số liệu
function solveQuadraticEquation() {
  const a = parseFloat(document.getElementById('quad-a')?.value || '1');
  const b = parseFloat(document.getElementById('quad-b')?.value || '-5');
  const c = parseFloat(document.getElementById('quad-c')?.value || '6');
  const out = document.getElementById('quad-result-box');
  if (!out) return;

  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) < 1e-12) {
      out.innerHTML = Math.abs(c) < 1e-12
        ? '<p class="text-emerald-700 font-semibold">Phương trình có vô số nghiệm thực (x ∈ ℝ).</p>'
        : '<p class="text-rose-700 font-semibold">Phương trình vô nghiệm.</p>';
    } else {
      const x = -c / b;
      out.innerHTML = `<p class="text-blue-800 font-semibold">Phương trình bậc nhất có nghiệm duy nhất: x = ${Number(x.toFixed(4))}</p>`;
    }
    return;
  }

  const delta = b * b - 4 * a * c;
  const xv = -b / (2 * a);
  const yv = -delta / (4 * a);

  let html = `<div class="space-y-1.5 text-xs">`;
  html += `<div>• <strong>Biệt thức Δ:</strong> <span class="font-mono font-bold">${Number(delta.toFixed(4))}</span></div>`;
  html += `<div>• <strong>Đỉnh Parabol:</strong> I(${Number(xv.toFixed(3))}; ${Number(yv.toFixed(3))})</div>`;

  if (delta > 0) {
    const x1 = (-b - Math.sqrt(delta)) / (2 * a);
    const x2 = (-b + Math.sqrt(delta)) / (2 * a);
    html += `<div class="text-emerald-700 font-bold">• Hai nghiệm phân biệt: x₁ = ${Number(x1.toFixed(4))} ; x₂ = ${Number(x2.toFixed(4))}</div>`;
    html += `<div>• <strong>Hệ thức Vi-ét:</strong> x₁ + x₂ = ${Number((-b / a).toFixed(4))} | x₁·x₂ = ${Number((c / a).toFixed(4))}</div>`;
  } else if (Math.abs(delta) < 1e-12) {
    html += `<div class="text-blue-700 font-bold">• Nghiệm kép: x₁ = x₂ = ${Number(xv.toFixed(4))}</div>`;
  } else {
    const realPart = Number(xv.toFixed(4));
    const imagPart = Number((Math.sqrt(-delta) / Math.abs(2 * a)).toFixed(4));
    html += `<div class="text-amber-700 font-bold">• Vô nghiệm thực (2 nghiệm phức: z = ${realPart} ± ${imagPart}i)</div>`;
  }
  html += `</div>`;
  out.innerHTML = html;
}

// 4.3. Tính Tích phân xác định bằng phương pháp Simpson & Thống kê mẫu số liệu
function calculateStatsAndCombinatorics() {
  const nVal = parseInt(document.getElementById('comb-n')?.value || '10', 10);
  const kVal = parseInt(document.getElementById('comb-k')?.value || '3', 10);
  const rawSeries = document.getElementById('stats-series-input')?.value || '6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5';
  const out = document.getElementById('stats-comb-result');
  if (!out) return;

  const fact = (m) => {
    if (m < 0 || m > 170) return NaN;
    let r = 1;
    for (let i = 2; i <= m; i++) r *= i;
    return r;
  };

  let combText = '';
  if (nVal >= 0 && kVal >= 0 && kVal <= nVal && nVal <= 30) {
    const cnk = Math.round(fact(nVal) / (fact(kVal) * fact(nVal - kVal)));
    const ank = Math.round(fact(nVal) / fact(nVal - kVal));
    combText = `C(${nVal}, ${kVal}) = <strong>${cnk.toLocaleString('vi-VN')}</strong> | A(${nVal}, ${kVal}) = <strong>${ank.toLocaleString('vi-VN')}</strong> | ${nVal}! = ${fact(nVal).toLocaleString('vi-VN')}`;
  } else {
    combText = `<span class="text-rose-600">Vui lòng nhập 0 ≤ k ≤ n ≤ 30.</span>`;
  }

  const nums = rawSeries
    .split(/[,;\s]+/)
    .map(s => parseFloat(s))
    .filter(v => !isNaN(v));

  let statsText = '';
  if (nums.length > 0) {
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((acc, v) => acc + v, 0);
    const mean = sum / nums.length;
    const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    statsText = `Cỡ mẫu N = ${nums.length} | Trung bình x̄ = <strong>${mean.toFixed(3)}</strong> | Trung vị Me = <strong>${median.toFixed(3)}</strong> | Độ lệch chuẩn s = <strong>${stdDev.toFixed(3)}</strong>`;
  } else {
    statsText = 'Chưa có dãy số hợp lệ.';
  }

  out.innerHTML = `
    <div class="space-y-1.5 text-xs">
      <div>• <strong>Tổ hợp & Chỉnh hợp:</strong> ${combText}</div>
      <div>• <strong>Đặc trưng mẫu số liệu:</strong> ${statsText}</div>
    </div>
  `;
}

// 4.4. Trình hiển thị công thức Toán học KaTeX Live Preview
function updateLiveKatexPreview() {
  const input = document.getElementById('katex-live-input');
  const preview = document.getElementById('katex-live-output');
  if (!input || !preview) return;
  const raw = input.value.trim();
  if (!raw) {
    preview.innerHTML = '<span class="text-slate-400 text-xs">Nhập mã LaTeX để xem trước công thức...</span>';
    return;
  }
  preview.innerHTML = renderLatexString(raw, true);
}

// 4.5. Tiện ích Hỗ trợ Giáo viên: Trộn thứ tự phương án & Chia nhóm ngẫu nhiên
function runTeacherStudentUtility() {
  const rawList = document.getElementById('teacher-student-list')?.value || '';
  const groupCount = parseInt(document.getElementById('teacher-group-count')?.value || '3', 10);
  const out = document.getElementById('teacher-utility-output');
  if (!out) return;

  const items = rawList
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  if (items.length === 0) {
    out.innerHTML = '<p class="text-xs text-rose-600">Vui lòng nhập danh sách học sinh hoặc câu hỏi (mỗi dòng 1 mục).</p>';
    return;
  }

  // Fisher-Yates shuffle
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const validGroups = Math.max(1, Math.min(groupCount, shuffled.length));
  const groups = Array.from({ length: validGroups }, () => []);
  shuffled.forEach((item, idx) => {
    groups[idx % validGroups].push(item);
  });

  const luckyStudent = shuffled[0];

  out.innerHTML = `
    <div class="space-y-2.5 text-xs">
      <div class="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
        🎯 <strong>Gọi tên ngẫu nhiên:</strong> <span class="font-bold text-blue-800">${escapeHtml(luckyStudent)}</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        ${groups.map((g, i) => `
          <div class="p-2.5 rounded-lg bg-white border border-slate-200">
            <div class="font-bold text-blue-700 mb-1">Nhóm / Mã đề ${i + 1} (${g.length})</div>
            <ol class="list-decimal list-inside space-y-0.5 text-slate-700">
              ${g.map(member => `<li>${escapeHtml(member)}</li>`).join('')}
            </ol>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================================
// 5. KHU VỰC LATEX & LUALATEX (TRÌNH TẠO CÂU HỎI EX_TEST & TIỆN ÍCH ĐỀ THI)
// ============================================================================
const LATEX_TEMPLATES = {
  'phan1-choice': `% Mẫu câu hỏi Trắc nghiệm 4 phương án (Phần I - Cấu trúc 2025/2026)
\\begin{ex}%[2D1H1-2]
Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x^2 - 4x + 3, \\forall x \\in \\mathbb{R}$. Hàm số đã cho nghịch biến trên khoảng nào dưới đây?
\\choice
{$ (1; +\\infty) $}
{\\True $ (1; 3) $}
{$ (-\\infty; 1) $}
{$ (3; +\\infty) $}
\\loigiai{
Ta có $f'(x) = 0 \\Leftrightarrow x^2 - 4x + 3 = 0 \\Leftrightarrow \\hoac{&x = 1 \\\\ &x = 3.}$\\\\
Do $f'(x) < 0, \\forall x \\in (1; 3)$ nên hàm số nghịch biến trên khoảng $(1; 3)$.
}
\\end{ex}`,

  'phan2-choicetf': `% Mẫu câu hỏi Trắc nghiệm Đúng / Sai (Phần II - 4 ý a, b, c, d)
\\begin{ex}%[2D1V3-1]
Cho hàm số $y = \\dfrac{x^2 - 2x + 2}{x - 1}$ có đồ thị $(C)$. Xét tính đúng sai của các mệnh đề sau:
\\choiceTF
{\\True Tập xác định của hàm số là $\\mathscr{D} = \\mathbb{R} \\setminus \\{1\\}$}
{\\True Đồ thị $(C)$ có tiệm cận đứng là đường thẳng $x = 1$}
{Đồ thị $(C)$ có tiệm cận xiên là đường thẳng $y = x + 1$}
{\\True Tâm đối xứng của đồ thị $(C)$ là điểm $I(1; 0)$}
\\loigiai{
\\begin{itemchoice}
\\itemch Đúng vì điều kiện xác định là $x - 1 \\neq 0 \\Leftrightarrow x \\neq 1$.
\\itemch Đúng vì $\\lim\\limits_{x \\to 1^+} y = +\\infty$ và $\\lim\\limits_{x \\to 1^-} y = -\\infty$.
\\itemch Sai vì $y = x - 1 + \\dfrac{1}{x - 1}$ nên tiệm cận xiên là $y = x - 1$.
\\itemch Đúng vì giao điểm hai đường tiệm cận là $I(1; 0)$.
\\end{itemchoice}
}
\\end{ex}`,

  'phan3-shortans': `% Mẫu câu hỏi Trắc nghiệm Trả lời ngắn (Phần III - Điền đáp số)
\\begin{ex}%[2D4V3-2]
Một vật chuyển động với vận tốc $v(t) = 3t^2 + 2t$ (m/s). Tính quãng đường (đơn vị: mét) vật đi được trong khoảng thời gian từ $t = 0$ (s) đến $t = 3$ (s).
\\shortans{36}
\\loigiai{
Quãng đường vật đi được là:
$$S = \\int\\limits_{0}^{3} (3t^2 + 2t)\\,\\mathrm{d}t = \\left.(t^3 + t^2)\\right|_{0}^{3} = 27 + 9 = 36 \\text{ (m)}.$$
}
\\end{ex}`,

  'tkz-tab-bbt': `% Mẫu vẽ Bảng biến thiên bằng gói tkz-tab trong LaTeX / LuaLaTeX
\\begin{center}
\\begin{tikzpicture}
\\tkzTabInit[nocadre=false, lgt=1.2, espcl=2.5, deltacl=0.6]
{$x$ /0.6, $f'(x)$ /0.6, $f(x)$ /2.0}
{$-\\infty$, $-1$, $1$, $+\\infty$}
\\tkzTabLine{,+,0,-,0,+,}
\\tkzTabVar{-/ $-\\infty$, +/ $4$, -/ $0$, +/ $+\\infty$}
\\end{tikzpicture}
\\end{center}`
};

function generateExTestCode() {
  const type = document.getElementById('extest-qtype')?.value || 'choice';
  const idTag = document.getElementById('extest-idtag')?.value.trim() || '2D1H1-1';
  const stem = document.getElementById('extest-stem')?.value.trim() || 'Cho hàm số $y = x^3 - 3x + 2$. Tìm giá trị cực đại của hàm số.';
  const optA = document.getElementById('extest-opt-a')?.value.trim() || '$y = 4$';
  const optB = document.getElementById('extest-opt-b')?.value.trim() || '$y = 0$';
  const optC = document.getElementById('extest-opt-c')?.value.trim() || '$y = 2$';
  const optD = document.getElementById('extest-opt-d')?.value.trim() || '$y = -1$';
  const correctOpt = document.getElementById('extest-correct')?.value || 'A';
  const shortAnsVal = document.getElementById('extest-short-val')?.value.trim() || '4';
  const solution = document.getElementById('extest-solution')?.value.trim() || "Ta có $y' = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$. Tại $x = -1$ thì $y_{CĐ} = 4$.";

  let output = '';
  if (type === 'choice') {
    const fmtChoice = (val, letter) => (correctOpt === letter ? `{\\True ${val}}` : `{${val}}`);
    output = [
      `\\begin{ex}%[${idTag}]`,
      stem,
      `\\choice`,
      fmtChoice(optA, 'A'),
      fmtChoice(optB, 'B'),
      fmtChoice(optC, 'C'),
      fmtChoice(optD, 'D'),
      `\\loigiai{`,
      solution,
      `}`,
      `\\end{ex}`
    ].join('\n');
  } else if (type === 'choiceTF') {
    output = [
      `\\begin{ex}%[${idTag}]`,
      stem,
      `\\choiceTF`,
      `{\\True ${optA}}`,
      `{${optB}}`,
      `{\\True ${optC}}`,
      `{${optD}}`,
      `\\loigiai{`,
      solution,
      `}`,
      `\\end{ex}`
    ].join('\n');
  } else {
    output = [
      `\\begin{ex}%[${idTag}]`,
      stem,
      `\\shortans{${shortAnsVal}}`,
      `\\loigiai{`,
      solution,
      `}`,
      `\\end{ex}`
    ].join('\n');
  }

  const outArea = document.getElementById('extest-output-code');
  if (outArea) outArea.value = output;
}

function cleanAndShuffleLatexExam() {
  const area = document.getElementById('extest-output-code');
  if (!area || !area.value.trim()) return;
  let code = area.value;

  // Chuẩn hóa khoảng trắng và tự động chuyển \frac thành \dfrac trong môi trường toán
  code = code.replace(/\\frac\{/g, '\\dfrac{');

  // Hoán vị ngẫu nhiên 4 dòng phương án sau \choice nếu có
  const choiceRegex = /(\\choice(?:TF)?\s*\n)(\{.*\}\s*\n)(\{.*\}\s*\n)(\{.*\}\s*\n)(\{.*\})/;
  const match = code.match(choiceRegex);
  if (match) {
    const opts = [match[2].trim(), match[3].trim(), match[4].trim(), match[5].trim()];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    code = code.replace(choiceRegex, `${match[1]}${opts.join('\n')}`);
    showToast('Đã đảo ngẫu nhiên các phương án và chuẩn hóa \\dfrac{}!', 'success');
  } else {
    showToast('Đã chuẩn hóa phân số \\dfrac{} trong mã LaTeX!', 'info');
  }
  area.value = code;
}

// ============================================================================
// 6. KHU VỰC CÔNG NGHỆ & AI (PROMPT GEMINI CHO GIÁO VIÊN TOÁN)
// ============================================================================
const AI_PROMPTS_LIBRARY = {
  'de-thuc-te-12': `Đóng vai giáo viên Toán THPT giàu kinh nghiệm chương trình GDPT 2018. Hãy thiết kế 02 bài toán thực tế về ứng dụng Đạo hàm để tối ưu hóa chi phí / lợi nhuận dành cho học sinh Lớp 12:
- Bài 1 ở mức độ Vận dụng (định dạng câu hỏi Trắc nghiệm Đúng/Sai 4 mệnh đề a, b, c, d).
- Bài 2 ở mức độ Vận dụng cao (định dạng câu hỏi Trả lời ngắn, kết quả làm tròn đến hàng phần mười).
- Xuất toàn bộ đề bài và lời giải chi tiết bằng mã nguồn LaTeX chuẩn gói ex_test.`,

  'anh-sang-latex': `Hãy chuyển đổi toàn bộ nội dung hình ảnh đề thi Toán đính kèm sang mã nguồn LaTeX sử dụng gói ex_test:
1. Giữ nguyên chính xác mọi ký hiệu toán học, dùng \\dfrac thay cho \\frac.
2. Câu trắc nghiệm 4 lựa chọn đặt trong \\begin{ex} ... \\choice{}{}{}{} \\loigiai{} \\end{ex}.
3. Nếu có bảng biến thiên hoặc đồ thị, hãy viết mã TikZ tương ứng để vẽ lại trực tiếp trong LuaLaTeX.`,

  'kiem-tra-loi-giai': `Đóng vai trợ giảng Toán học THPT. Hãy kiểm tra từng bước lời giải bài toán Tích phân / Hình học Oxyz dưới đây của học sinh:
1. Chỉ rõ bước biến đổi nào bị sai điều kiện xác định hoặc sai dấu (nếu có).
2. Giải thích ngắn gọn bản chất toán học để học sinh tự nhận ra lỗi.
3. Đưa ra lời giải chuẩn mực và 1 bài tập tương tự để học sinh luyện tập thêm.`
};

// ============================================================================
// 7. QUẢN LÝ NỘI DUNG MỞ RỘNG (FRONTEND CMS + XUẤT/NHẬP JSON)
// ============================================================================
function renderExternalLinksSection() {
  const container = document.getElementById('external-apps-grid');
  if (!container) return;
  container.innerHTML = siteState.externalLinks.map(item => `
    <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="math-card p-4 flex items-start justify-between gap-3 group">
      <div>
        <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">${escapeHtml(item.category)}</span>
        <h4 class="font-bold text-slate-900 text-sm mt-1.5 group-hover:text-blue-700 transition">${escapeHtml(item.name)}</h4>
        <p class="text-xs text-slate-600 mt-1">${escapeHtml(item.description)}</p>
      </div>
      <span class="text-blue-600 font-bold text-sm shrink-0 group-hover:translate-x-0.5 transition">↗</span>
    </a>
  `).join('');
}

function setupContentManagementForms() {
  // 1. Thêm tài liệu PDF / bài viết mới
  const addDocForm = document.getElementById('cms-add-doc-form');
  if (addDocForm) {
    addDocForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('cms-doc-title')?.value.trim();
      const grade = document.getElementById('cms-doc-grade')?.value || '12';
      const category = document.getElementById('cms-doc-category')?.value || 'Đề thi';
      const level = document.getElementById('cms-doc-level')?.value || 'Vận dụng';
      const topic = document.getElementById('cms-doc-topic')?.value.trim() || 'Tổng hợp THPT';
      const fileUrl = document.getElementById('cms-doc-url')?.value.trim() || 'assets/documents/de-thi-thu-tot-nghiep-thpt-2026-so-1.pdf';
      const summary = document.getElementById('cms-doc-summary')?.value.trim() || 'Tài liệu Toán học THPT cập nhật mới.';
      const solutionGuide = document.getElementById('cms-doc-solution')?.value.trim() || 'Hướng dẫn giải chi tiết đính kèm trong file PDF.';

      if (!title) {
        showToast('Vui lòng nhập tiêu đề tài liệu!', 'warning');
        return;
      }

      const newDoc = {
        id: 'doc-' + Date.now(),
        title,
        category,
        grade,
        topic,
        level,
        pages: 8,
        downloads: 1,
        date: new Date().toLocaleDateString('vi-VN'),
        fileUrl,
        summary,
        solutionGuide
      };

      siteState.documents.unshift(newDoc);
      saveStateToStorage();
      renderDocumentsSection();
      renderSiteIdentity();
      addDocForm.reset();
      showToast('Đã thêm tài liệu mới vào Khu vực Đề thi & Tài liệu!', 'success');
    });
  }

  // 2. Cập nhật Banner & Thông tin Trang chủ
  const bannerForm = document.getElementById('cms-update-banner-form');
  if (bannerForm) {
    // Điền giá trị hiện tại
    const titleIn = document.getElementById('cms-banner-title');
    const subIn = document.getElementById('cms-banner-subtitle');
    const teacherIn = document.getElementById('cms-teacher-name');
    if (titleIn) titleIn.value = siteState.siteInfo.bannerTitle;
    if (subIn) subIn.value = siteState.siteInfo.bannerSubtitle;
    if (teacherIn) teacherIn.value = siteState.siteInfo.teacherName;

    bannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (titleIn && titleIn.value.trim()) siteState.siteInfo.bannerTitle = titleIn.value.trim();
      if (subIn && subIn.value.trim()) siteState.siteInfo.bannerSubtitle = subIn.value.trim();
      if (teacherIn && teacherIn.value.trim()) siteState.siteInfo.teacherName = teacherIn.value.trim();
      saveStateToStorage();
      renderSiteIdentity();
      showToast('Đã cập nhật thông tin Banner & Giáo viên trên trang chủ!', 'success');
    });
  }

  // 3. Thêm liên kết ứng dụng ngoài
  const extForm = document.getElementById('cms-add-extlink-form');
  if (extForm) {
    extForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cms-ext-name')?.value.trim();
      const url = document.getElementById('cms-ext-url')?.value.trim();
      const category = document.getElementById('cms-ext-cat')?.value.trim() || 'Tiện ích Toán';
      const description = document.getElementById('cms-ext-desc')?.value.trim() || 'Ứng dụng hỗ trợ giảng dạy và học tập Toán.';
      if (!name || !url) {
        showToast('Vui lòng nhập tên và đường dẫn URL hợp lệ!', 'warning');
        return;
      }
      siteState.externalLinks.push({
        id: 'ext-' + Date.now(),
        name,
        category,
        url,
        description
      });
      saveStateToStorage();
      renderExternalLinksSection();
      extForm.reset();
      showToast('Đã thêm liên kết ứng dụng ngoài thành công!', 'success');
    });
  }

  // 4. Xuất file cấu hình JSON để lưu vào mã nguồn trước khi đẩy lên GitHub / Cloudflare
  const exportBtn = document.getElementById('cms-export-json-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = JSON.stringify(siteState, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mathedu-site-data.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Đã xuất file mathedu-site-data.json để lưu trữ lâu dài!', 'success');
    });
  }

  // 5. Khôi phục dữ liệu mặc định
  const resetDataBtn = document.getElementById('cms-reset-default-btn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      siteState = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
      saveStateToStorage();
      renderSiteIdentity();
      renderNewsUpdates();
      renderMathTopicsSection();
      renderDocumentsSection();
      renderExternalLinksSection();
      showToast('Đã khôi phục toàn bộ dữ liệu mẫu gốc!', 'info');
    });
  }
}

// ============================================================================
// 8. ĐIỀU HƯỚNG URL HASH (#trang-chu, #gioi-thieu, #toan-hoc, ...) & MOBILE MENU
// ============================================================================
const VALID_HASHES = [
  '#trang-chu',
  '#gioi-thieu',
  '#toan-hoc',
  '#tai-lieu',
  '#cong-cu',
  '#latex',
  '#cong-nghe',
  '#lien-he'
];

function updateActiveNavByHash(hash) {
  const targetHash = VALID_HASHES.includes(hash) ? hash : '#trang-chu';
  document.querySelectorAll('.nav-item-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === targetHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function handleHashNavigation() {
  const currentHash = window.location.hash || '#trang-chu';
  updateActiveNavByHash(currentHash);

  const targetEl = document.querySelector(currentHash);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    targetEl.classList.add('section-highlight-pulse');
    setTimeout(() => targetEl.classList.remove('section-highlight-pulse'), 900);
  }

  // Đóng menu điện thoại nếu đang mở
  const mobileMenu = document.getElementById('mobile-nav-drawer');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
}

function setupScrollSpyAndBackToTop() {
  const navbar = document.getElementById('main-sticky-navbar');
  const backToTopBtn = document.getElementById('back-to-top-button');
  const sections = VALID_HASHES.map(h => document.querySelector(h)).filter(Boolean);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (navbar) {
      if (scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
    if (backToTopBtn) {
      if (scrollY > 360) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
    }

    // Tự động làm nổi bật mục menu khi cuộn qua khu vực tương ứng
    let currentSectionId = '#trang-chu';
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 130) {
        currentSectionId = '#' + sec.id;
      }
    }
    updateActiveNavByHash(currentSectionId);
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.location.hash = '#trang-chu';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ============================================================================
// 9. KHỞI TẠO TOÀN BỘ SỰ KIỆN KHI DOM TẢI XONG
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderSiteIdentity();
  renderNewsUpdates();
  renderMathTopicsSection();
  renderDocumentsSection();
  renderExternalLinksSection();

  // Sự kiện tìm kiếm & lọc tài liệu
  ['doc-search-input', 'doc-grade-filter', 'doc-category-filter', 'doc-level-filter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', renderDocumentsSection);
      el.addEventListener('change', renderDocumentsSection);
    }
  });

  const resetBtn = document.getElementById('doc-reset-filter-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetDocumentFilters);

  // Khởi tạo Công cụ Toán học
  updateFunctionGraph();
  solveQuadraticEquation();
  calculateStatsAndCombinatorics();
  updateLiveKatexPreview();
  runTeacherStudentUtility();

  const plotBtn = document.getElementById('btn-plot-graph');
  if (plotBtn) plotBtn.addEventListener('click', updateFunctionGraph);

  document.querySelectorAll('[data-preset-func]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [a, b, c, d] = btn.getAttribute('data-preset-func').split(',').map(Number);
      document.getElementById('coef-a').value = a;
      document.getElementById('coef-b').value = b;
      document.getElementById('coef-c').value = c;
      document.getElementById('coef-d').value = d;
      updateFunctionGraph();
    });
  });

  const quadBtn = document.getElementById('btn-solve-quad');
  if (quadBtn) quadBtn.addEventListener('click', solveQuadraticEquation);

  const statsBtn = document.getElementById('btn-calc-stats');
  if (statsBtn) statsBtn.addEventListener('click', calculateStatsAndCombinatorics);

  const katexInput = document.getElementById('katex-live-input');
  if (katexInput) katexInput.addEventListener('input', updateLiveKatexPreview);

  document.querySelectorAll('[data-katex-sample]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (katexInput) {
        katexInput.value = btn.getAttribute('data-katex-sample');
        updateLiveKatexPreview();
      }
    });
  });

  const teacherUtilBtn = document.getElementById('btn-run-teacher-util');
  if (teacherUtilBtn) teacherUtilBtn.addEventListener('click', runTeacherStudentUtility);

  // Khởi tạo Khu vực LaTeX & ex_test
  generateExTestCode();
  const genLatexBtn = document.getElementById('btn-generate-extest');
  if (genLatexBtn) genLatexBtn.addEventListener('click', generateExTestCode);

  const shuffleLatexBtn = document.getElementById('btn-shuffle-extest');
  if (shuffleLatexBtn) shuffleLatexBtn.addEventListener('click', cleanAndShuffleLatexExam);

  const copyLatexBtn = document.getElementById('btn-copy-extest');
  if (copyLatexBtn) {
    copyLatexBtn.addEventListener('click', () => {
      const outArea = document.getElementById('extest-output-code');
      if (!outArea) return;
      outArea.select();
      try {
        navigator.clipboard.writeText(outArea.value);
      } catch (e) {
        document.execCommand('copy');
      }
      showToast('Đã sao chép mã nguồn LaTeX ex_test vào bộ nhớ tạm!', 'success');
    });
  }

  document.querySelectorAll('[data-latex-template]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-latex-template');
      const outArea = document.getElementById('extest-output-code');
      if (outArea && LATEX_TEMPLATES[key]) {
        outArea.value = LATEX_TEMPLATES[key];
        showToast('Đã nạp mẫu mã nguồn LaTeX chuẩn!', 'info');
      }
    });
  });

  // Khởi tạo Khu vực Công nghệ & AI (Sao chép Prompt Gemini)
  document.querySelectorAll('[data-ai-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-ai-prompt');
      const promptBox = document.getElementById('ai-prompt-preview-box');
      if (promptBox && AI_PROMPTS_LIBRARY[key]) {
        promptBox.value = AI_PROMPTS_LIBRARY[key];
        try {
          navigator.clipboard.writeText(AI_PROMPTS_LIBRARY[key]);
        } catch (e) {
          promptBox.select();
          document.execCommand('copy');
        }
        showToast('Đã nạp & sao chép câu lệnh (Prompt) Gemini!', 'success');
      }
    });
  });

  // Khởi tạo Biểu mẫu gửi ý kiến liên hệ
  const contactForm = document.getElementById('contact-feedback-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('contact-sender-name')?.value.trim();
      const senderRole = document.getElementById('contact-sender-role')?.value;
      const senderMsg = document.getElementById('contact-sender-msg')?.value.trim();
      if (!senderName || !senderMsg) {
        showToast('Vui lòng điền họ tên và nội dung tin nhắn!', 'warning');
        return;
      }
      const historyList = document.getElementById('contact-submitted-list');
      if (historyList) {
        const item = document.createElement('div');
        item.className = 'p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 animate-fade-in';
        item.innerHTML = `<strong>${escapeHtml(senderName)} (${escapeHtml(senderRole)}):</strong> "${escapeHtml(senderMsg)}" <span class="text-emerald-700 font-semibold ml-1">✓ Đã ghi nhận</span>`;
        historyList.prepend(item);
      }
      contactForm.reset();
      showToast(`Cảm ơn ${senderName}! Ý kiến đóng góp đã được ghi nhận.`, 'success');
    });
  }

  // Khởi tạo CMS Frontend
  setupContentManagementForms();

  // Đóng Modal chung
  const closeModalBtn = document.getElementById('modal-close-btn');
  const universalModal = document.getElementById('universal-modal');
  if (closeModalBtn && universalModal) {
    closeModalBtn.addEventListener('click', () => {
      universalModal.classList.add('hidden');
      universalModal.classList.remove('flex');
    });
    universalModal.addEventListener('click', (e) => {
      if (e.target === universalModal) {
        universalModal.classList.add('hidden');
        universalModal.classList.remove('flex');
      }
    });
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Điều hướng Hash
  window.addEventListener('hashchange', handleHashNavigation);
  setupScrollSpyAndBackToTop();
  if (window.location.hash) {
    setTimeout(handleHashNavigation, 150);
  } else {
    updateActiveNavByHash('#trang-chu');
  }

  // Render KaTeX cho toàn trang khi tài nguyên tải xong
  setTimeout(() => {
    renderMathInContainer(document.body);
  }, 300);
});
