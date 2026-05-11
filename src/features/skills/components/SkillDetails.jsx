export const skillGroupsConfig = [
  {
    key: "programmingLanguages",
    skillKeys: [
      "javascript",
      "typescript",
      "go",
      "cpp",
      "java",
      "html5",
      "css3",
    ],
  },
  {
    key: "frontendLibraries",
    skillKeys: ["react", "next", "tailwind", "sass"],
  },
  {
    key: "backendFrameworks",
    skillKeys: [
      "gin",
      "fiber",
      "nodejs",
      "nest",
      "express",
      "spring",
    ],
  },
  {
    key: "databases",
    skillKeys: ["postgresql", "redis", "mongodb", "mysql"],
  },
  {
    key: "messagingInfra",
    skillKeys: ["centrifugo", "socketio", "kafka"],
  },
  {
    key: "devopsTools",
    skillKeys: ["docker", "cloudflare", "githubActions", "linux", "ubuntu"],
  },
  {
    key: "aiTooling",
    skillKeys: ["claudeCode", "cursor", "copilot"],
  },
  {
    key: "tooling",
    skillKeys: ["postman", "dbeaver", "vscode"],
  },
];

export const skillsDictionary = {
  javascript: {
    name: "JavaScript",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    proficiency: 85,
    badge: {
      vi: "Ngôn ngữ động",
      en: "Dynamic language",
    },
    description: {
      vi: "Ngôn ngữ cốt lõi của web, linh hoạt và mạnh mẽ cho cả phía client lẫn server.",
      en: "Core language of the web; versatile for both client and server development.",
    },
  },
  typescript: {
    name: "TypeScript",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    link: "https://www.typescriptlang.org/",
    proficiency: 80,
    badge: {
      vi: "JavaScript + Types",
      en: "Typed JavaScript",
    },
    description: {
      vi: "Bổ sung hệ thống kiểu mạnh mẽ giúp phát hiện lỗi sớm và tối ưu codebase lớn.",
      en: "Adds a robust type system to catch bugs early and scale large codebases.",
    },
  },
  go: {
    name: "Go",
    image: "https://blog.golang.org/go-brand/Go-Logo/PNG/Go-Logo_Blue.png",
    link: "https://go.dev/",
    proficiency: 80,
    badge: {
      vi: "Ngôn ngữ chính cho backend",
      en: "Primary backend language",
    },
    description: {
      vi: "Ngôn ngữ backend chính cho cả Tavigo (Go 1.25 + Gin) và EsimVietNam (Go + Fiber + sqlc). Daily stack: pgx v5, zap/zerolog, goose, errgroup, validator/v10, prometheus/client_golang.",
      en: "Primary backend language for both Tavigo (Go 1.25 + Gin) and EsimVietNam (Go + Fiber + sqlc). Daily stack: pgx v5, zap/zerolog, goose, errgroup, validator/v10, prometheus/client_golang.",
    },
  },
  cpp: {
    name: "C/C++",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    link: "https://en.cppreference.com/w/",
    badge: {
      vi: "Hiệu năng cao",
      en: "High performance",
    },
    description: {
      vi: "Cơ sở cho lập trình hệ thống, driver và các bài toán thuật toán tối ưu.",
      en: "Foundation for systems programming, drivers, and performance-critical algorithms.",
    },
  },
  java: {
    name: "Java",
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    link: "https://www.java.com/",
    badge: {
      vi: "OOP",
      en: "OOP",
    },
    description: {
      vi: "Ngôn ngữ hướng đối tượng đa nền tảng, chuẩn mực trong enterprise và Android.",
      en: "Cross-platform OOP staple across enterprise systems and Android development.",
    },
  },
  html5: {
    name: "HTML5",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    badge: {
      vi: "Markup",
      en: "Markup",
    },
    description: {
      vi: "Chuẩn cấu trúc của web với semantic element và khả năng media mạnh mẽ.",
      en: "Defines the semantic structure of the web with built-in media capabilities.",
    },
  },
  css3: {
    name: "CSS3",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    badge: {
      vi: "Styling",
      en: "Styling",
    },
    description: {
      vi: "Ngôn ngữ trình bày giúp giao diện web đẹp, responsive và nhiều animation.",
      en: "Presentation layer for beautiful, responsive, animated web interfaces.",
    },
  },
  react: {
    name: "React",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    link: "https://react.dev/",
    proficiency: 85,
    badge: {
      vi: "UI Library",
      en: "UI Library",
    },
    description: {
      vi: "Thư viện UI hiện đại với component hook, xây dựng giao diện giàu tương tác.",
      en: "Modern component-based UI library with hooks and vibrant ecosystem.",
    },
  },
  next: {
    name: "Next.js 16",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    link: "https://nextjs.org/",
    proficiency: 85,
    badge: {
      vi: "Fullstack React",
      en: "Fullstack React",
    },
    description: {
      vi: "Next.js 16.2 + React 19.2 — App Router, RSC, Server Actions. Tavigo có 3 app riêng (USER · ADMIN turbopack · AFF), mỗi app tự BFF forward cookie httponly tới BE. Stack đi kèm: @base-ui/react + radix-ui, shadcn 4, dnd-kit, react-hook-form + zod.",
      en: "Next.js 16.2 + React 19.2 — App Router, RSC, Server Actions. Tavigo runs three separate apps (USER · ADMIN turbopack · AFF), each with its own BFF forwarding httponly cookies to the BE. Companion stack: @base-ui/react + radix-ui, shadcn 4, dnd-kit, react-hook-form + zod.",
    },
  },
  tailwind: {
    name: "Tailwind CSS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    link: "https://tailwindcss.com/",
    badge: {
      vi: "Utility-first",
      en: "Utility-first",
    },
    description: {
      vi: "Hệ thống utility giúp build UI nhanh, responsive và nhất quán.",
      en: "Utility-first CSS framework for rapid, consistent, responsive design.",
    },
  },
  sass: {
    name: "Sass",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg",
    link: "https://sass-lang.com/",
    badge: {
      vi: "Preprocessor",
      en: "Preprocessor",
    },
    description: {
      vi: "Tiền xử lý CSS với biến, mixin và module hoá code một cách khoa học.",
      en: "CSS preprocessor with variables, mixins, and clean modular structure.",
    },
  },
  nodejs: {
    name: "Node.js",
    image: "https://nodejs.org/static/images/logo.svg",
    link: "https://nodejs.org/",
    proficiency: 80,
    badge: {
      vi: "Runtime",
      en: "Runtime",
    },
    description: {
      vi: "Runtime JavaScript phía server, nền tảng của kiến trúc event-driven hiện đại.",
      en: "Server-side JavaScript runtime powering modern event-driven backends.",
    },
  },
  nest: {
    name: "NestJS",
    image: "https://nestjs.com/img/logo-small.svg",
    link: "https://nestjs.com/",
    proficiency: 75,
    badge: {
      vi: "Node Framework",
      en: "Node Framework",
    },
    description: {
      vi: "Framework backend kiểu module, hỗ trợ TypeScript và kiến trúc sạch cho API.",
      en: "Modular Node.js framework with TypeScript-first architecture for clean APIs.",
    },
  },
  express: {
    name: "Express.js",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    link: "https://expressjs.com/",
    badge: {
      vi: "REST API",
      en: "REST API",
    },
    description: {
      vi: "Web framework tối giản, linh hoạt cho Node.js, chuẩn de-facto của REST API.",
      en: "Minimal, battle-tested web framework for building REST APIs on Node.js.",
    },
  },
  gin: {
    name: "Gin",
    image:
      "https://raw.githubusercontent.com/gin-gonic/logo/master/color.png",
    link: "https://gin-gonic.com/",
    proficiency: 80,
    badge: {
      vi: "Go Web Framework",
      en: "Go Web Framework",
    },
    description: {
      vi: "Framework HTTP chính của Tavigo — modular monolith 60+ packages, middleware chain RequestID → Logger → Recovery → CORS → auth gates, kèm validator/v10.",
      en: "Primary HTTP framework for Tavigo — a 60+ package modular monolith with a RequestID → Logger → Recovery → CORS → auth middleware chain plus validator/v10.",
    },
  },
  fiber: {
    name: "Fiber",
    image: "https://docs.gofiber.io/img/logo.svg",
    link: "https://gofiber.io/",
    proficiency: 75,
    badge: {
      vi: "Go Web Framework",
      en: "Go Web Framework",
    },
    description: {
      vi: "Framework Go hiệu năng cao xây trên fasthttp — backbone của EsimVietNam (B2B đại lý), kết hợp pgx + sqlc cho type-safe SQL.",
      en: "High-performance Go framework on top of fasthttp — backbone of EsimVietNam (B2B agent network), paired with pgx + sqlc for type-safe SQL.",
    },
  },
  centrifugo: {
    name: "Centrifugo",
    image:
      "https://avatars.githubusercontent.com/u/8636696?s=200&v=4",
    link: "https://centrifugal.dev/",
    proficiency: 70,
    badge: {
      vi: "Realtime / PubSub",
      en: "Realtime / PubSub",
    },
    description: {
      vi: "Realtime server cho EsimVietNam — push balance/inventory updates cho đại lý qua centrifuge-js. Chọn thay Socket.io vì scale ngang built-in, JWT auth native, channel namespaces.",
      en: "Realtime server for EsimVietNam — pushing balance/inventory updates to agents via centrifuge-js. Picked over Socket.io for built-in horizontal scaling, native JWT auth, and channel namespaces.",
    },
  },
  socketio: {
    name: "Socket.io",
    image: "https://socket.io/images/logo.svg",
    link: "https://socket.io/",
    proficiency: 70,
    badge: {
      vi: "Realtime",
      en: "Realtime",
    },
    description: {
      vi: "Thư viện realtime bidirectional dùng ở Shop Acc Game — live order status, notification, chat. Đối tác bên Node/NestJS.",
      en: "Bidirectional realtime library used on Shop Acc Game — live order status, notifications, chat. Pairs with the Node/NestJS stack.",
    },
  },
  spring: {
    name: "Spring Boot",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg",
    link: "https://spring.io/projects/spring-boot",
    badge: {
      vi: "Java Backend",
      en: "Java Backend",
    },
    description: {
      vi: "Nền tảng Java mạnh mẽ tạo microservice, tích hợp tốt với Spring Ecosystem.",
      en: "Powerful Java platform for building microservices with tight Spring ecosystem integration.",
    },
  },
  mongodb: {
    name: "MongoDB",
    image:
      "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
    link: "https://www.mongodb.com/",
    proficiency: 65,
    badge: {
      vi: "NoSQL",
      en: "NoSQL",
    },
    description: {
      vi: "Cơ sở dữ liệu tài liệu linh hoạt, dễ mở rộng theo chiều ngang.",
      en: "Document database built for horizontal scale and flexible schemas.",
    },
  },
  mysql: {
    name: "MySQL",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
    link: "https://www.mysql.com/",
    badge: {
      vi: "SQL",
      en: "SQL",
    },
    description: {
      vi: "Hệ quản trị cơ sở dữ liệu quan hệ phổ biến, dễ triển khai.",
      en: "Widely adopted relational database engine known for stability and tooling.",
    },
  },
  postgresql: {
    name: "PostgreSQL 16",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    link: "https://www.postgresql.org/",
    proficiency: 80,
    badge: {
      vi: "SQL chính + pgvector",
      en: "Primary SQL + pgvector",
    },
    description: {
      vi: "CSDL chính cho Tavigo/EsimVietNam — Postgres 16 + pgvector (chuẩn bị phase AI/RAG), uuid_v7 custom function, goose migrations (~91 file), pgx v5 + sqlc cho type-safe SQL, extensions pgcrypto/citext/btree_gist/btree_gin.",
      en: "Primary DB for Tavigo/EsimVietNam — Postgres 16 + pgvector (prepping for AI/RAG), custom uuid_v7 function, ~91 goose migrations, pgx v5 + sqlc for type-safe SQL, extensions pgcrypto/citext/btree_gist/btree_gin.",
    },
  },
  redis: {
    name: "Redis 7",
    image: "https://cdn.worldvectorlogo.com/logos/redis.svg",
    link: "https://redis.io/",
    proficiency: 75,
    badge: {
      vi: "Cache · Rate-limit · Lock",
      en: "Cache · Rate-limit · Lock",
    },
    description: {
      vi: "Use cases hàng ngày: rate-limit per IP/agent (TTL 60s), idempotency cache (24h), wallet balance cache (30s), inventory count cache (10s), JWT blacklist, distributed lock, admin session 7d, catalog cache + sync state.",
      en: "Daily use cases: rate-limit per IP/agent (60s TTL), idempotency cache (24h), wallet balance cache (30s), inventory count cache (10s), JWT blacklist, distributed locks, 7-day admin sessions, catalog cache + sync state.",
    },
  },
  kafka: {
    name: "Apache Kafka",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Apache_kafka.svg",
    link: "https://kafka.apache.org/",
    proficiency: 60,
    badge: {
      vi: "Event Streaming",
      en: "Event Streaming",
    },
    description: {
      vi: "Event streaming cho integration events & side effects — nằm trong target architecture của Tavigo (modular monolith), đang là nền tảng kiến thức để mở rộng khi tách bounded context.",
      en: "Event streaming for integration events & side effects — part of Tavigo's modular-monolith target architecture; foundation knowledge for expanding bounded contexts later.",
    },
  },
  docker: {
    name: "Docker",
    image:
      "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    link: "https://www.docker.com/",
    proficiency: 75,
    badge: {
      vi: "Container",
      en: "Container",
    },
    description: {
      vi: "Đóng gói service, compose môi trường dev, base image cho deployment Production.",
      en: "Packaging services, composing dev environments, base images for production deployments.",
    },
  },
  cloudflare: {
    name: "Cloudflare",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg",
    link: "https://www.cloudflare.com/",
    proficiency: 70,
    badge: {
      vi: "CDN / Edge",
      en: "CDN / Edge",
    },
    description: {
      vi: "Cloudflare Turnstile (anti-bot cho register/login/forgot/reset) + R2 (S3-compatible storage, upload avatar/banner/QR/invoice qua aws-sdk-go-v2) + DNS/CDN cho Tavigo.",
      en: "Cloudflare Turnstile (anti-bot for register/login/forgot/reset) + R2 (S3-compatible storage, uploads avatars/banners/QRs/invoices via aws-sdk-go-v2) + DNS/CDN for Tavigo.",
    },
  },
  githubActions: {
    name: "GitHub Actions",
    image:
      "https://avatars.githubusercontent.com/u/44036562?s=200&v=4",
    link: "https://github.com/features/actions",
    proficiency: 75,
    badge: {
      vi: "CI / CD",
      en: "CI / CD",
    },
    description: {
      vi: "CI/CD pipeline cho EsimVietNam: lint + test Go/Node, build Docker image, deploy lên VPS qua SSH. Secrets quản lý qua GH Actions Secrets (chỉ SSH key, không đẩy app secret).",
      en: "CI/CD pipeline for EsimVietNam: lint + test Go/Node, build Docker images, deploy to VPS via SSH. Secrets managed through GH Actions Secrets (SSH keys only — no app secrets pushed).",
    },
  },
  linux: {
    name: "Linux",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
    link: "https://www.kernel.org/",
    badge: {
      vi: "Hệ điều hành",
      en: "Operating System",
    },
    description: {
      vi: "Quản lý server và môi trường phát triển trên nền tảng Linux command-line.",
      en: "Managing servers and development environments through the Linux command-line.",
    },
  },
  ubuntu: {
    name: "Ubuntu",
    image: "https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png",
    link: "https://ubuntu.com/",
    badge: {
      vi: "Linux distro",
      en: "Linux distro",
    },
    description: {
      vi: "Distro ưa thích cho workstation và container host với apt ecosystem.",
      en: "Favorite distro for workstations and container hosts with the apt ecosystem.",
    },
  },
  claudeCode: {
    name: "Claude Code",
    image:
      "https://www.anthropic.com/favicon.ico",
    link: "https://www.anthropic.com/claude-code",
    proficiency: 80,
    badge: {
      vi: "Vibe Coding",
      en: "Vibe Coding",
    },
    description: {
      vi: "Trợ lý AI CLI mình dùng hằng ngày cho code review, refactor, debug và sinh boilerplate.",
      en: "AI CLI assistant I use daily for code review, refactoring, debugging, and scaffolding.",
    },
  },
  cursor: {
    name: "Cursor",
    image:
      "https://cursor.sh/favicon.ico",
    link: "https://cursor.sh/",
    proficiency: 70,
    badge: {
      vi: "AI Editor",
      en: "AI Editor",
    },
    description: {
      vi: "Editor AI-native — pair-programming, multi-file edit, agent mode khi cần workflow nhanh.",
      en: "AI-native editor — pair programming, multi-file edits, agent mode for rapid workflows.",
    },
  },
  copilot: {
    name: "GitHub Copilot",
    image:
      "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
    link: "https://github.com/features/copilot",
    proficiency: 70,
    badge: {
      vi: "AI Pair",
      en: "AI Pair",
    },
    description: {
      vi: "Gợi ý inline + chat trong IDE, hỗ trợ tốc độ viết code và khám phá API mới.",
      en: "Inline suggestions + IDE chat — accelerates coding and helps explore unfamiliar APIs.",
    },
  },
  postman: {
    name: "Postman",
    image: "https://www.svgrepo.com/show/354202/postman-icon.svg",
    link: "https://www.postman.com/",
    badge: {
      vi: "API client",
      en: "API client",
    },
    description: {
      vi: "Thiết kế, kiểm thử và tự động hoá quy trình API nhanh chóng.",
      en: "Designing, testing, and automating API workflows with ease.",
    },
  },
  dbeaver: {
    name: "DBeaver",
    image: "https://dbeaver.com/img/dbeaver-head.png",
    link: "https://dbeaver.io/",
    badge: {
      vi: "DB Tool",
      en: "DB Tool",
    },
    description: {
      vi: "IDE đa cơ sở dữ liệu, trực quan hoá schema và truy vấn hiệu quả.",
      en: "Universal database IDE for visualising schemas and running queries efficiently.",
    },
  },
  vscode: {
    name: "Visual Studio Code",
    image: "https://code.visualstudio.com/assets/images/code-stable.png",
    link: "https://code.visualstudio.com/",
    badge: {
      vi: "Editor",
      en: "Editor",
    },
    description: {
      vi: "Trình soạn thảo chủ lực với hệ sinh thái extension phong phú cho mọi stack.",
      en: "Primary editor with a vast extension ecosystem for every stack.",
    },
  },
};
