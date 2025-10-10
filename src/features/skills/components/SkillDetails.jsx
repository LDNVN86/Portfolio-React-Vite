export const skillGroupsConfig = [
  {
    key: "programmingLanguages",
    skillKeys: ["javascript", "typescript", "go", "cpp", "java", "html5", "css3"],
  },
  {
    key: "frontendLibraries",
    skillKeys: ["react", "next", "tailwind", "sass"],
  },
  {
    key: "backendFrameworks",
    skillKeys: ["nodejs", "nest", "express", "spring", "gorillaMux"],
  },
  {
    key: "databases",
    skillKeys: ["mongodb", "mysql", "postgresql"],
  },
  {
    key: "devopsTools",
    skillKeys: ["linux", "ubuntu"],
  },
  {
    key: "tooling",
    skillKeys: ["postman", "dbeaver", "vscode"],
  },
];

export const skillsDictionary = {
  javascript: {
    name: "JavaScript",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    link: "https://www.typescriptlang.org/",
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
    badge: {
      vi: "Ngôn ngữ biên dịch",
      en: "Compiled language",
    },
    description: {
      vi: "Go (Golang) nổi bật với tốc độ, concurrency đơn giản và hệ sinh thái microservices.",
      en: "Go (Golang) excels at performance, straightforward concurrency, and microservices.",
    },
  },
  cpp: {
    name: "C/C++",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
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
    image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
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
    name: "Next.js",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    link: "https://nextjs.org/",
    badge: {
      vi: "Fullstack React",
      en: "Fullstack React",
    },
    description: {
      vi: "Framework React hỗ trợ SSR, SSG, routing mạnh mẽ và tối ưu SEO tự động.",
      en: "React framework providing SSR, SSG, powerful routing, and automatic SEO optimisations.",
    },
  },
  tailwind: {
    name: "Tailwind CSS",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg",
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
  spring: {
    name: "Spring Boot",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg",
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
  gorillaMux: {
    name: "Gorilla Mux",
    image: "https://raw.githubusercontent.com/gorilla/mux/master/assets/mux-logo.png",
    link: "https://github.com/gorilla/mux",
    badge: {
      vi: "Go Router",
      en: "Go Router",
    },
    description: {
      vi: "Router HTTP linh hoạt trong Go với middleware, route matching mạnh mẽ.",
      en: "Idiomatic Go HTTP router featuring expressive routing and middleware support.",
    },
  },
  mongodb: {
    name: "MongoDB",
    image: "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
    link: "https://www.mongodb.com/",
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
    name: "PostgreSQL",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    link: "https://www.postgresql.org/",
    badge: {
      vi: "SQL nâng cao",
      en: "Advanced SQL",
    },
    description: {
      vi: "CSDL quan hệ mạnh mẽ với JSONB, CTE và tính năng mở rộng phong phú.",
      en: "Robust relational database with JSONB, CTEs, and extensive extension support.",
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
    image: "https://dbeaver.io/wp-content/uploads/2016/11/beaver-head.png",
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
