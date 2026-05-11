/**
 * Projects data for portfolio
 * status: "production" | "wip" | "archived" | undefined
 */

export const projects = [
  {
    id: "tavigo",
    title: {
      vi: "Tavigo - eSIM Du Lịch (B2C)",
      en: "Tavigo - Travel eSIM (B2C)",
    },
    description: {
      vi: "Sản phẩm chính đang chạy Production tại tavigo.vn. Nền tảng eSIM bán lẻ + affiliate cho khách du lịch quốc tế. Backend modular monolith Go 1.25 + Gin v1.10 với 60+ packages, pgx v5 + goose migrations. 3 frontend Next.js 16 riêng (USER · ADMIN · AFF), mỗi app có BFF route forward cookie httponly tới BE. PostgreSQL 16 + pgvector (chuẩn bị phase AI/RAG), Redis 7. Tích hợp eSIM Access API (HMAC-SHA256, 13 endpoint + 6 webhook), Pay2S + SePay (payment), Resend (email), Cloudflare Turnstile (anti-bot) + R2 (storage), OAuth Google/Facebook, Telegram admin bot.",
      en: "Main product running in Production at tavigo.vn. Travel eSIM retail + affiliate platform. Modular monolith backend in Go 1.25 + Gin v1.10 with 60+ packages, pgx v5 + goose migrations. Three separate Next.js 16 frontends (USER · ADMIN · AFF), each with its own BFF forwarding httponly cookies to the BE. PostgreSQL 16 + pgvector (prepping for AI/RAG phase), Redis 7. Integrations: eSIM Access API (HMAC-SHA256, 13 endpoints + 6 webhooks), Pay2S + SePay (payment), Resend (email), Cloudflare Turnstile (anti-bot) + R2 (storage), OAuth Google/Facebook, Telegram admin bot.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/projects/shop-acc-preview.webp",
    techStack: [
      "Go 1.25",
      "Gin v1.10",
      "pgx v5",
      "goose",
      "Next.js 16",
      "React 19",
      "Tailwind v4",
      "PostgreSQL 16 + pgvector",
      "Redis 7",
      "Cloudflare R2/Turnstile",
      "Resend",
      "Pay2S + SePay",
    ],
    liveUrl: "https://tavigo.vn",
    githubUrl: null,
    featured: true,
    stars: 0,
    category: "fullstack",
    status: "production",
  },
  {
    id: "esim-vietnam",
    title: {
      vi: "EsimVietNam - eSIM B2B Đại Lý",
      en: "EsimVietNam - B2B eSIM for Agents",
    },
    description: {
      vi: "Hệ thống bán eSIM cho mạng lưới đại lý (B2B), đang trong giai đoạn WIP — domain dự kiến tongkhoesim.vn. Backend Go + Fiber v2 + pgx + sqlc (type-safe SQL), realtime bằng Centrifugo 5 (chọn thay Socket.io vì scale ngang + JWT auth native). Frontend Next.js 16 + TanStack Query + centrifuge-js. Postgres 16 + Redis 7 cho ví đại lý, rate-limit, idempotency, cache balance/inventory. CI/CD GitHub Actions, Docker Compose multi-env.",
      en: "B2B eSIM platform for an agent/reseller network — WIP, planned domain tongkhoesim.vn. Backend in Go + Fiber v2 + pgx + sqlc (type-safe SQL), realtime via Centrifugo 5 (picked over Socket.io for horizontal scaling + native JWT auth). Frontend Next.js 16 + TanStack Query + centrifuge-js. Postgres 16 + Redis 7 for agent wallet, rate-limit, idempotency, balance/inventory cache. GitHub Actions CI/CD, multi-env Docker Compose.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/projects/muciii-bio-preview.webp",
    techStack: [
      "Go",
      "Fiber v2",
      "pgx + sqlc",
      "Centrifugo 5",
      "Next.js 16",
      "TanStack Query",
      "PostgreSQL 16",
      "Redis 7",
      "Docker",
      "GitHub Actions",
    ],
    liveUrl: "https://tongkhoesim.vn",
    githubUrl: "https://github.com/LDNVN86/Esim-VietNam",
    featured: true,
    stars: 0,
    category: "fullstack",
    status: "wip",
  },
  {
    id: "shop-acc-game",
    title: {
      vi: "Shop Acc Game - Hệ Thống Bán Tài Khoản",
      en: "Game Account Shop - E-commerce Platform",
    },
    description: {
      vi: "Hệ thống bán tài khoản game tự động với thanh toán PayOS, realtime WebSocket, quản lý đơn hàng, hệ thống CTV. Fullstack với Next.js 16 và NestJS.",
      en: "Automated game account selling platform with PayOS payment, realtime WebSocket, order management, and affiliate system. Built with Next.js 16 and NestJS.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/projects/shop-acc-preview.webp",
    techStack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Socket.io",
      "PayOS",
      "TailwindCSS",
    ],
    liveUrl: "https://clonegiare.io.vn/",
    githubUrl: null,
    featured: true,
    stars: 0,
    category: "fullstack",
  },
  {
    id: "yt-dlp",
    title: {
      vi: "Video Downloader (YT-DLP)",
      en: "Video Downloader (YT-DLP)",
    },
    description: {
      vi: "Ứng dụng tải video từ YouTube, Facebook, Instagram, TikTok. Fullstack project với NestJS backend và Next.js frontend. Xử lý bandwidth bottleneck (cổ chai băng thông).",
      en: "Download videos from YouTube, Facebook, Instagram, TikTok. A fullstack project with NestJS backend and Next.js frontend. Handles bandwidth bottleneck issues.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/projects/yt-dlp-preview.webp",
    techStack: ["NestJS", "Next.js", "TypeScript", "yt-dlp", "TailwindCSS"],
    liveUrl: null,
    githubUrl: "https://github.com/LDNVN86/nestjs-yt-dlp",
    githubFrontend: "https://github.com/LDNVN86/nextjs-frontend-yt-dlp",
    featured: true,
    stars: 2,
    category: "fullstack",
  },
  {
    id: "nekozane-dex",
    title: {
      vi: "NekozaneDex - Web Đọc Truyện",
      en: "NekozaneDex - Manga Reader",
    },
    description: {
      vi: 'Web đọc truyện, đăng truyện "đơn giản" với Gin Framework (Go) backend và Next.js frontend. Hỗ trợ đăng và quản lý truyện.',
      en: "A simple manga/comic reading platform built with Gin Framework (Go) backend and Next.js frontend. Supports uploading and managing manga.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/projects/nekozane-preview.webp",
    techStack: [
      "Go",
      "Gin",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/LDNVN86/NEKOZANE-DEX",
    githubFrontend: "https://github.com/LDNVN86/NEKOZANEDEX-FE",
    featured: true,
    stars: 1,
    category: "fullstack",
  },
  {
    id: "portfolio",
    title: {
      vi: "Portfolio Cá Nhân",
      en: "Personal Portfolio",
    },
    description: {
      vi: "Website portfolio hiện tại với React + Vite, TailwindCSS, Framer Motion. Hỗ trợ đa ngôn ngữ (vi/en), dark/light mode, và accent color tuỳ chỉnh.",
      en: "This portfolio website built with React + Vite, TailwindCSS, Framer Motion. Supports multi-language (vi/en), dark/light mode, and customizable accent colors.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/MonicaAva.webp",
    techStack: ["React", "Vite", "TailwindCSS", "Framer Motion", "Supabase"],
    liveUrl: "https://ldn86dev.io.vn",
    githubUrl: "https://github.com/LDNVN86/Portfolio-React-Vite",
    featured: true,
    stars: 1,
    category: "frontend",
  },
  {
    id: "muciii-bio",
    title: {
      vi: "Muciii Bio - Trang Giới Thiệu",
      en: "Muciii Bio - Link in Bio",
    },
    description: {
      vi: "Trang bio link phong cách Linktree cho khách hàng. Hiển thị social links, thống kê bán hàng, hỗ trợ dark/light mode và tuỳ chỉnh theme màu sắc.",
      en: "A Linktree-style bio link page for a client. Features social links, sales statistics, dark/light mode toggle, and customizable color themes.",
    },
    thumbnail:
      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/projects/muciii-bio-preview.webp",
    techStack: ["Next.js", "React", "TailwindCSS", "Framer Motion", "Anime.js"],
    liveUrl: "https://muciii-bio.vercel.app/",
    githubUrl: null,
    featured: false,
    stars: 0,
    category: "frontend",
  },
];

export const getLocalizedProjects = (language) =>
  projects.map((project) => ({
    ...project,
    title: project.title[language] || project.title.en,
    description: project.description[language] || project.description.en,
  }));

export default projects;
