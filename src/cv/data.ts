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
      "Full-Stack TypeScript Developer with a background in graphic design, building modern web applications with React, Next.js, and NestJS. Passionate about creating intuitive and high-quality user experiences.",
    ]),

    h2("Skills"),
    text(
      [
      "TypeScript, JavaScript",
      "React, Next.js, Astro, RTK, TanStack Query/Table/Form,Tailwind CSS, CSS Modules, Sass",
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
  ],

  rightColumn: [
    h2("Professional Experience"),

    h3("Full-Stack Developer — Jupid (Fintech Startup)"),
    subtitle("Barcelona, April – October 2025"),
    text([
      "Contributed to the early-stage development of a fintech SaaS platform focused on AI-accounting. Collaborated closely with the CTO to build integrations and enhance the product's technical foundation.",
    ]),
    list([
      "Developed front-end modules using Next.js, TypeScript, TailwindCSS, and TanStack Query/Table.",
      "Integrated a Banno banking API. Supported integrations with Stripe, Customer.io, and PostHog.",
    ]),

    h3("Founder / Full-Stack Engineer — Chains.design"),
    subtitle("Barcelona, March 2023 – Present"),
    text([
      "Designed and built a SaaS workflow platform for designers and publishers."]),
    list([
      "Built the front-end with React and RTK.",
      "Developed backend services with NestJS, TypeORM and PostgreSQL.",
      "Real-time collaboration features and API integrations.",
      "Containerized infra using Docker on Hetzner via GitHub Actions",
    ]),

    h3("Front-end Developer — Kamina Mental Health Platform"),
    subtitle("Project based, January 2024"),
    text([
      "Developed a responsive landing page for Kamina, a mental health platform, within one month. Collaborated directly with stakeholders to refine requirements and ensure alignment with project goals.",
    ]),
    list([
      "Implemented an interactive SVG graphic to enhance user engagement and visual appeal.",
      "Delivered an optimized site, ensuring compatibility across devices and browsers.",
    ]),

    h3("Graphic Designer"),
    subtitle("Moscow, October 2017 – March 2023"),
    text([
      "Worked on editorial design, branding, and wayfinding systems for public spaces.",
    ]),
    list([
      "Designed 10+ books.",
      "Issued 30+ magazines.",
      "Prepared 150+ wayfinding stands for public spaces.",
    ]),
  ],
};
