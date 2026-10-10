# Website 20/10 · V1.4 · Nhạc của hai đứa + Shuffle 🎶

Bản V1.4 đã đóng gói **đúng 4 file âm thanh bạn tải lên** (chuyển về MP3 chuẩn, khoảng 128 kbps cho điện thoại), cùng ảnh, mini game bún chả, thư tình và mọi nội dung chỉnh sửa từ bản V1.3.

## Playlist

1. I Love You 3000 — Stephanie Poetri
2. Love Story — **Indila** (đây là bản trong file bạn gửi, **không phải bản Taylor Swift**)
3. Until I Found You — Stephen Sanchez ft. Em Beihold
4. Time Machine — mj apanay ft. aren park (thay cho Those Eyes)

## Cách phát

- Khi bấm nút **Cóooo, tớ yêu cậu nhiều lắm!**, trình duyệt bắt đầu phát bài **ngẫu nhiên**.
- Bài tiếp theo cũng phát theo thứ tự **shuffle**, mỗi lượt 4 bài sẽ nghe đủ cả 4 bài, không lặp bài cho tới khi hết lượt. Hết lượt tự xáo lại và tiếp tục vô hạn, tránh trùng ngay bài vừa nghe.
- **⏭** chuyển sang bài ngẫu nhiên kế tiếp; **⏮** quay lại bài vừa phát. Có Play/Pause và tắt/bật tiếng, chọn bài trực tiếp trong danh sách.
- iOS/Android thường chặn nhạc tự phát trước khi người dùng chạm, nên nhạc bắt đầu khi người yêu nhấn **Có**.

## Chạy web

- Giải nén ZIP, mở thư mục bằng VS Code. Mở `index.html` bằng **Live Server**.
- Không cần `npm install` / `npm run build`.
- Để xem trên điện thoại cùng Wi-Fi: vào `http://<IP máy tính>:5500` khi Live Server cho phép truy cập LAN.
- Chưa cần đưa lên GitHub/Vercel; khi chốt final mới deploy.

## Sửa nội dung

- `config.js`: chú thích album, lời thư, phần quà, playlist.
- `index.html`: giao diện và các đoạn text tĩnh.
- `script.js`: cơ chế mini game và xáo ngẫu nhiên bài hát.
- `style.css`: bố cục/hiệu ứng.
- `images/`: ảnh; `music/`: 4 MP3 chuẩn.

**Lưu ý quyền sử dụng**: Bản này chỉ đóng gói các file âm thanh do bạn cung cấp. Nếu đăng website công khai hay chia sẻ ra ngoài, hãy lưu ý quyền sử dụng của các bản thu.
