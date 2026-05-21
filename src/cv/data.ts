import type { CvDocument } from "./types";
import { list, h2, text, h3, subtitle } from "./helpers";

export const sampleCv: CvDocument = {
  name: "Andrey Kovlyagin",

  content: [
    text([
      "Barcelona, Spain",
      "andrey.kovlyagin@gmail.com",
      "+34 677 255 561",
    ]),

    h2("Objective"),
    text([
      "Full-Stack TypeScript Developer with a background in graphic design, building modern web applications with React, Next.js, and NestJS with end-to-end ownership across frontend, backend, and infrastructure.",
    ]),

    h2("Skills"),
    text(
      [
        "TypeScript, JavaScript",
        "React, Next.js, Astro, RTK, TanStack Query/Table/Form, Tailwind CSS, CSS Modules, Sass",
        "Node.js, NestJS, PostgreSQL, TypeORM, Supabase, Socket.io",
        "Docker, Git, CI/CD (GitHub Actions)",
        "Jest, Vitest, Playwright (E2E, a11y)",
        "UI/UX, complex interfaces, SVG/canvas-based interfaces, Figma, Adobe Creative Suite",
        "n8n, API integrations",
        "AI-assisted engineering (specification design, planning, code review)",
        "Languages: Russian (native), English (B2), Spanish (A2)",
      ],
      { paragraphSpacing: 6 },
    ),

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

    h3("Front-end Developer — Kamina Mental Health Platform"),
    subtitle("Project-based, January 2024"),
    text([
      "Developed a responsive landing page for Kamina, a mental health platform, within one month.",
    ]),
    list([
      "Collaborated directly with stakeholders to refine requirements and ensure alignment with project goals.",
      "Implemented an interactive SVG graphic to enhance user engagement and visual appeal.",
      "Delivered an optimized site, ensuring compatibility across devices and browsers.",
    ]),

    h3("Founder / Full-Stack Engineer — Chains.design"),
    subtitle("Barcelona, March 2023 – Present"),
    text([
      "Designed and developed a full-stack SaaS workflow platform for designers and publishers from scratch.",
    ]),
    list([
      "Developed a complex frontend application using React and Redux Toolkit, including dynamic UI and state management.",
      "Designed and implemented backend architecture using NestJS, TypeORM, and PostgreSQL, including API design and data modeling.",
      "Implemented real-time collaboration features using WebSockets and integrated multiple external APIs.",
      "Set up CI/CD pipelines and containerized deployment using Docker and GitHub Actions on Hetzner infrastructure.",
      "Owned the product end-to-end, including architecture, development, and deployment.",
    ]),

    h3("Web Developer — Tomita Software"),
    subtitle("October 2020 – May 2023"),
    text([
      "Front-end developer at a custom IT solutions provider for SMBs, working on dedicated client project teams across 10 production web applications — greenfield React builds and ongoing UI work on live Symfony and React products.",
    ]),
    list([
      "Built 3 client projects from scratch in React, including marketing landings and in-app dashboards; on greenfield engagements, worked directly with clients alongside their external designers.",
      "Shipped UI and functional updates on existing products: layout systems, templates, CSS, and landing-page markup on Symfony-based sites.",
      "Collaborated with clients and project managers to clarify requirements, prioritize backlog items, and execute PM-scoped deliverables.",
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
