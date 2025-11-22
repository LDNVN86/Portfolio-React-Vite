# Portfolio cá nhân (React + Vite)

Đây là website giới thiệu bản thân và những dự án nhỏ của Seno Impotent. Mình dựng bằng React + Vite, tập trung vào trải nghiệm mượt, đa ngôn ngữ và có chút “vibe” cá nhân (nhạc, hiệu ứng, status Discord, thời tiết).

## Có gì bên trong?
- Landing nhiều hiệu ứng: intro overlay, video nền, gợi ý bật nhạc.
- Widget trạng thái Discord (Lanyard) + Spotify, kèm thời tiết OpenWeather.
- Đa ngôn ngữ vi/en, nhớ theme sáng/tối và màu nhấn; tôn trọng `prefers-reduced-motion`.
- Blog đọc Markdown, tự tính thời gian đọc, phân trang, định dạng ngày theo locale.
- Các trang: About, Skills (lưới icon), Games, Workspace, Projects, Blog, và trang 404 riêng.
- Responsive với Tailwind + SCSS, animation bằng Framer Motion, tooltip/overlay gọn gàng.

## Stack mình dùng
- React 19, Vite 6, React Router 7.
- TailwindCSS 3 + SCSS, Framer Motion, React Icons, Tippy, React Color.
- `gray-matter` đọc Markdown, axios gọi API Lanyard/OpenWeather.
- Supabase làm kho tĩnh và (tuỳ chọn) client tại `src/lib/supabaseClient.js`.
- Node.js 20.x (đã khai báo trong `package.json`).

## Cấu trúc chính
```
src/
  app/           # Router + layout
  features/      # Trang/section (about, blog, game, home, project, skills, space, error)
  shared/        # components, contexts (AppSettingsContext), hooks (useTranslation), i18n/translations
  content/blog/  # Bài Markdown + loader posts.js
  styles/        # SCSS + entry Tailwind
public/          # Static assets
dist/            # Kết quả build (npm run build)
```

## Chạy nhanh
1) Cài dependencies:
```bash
npm install
```
2) Tạo file môi trường và điền giá trị:
```bash
cp .env.example .env   # Windows có thể dùng: copy .env.example .env
```
3) Chạy dev server:
```bash
npm run dev -- --host
```
4) Lệnh khác:
```bash
npm run build    # build ra dist/
npm run preview  # xem thử bản build
npm run lint     # eslint
```

## Biến môi trường
Đặt trong `.env` (được Vite expose qua `import.meta.env`):
```
VITE_OPENWEATHER_API_KEY=your_openweather_key         # Widget thời tiết
VITE_UIDDIS_UserID_API_Lanyard=your_discord_user_id   # Widget trạng thái Discord
VITE_SUPABASE_URL=https://your-project.supabase.co    # Tuỳ chọn cho Supabase client
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key         # Tuỳ chọn cho Supabase client
```

## Chỉnh nội dung
- Blog: thêm `.md` trong `src/content/blog/`, frontmatter mẫu:
  ```md
  ---
  id: sample-post
  locale: vi
  title: Tiêu đề bài viết
  excerpt: Tóm tắt ngắn
  publishedAt: "2025-01-01"
  tags: ["note", "life"]
  ---
  Nội dung chính...
  ```
  Loader `src/content/blog/posts.js` sẽ tự tính số từ, thời gian đọc, phân trang.
- Chuỗi giao diện: cập nhật `src/shared/i18n/translations.js` cho cả vi/en.

## Deploy
- Build bằng `npm run build`, deploy static lên Vercel/Netlify/... File `vercel.json` đã cấu hình rewrite cho SPA.
- Đừng quên set biến môi trường cho OpenWeather/Lanyard/Supabase ở môi trường deploy.

## Ghi chú
- Lint: xem `eslint.config.js`.
- Chưa có license; thêm nếu muốn open-source.
