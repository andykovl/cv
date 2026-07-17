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
      "Full-Stack TypeScript Engineer and product founder with a background in graphic design, building and operating complex SaaS products across frontend, backend, and infrastructure. Agent-first in daily development: I turn product requirements into specifications and use coding agents as the primary implementation interface while owning architecture, verification, and production outcomes.",
    ]),

    h2("Skills"),
    text(
      [
        "Core: TypeScript, JavaScript",
        "Frontend: React, Next.js, Vite, Astro, Redux Toolkit, TanStack Query, TanStack Table, Zustand, Storybook, Tailwind CSS",
        "Backend & Data: Node.js, NestJS, PostgreSQL, TypeORM, Supabase Auth/Storage, Socket.IO, REST/OpenAPI",
        "Testing: Jest, Vitest, Playwright (E2E, accessibility)",
        "Platform: Docker, Git, pnpm workspaces, CI/CD (GitHub Actions), Linux/Nginx",
        "Product & Design: UI/UX, complex interfaces, SVG/canvas/PDF interfaces, Figma, Adobe Creative Suite",
        "Integrations & Automation: API integrations, n8n, Sentry, PostHog",
        "Agentic Engineering: coding agents as the primary daily implementation interface for specification design, planning, implementation, testing, code review, and security audits",
        "Languages: English (native), Russian (native), Spanish (B1)",
      ],
    ),

    h2("Professional Experience"),

    h3("Founder / Full-Stack Engineer — Chains.design"),
    subtitle("Barcelona, March 2023 – Present"),
    text([
      "Built and operate a private-beta, multi-tenant workflow SaaS for editorial and design teams, used in production by a three-person external pilot team for two years, while owning product discovery, UX, architecture, development, and infrastructure end to end.",
    ]),
    list([
      "Designed a visual DAG workflow builder with reusable templates, parallel branches and merge points, phase roles, per-work assignments, and a server-authoritative runtime that derives status and actionability from commits and approvals.",
      "Built a real-time collaborative PDF review workspace with virtualized rendering, live presence and cursors, optimistic annotation editing, Socket.IO reconciliation, version-aware snapshots, and native-annotation PDF export.",
      "Designed a scalable frontend architecture using TanStack Query for server state and Zustand for interaction state, with optimistic updates, targeted cache invalidation, and resilient real-time synchronization.",
      "Designed a NestJS/PostgreSQL backend with TypeORM, shared typed HTTP/WebSocket contracts, tenant-aware authorization, Supabase Auth/Storage and hardened file handling.",
      "Integrated Sentry and PostHog across client and server for observability and product analytics, and built secure Telegram account-linking and notification workflows with one-time tokens and transactional email delivery through Resend.",
      "Established layered quality gates with Vitest, PostgreSQL-backed module and integration tests, Playwright full-stack E2E, Storybook, and Biome; built selective Docker/GitHub Actions delivery through GHCR to Hetzner with health checks and route smoke tests.",
    ]),

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

    h3("Web Developer — Tomita Software"),
    subtitle("October 2020 – May 2023"),
    text([
      "Supported 10 client web platforms in a ticket-driven workflow: diagnosing UI/layout issues and shipping incremental fixes across Symfony and React codebases.",
    ]),
    list([
      "Built several marketing sites from scratch; day-to-day work focused on production maintenance—small functional updates, template/CSS adjustments.",
      "Collaborated with stakeholders to clarify requirements and prioritize backlog items.",
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
