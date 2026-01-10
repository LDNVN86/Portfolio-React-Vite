# Portfolio cá nhân (React + Vite)

Đây là website giới thiệu bản thân và những dự án của Seno Impotent. Mình dựng bằng React + Vite, tập trung vào trải nghiệm mượt, đa ngôn ngữ và có chút "vibe" cá nhân (nhạc, hiệu ứng, status Discord, thời tiết).

## ✨ Tính năng chính

- **Landing hiệu ứng**: Intro overlay (skip bằng sessionStorage), video nền, gợi ý bật nhạc
- **Hero CTA Buttons**: "Xem Dự Án" và "Tải CV" nổi bật trên header
- **Widget trạng thái**: Discord (Lanyard) + Spotify, kèm thời tiết OpenWeather
- **Đa ngôn ngữ**: vi/en, nhớ theme sáng/tối và màu nhấn; tôn trọng `prefers-reduced-motion`
- **Skill Progress Bars**: Hiển thị % thành thạo từng skill với animation
- **Project Modal**: Click vào card để xem chi tiết project với Portal fullscreen
- **Blog Markdown**: Tự tính thời gian đọc, phân trang, định dạng ngày theo locale
- **Responsive**: Tailwind + SCSS, animation với Framer Motion

## 🚀 Featured Projects

| Project              | Description                         | Tech Stack                                           |
| -------------------- | ----------------------------------- | ---------------------------------------------------- |
| **Shop Acc Game**    | Hệ thống bán tài khoản game tự động | Next.js, NestJS, PostgreSQL, Socket.io, PayOS        |
| **Muciii Bio**       | Trang bio link cho khách hàng       | Next.js, React, TailwindCSS, Framer Motion, Anime.js |
| **Video Downloader** | Tải video YouTube, TikTok, Facebook | NestJS, Next.js, yt-dlp                              |
| **NekozaneDex**      | Web đọc truyện tranh                | Go, Gin, Next.js, PostgreSQL                         |
| **Portfolio**        | Website này                         | React, Vite, TailwindCSS, Framer Motion              |

## 🛠 Stack mình dùng

- React 19, Vite 6, React Router 7
- TailwindCSS 3 + SCSS, Framer Motion, React Icons
- `gray-matter` đọc Markdown, axios gọi API Lanyard/OpenWeather
- Supabase làm kho tĩnh
- Node.js 20.x

## 📁 Cấu trúc chính

```
src/
  app/           # Router + layout
  features/      # Trang/section (about, blog, game, home, project, skills, space, error)
  shared/        # components, contexts, hooks (useTranslation), i18n/translations
  content/       # Blog Markdown + Projects data
  styles/        # SCSS + entry Tailwind
```

## ⚡ Chạy nhanh

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file môi trường
cp .env.example .env

# 3. Chạy dev server
npm run dev -- --host

# 4. Build production
npm run build
```

## 🔑 Biến môi trường

```env
VITE_OPENWEATHER_API_KEY=your_openweather_key
VITE_UIDDIS_UserID_API_Lanyard=your_discord_user_id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Thêm nội dung

### Blog

Thêm `.md` vào `src/content/blog/`:

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

### Projects

Cập nhật `src/content/projects/projects.js`

### Translations

Cập nhật `src/shared/i18n/translations.js` cho vi/en

## 🚀 Deploy

Build bằng `npm run build`, deploy static lên Vercel/Netlify. File `vercel.json` đã cấu hình rewrite cho SPA.

## 📄 License

Chưa có license; thêm nếu muốn open-source.
