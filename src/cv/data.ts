import type { CvDocument } from "./types";
import { list, h2, text, h3, subtitle } from "./helpers";


export const sampleCv: CvDocument = {
  name: "Andrey Kovlyagin",

  leftColumn: [
    text([
      "Barcelona, Spain",
      "andrey.kovlyagin@gmail.com",
      "+34 677 255 561",
    ]),

    h2("Objective"),
    text([
      "Frontend focused Full-Stack Developer with a background in graphic design, building modern web applications with React, Next.js, and NestJS with end-to-end ownership across frontend, backend, and infrastructure.",
    ]),

    h2("Skills"),
    text(
      [
      "TypeScript, JavaScript",
      "React, Next.js, Astro, RTK, TanStack Query/Table/Form, CSS3/SCSS, Tailwind CSS, CSS Modules, Shadcn",
      "UI/UX, complex interfaces, SVG/canvas-based interfaces, Figma, Adobe Creative Suite",
      "Core Web Vitals, lazy loading, virtualization, bundle analysis",
      "Jest, Vitest, Playwright (E2E, a11y)",
      "Node.js, NestJS, PostgreSQL, TypeORM, Supabase, Socket.io, API integrations", 
      "Docker, Git, CI/CD (GitHub Actions)",
      "AI-assisted engineering (specification design, planning, code review)",
      "Languages: Russian (native), English (B2), Spanish (A2)",
    ],
      { paragraphSpacing: 6 },
    ),
  ],

  rightColumn: [
    h2("Professional Experience"),

    h3("Full-Stack Developer — Jupid (Fintech Startup)"),
    subtitle("Barcelona, April – October 2025"),
    text([
      "Built core features and integrations for an early-stage fintech SaaS platform focused on AI-driven accounting. Worked directly with the CTO to design and implement backend integrations and core product functionality.",
    ]),
    list([
      "Developed production frontend features using Next.js, TypeScript, and TanStack Query, focusing on performance and maintainability.",
      "Implemented and maintained integrations with banking APIs (Banno), Stripe, Customer.io, and PostHog, ensuring reliable data flow and system stability.",
    ]),

    h3("Founder / Full-Stack Engineer — Chains.design"),
    subtitle("Barcelona, March 2023 – Present"),
    text([
      "Designed and developed a full-stack SaaS workflow platform for designers and publishers from scratch."]),
      list([
        "Built complex React + TypeScript interfaces (tables, canvas, PDF workflows) with predictable client state using Redux Toolkit and Zustand.",
        "Implemented advanced UI interactions: edge-aware drag-and-drop reordering, zoom/pan graph canvas, and polished state-driven micro-interactions.",
        "Improved frontend performance with PDF virtualization (TanStack Virtual + PDF.js), route-level lazy loading, code splitting, and bundle analysis/manual chunking.",
        "Developed real-time collaboration features with WebSockets, including live annotation sync, presence/cursors, and reconnect-safe behavior.",
        "Delivered full-stack product ownership: NestJS + PostgreSQL backend architecture, API design, and CI/CD with Docker + GitHub Actions on Hetzner.",
      ]),

    h3("Graphic Designer"),
    subtitle("Moscow, October 2017 – March 2023"),
    text([
      "Designed editorial, branding, and wayfinding systems for public spaces.",
    ]),
    list([
      "Designed 10+ books.",
      "Issued 30+ magazines.",
      "Prepared 150+ wayfinding stands for public spaces.",
    ]),
  ],
};
