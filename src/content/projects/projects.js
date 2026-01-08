/**
 * Projects data for portfolio
 * All project information including GitHub repos
 */

export const projects = [
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
    liveUrl: "https://ldn86.dev",
    githubUrl: "https://github.com/LDNVN86/Portfolio-React-Vite",
    featured: true,
    stars: 1,
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
