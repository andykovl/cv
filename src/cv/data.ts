import type { CvDocument } from "./types";
import { list, h2, text, h3, richText, subtitle } from "./helpers";

export const sampleCv: CvDocument = {
  name: "Andrey Kovlyagin",

  content: [
    richText([
      [{ text: "Barcelona, Spain" }],
      [
        {
          text: "andrey.kovlyagin@gmail.com",
          url: "mailto:andrey.kovlyagin@gmail.com",
        },
        { text: "  · " },
        { text: "+34 677 255 561", url: "tel:+34677255561" },
      ],
      [
        {
          text: "github.com/andykovl",
          url: "https://github.com/andykovl",
        },
        { text: " · " },
        {
          text: "linkedin.com/in/andrey-kovlyagin",
          url: "https://www.linkedin.com/in/andrey-kovlyagin",
        },
        { text: " · " },
        { text: "chains.design", url: "https://chains.design" },
      ],
    ]),

    h2("Professional Summary"),
    text([
      "Frontend / Product Engineer building React and Next.js interfaces for SaaS products. I combine TypeScript engineering with a graphic-design background to make complex workflows and real-time collaboration clear and usable. As a product founder, I own UX, frontend architecture, testing, and delivery end to end, and work across Node.js APIs when needed.",
    ]),

    h2("Skills"),
    text(
      [
        "Frontend: TypeScript, JavaScript, React, Next.js, Vite, Astro, Tailwind CSS",
        "UI Architecture & State: TanStack Query, Zustand, Redux Toolkit, TanStack Table, Storybook, real-time interfaces",
        "UX & Design: responsive UI, accessibility testing, SVG/canvas/PDF interfaces, Figma, Adobe Creative Suite",
        "Browser Extensions: Chrome Extensions, Manifest V3, WXT, Chrome APIs, service workers",
        "Testing & Observability: Jest, Vitest, Playwright (E2E, accessibility), Sentry, PostHog",
        "Backend & APIs: Node.js, NestJS, PostgreSQL, TypeORM, Supabase Auth/Storage, Socket.IO, REST/OpenAPI",
        "Delivery: Docker, AWS fundamentals, Git, pnpm workspaces, CI/CD (GitHub Actions), Linux/Nginx",
        "AI-assisted Development: coding agents for specifications, implementation, testing, code review, and security audits",
        "Languages: English (B2), Russian (native), Spanish (A2)",
      ],
    ),

    h2("Professional Experience"),

    h3("Founder / Full-Stack Engineer (Frontend Focus) — Chains.design"),
    subtitle("Barcelona, March 2023 – Present"),
    text([
      "Founded and built a private-beta workflow SaaS for editorial and design teams, used in production by a three-person external pilot team for two years. Own product discovery, UX, frontend architecture, and delivery across the stack.",
    ]),
    list([
      "Designed and built a visual DAG workflow editor with reusable templates, parallel branches, merge points, role-based actions, and progress states derived from server data.",
      "Built a collaborative PDF review UI with virtualized rendering, live presence and cursors, optimistic annotation editing, version-aware snapshots, Socket.IO reconciliation, and native-annotation PDF export.",
      "Structured frontend state with TanStack Query for server data and Zustand for interaction state, using optimistic updates, targeted cache invalidation, and resilient real-time synchronization.",
      "Established frontend quality gates with Vitest, Storybook, Playwright E2E and accessibility checks; used Sentry and PostHog to observe errors and product usage.",
      "Built supporting NestJS/PostgreSQL APIs with typed HTTP/WebSocket contracts, tenant-aware authorization, and Supabase Auth/Storage; delivered through Docker and GitHub Actions.",
    ]),

    h3("Full-Stack Developer — Jupid (Fintech Startup)"),
    subtitle("Barcelona, April – October 2025"),
    text([
      "Worked directly with the CTO on product features for an early-stage AI accounting SaaS.",
    ]),
    list([
      "Shipped production UI features with Next.js, TypeScript, and TanStack Query, focusing on performance and maintainability.",
      "Implemented supporting integrations with banking APIs (Banno), Stripe, Customer.io, and PostHog to keep product data flows reliable.",
    ]),

    h3("Frontend Developer — Kamina Mental Health Platform"),
    subtitle("Project-based, January 2024"),
    text([
      "Designed and developed a responsive landing page for a mental health platform within one month.",
    ]),
    list([
      "Collaborated directly with stakeholders to refine requirements and ensure alignment with project goals.",
      "Built an interactive SVG graphic and refined the page's visual experience.",
      "Optimized the site for different screen sizes and browsers.",
    ]),

    h3("Web Developer — Tomita Software"),
    subtitle("October 2020 – May 2023"),
    text([
      "Maintained the UI of 10 client web platforms, diagnosing layout and functional issues across React and Symfony codebases in a ticket-driven workflow.",
    ]),
    list([
      "Built several marketing sites from scratch; day-to-day work focused on production maintenance—small functional updates, template/CSS adjustments.",
      "Collaborated with stakeholders to clarify requirements and prioritize backlog items.",
    ]),

    h3("Graphic Designer"),
    subtitle("Moscow, October 2017 – March 2023"),
    text([
      "Designed editorial, branding, and wayfinding systems for public spaces: 10+ books, 30+ magazines, and 150+ wayfinding stands.",
    ]),
  ],
};
