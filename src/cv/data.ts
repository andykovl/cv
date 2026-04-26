import type { CvDocument } from "./types";
import { list, h2, text, h3, subtitle } from "./helpers";


export const sampleCv: CvDocument = {
  name: "Andrey Kovlyagin",

  leftColumn: [
    text([
      "Барселона, Испания",
      "andrey.kovlyagin@gmail.com",
      "+34 677 255 561",
    ]),

    h2("Цель"),
    text([
      "Full-Stack TypeScript-разработчик с опытом в графическом дизайне. Создаю веб-приложения на React, Next.js и NestJS с полным владением frontend, backend и инфраструктурой.",
    ]),

    h2("Навыки"),
    text(
      [
      "TypeScript, JavaScript",
      "React, Next.js, Astro, RTK, TanStack Query/Table/Form, Tailwind CSS, CSS Modules, Sass",
      "Node.js, NestJS, PostgreSQL, TypeORM, Supabase, Socket.io", 
      "Docker, Git, CI/CD (GitHub Actions)",
      "Jest, Vitest, Playwright (E2E, a11y)",
      "UI/UX, сложные интерфейсы, SVG/canvas-интерфейсы, Figma, Adobe Creative Suite",
      "n8n, API-интеграции",
      "AI-assisted engineering (спецификации, планирование, code review)",
      "Языки: русский (родной), английский (B2), испанский (A2)",
    ],
      { paragraphSpacing: 6 },
    ),
  ],

  rightColumn: [
    h2("Опыт работы"),

    h3("Full-Stack Developer — Jupid (Fintech Startup)"),
    subtitle("Барселона, апрель – октябрь 2025"),
    text([
      "Разрабатывал ключевые функции и интеграции для fintech SaaS-платформы с AI-бухгалтерией. Работал напрямую с CTO над backend-интеграциями и основным функционалом продукта.",
    ]),
    list([
      "Разработал production-фичи на Next.js, TypeScript и TanStack Query с фокусом на производительность и поддерживаемость.",
      "Реализовал интеграции с банковскими API (Banno), Stripe, Customer.io и PostHog, обеспечив надёжный поток данных и стабильность системы.",
    ]),

    h3("Founder / Full-Stack Engineer — Chains.design"),
    subtitle("Барселона, март 2023 – настоящее время"),
    text([
      "Спроектировал и разработал с нуля full-stack SaaS-платформу для дизайнеров и издателей."]),
    list([
      "Разработал сложное frontend-приложение на React и Redux Toolkit с динамическим UI и управлением состоянием.",
      "Спроектировал backend-архитектуру на NestJS, TypeORM и PostgreSQL, включая API и модели данных.",
      "Реализовал real-time коллаборацию через WebSockets и интеграции с внешними API.",
      "Настроил CI/CD-пайплайны и контейнеризованный деплой на Docker и GitHub Actions на Hetzner.",
      "Полностью владел продуктом: архитектура, разработка и деплой.",
    ]),

    h3("Графический дизайнер"),
    subtitle("Москва, октябрь 2017 – март 2023"),
    text([
      "Создавал книги, журналы, айдентику и навигационные системы для публичных пространств.",
    ]),
    list([
      "Спроектировал 10+ книг.",
      "Выпустил 30+ номеров журналов.",
      "Подготовил 150+ навигационных стендов для публичных пространств.",
    ]),
  ],
};
