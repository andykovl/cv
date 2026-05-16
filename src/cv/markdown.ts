import type { CvDocument, CvElement } from "./types";

function elementToMarkdown(el: CvElement): string[] {
  switch (el.type) {
    case "h1":
      return [`# ${el.text}`];

    case "h2":
      return [`## ${el.text}`];

    case "h3":
      return [`### ${el.text}`];

    case "subtitle":
      return [`_${el.text}_`];

    case "text":
      return [el.text.map((line) => `${line}  `).join("\n").trimEnd()];

    case "list":
      return [el.items.map((item) => `- ${item}`).join("\n")];
  }
}

export function cvToMarkdown(cv: CvDocument): string {
  const blocks = [`# ${cv.name}`, ...cv.content.flatMap(elementToMarkdown)];

  return `${blocks.join("\n\n").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`;
}

export function openCvMarkdown(cv: CvDocument): void {
  const markdown = cvToMarkdown(cv);
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  window.open(url, "_blank", "noopener,noreferrer");

  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
