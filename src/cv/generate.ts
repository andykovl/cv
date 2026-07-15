import { jsPDF } from "jspdf";
import { splitTextWithHyphenation } from "./utils";
import type { CvDocument, CvElement, CvLayoutConfig } from "./types";

export async function generateCvPdfBlob(
  config: CvLayoutConfig,
  cv: CvDocument,
): Promise<Blob> {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const {
    fontFamily,
    baseFontSize,
    h1FontSize,
    h2FontSize,
    lineHeight,
    subtitleColor,
    pageMargin,
  } = config;

  const contentWidth = pageWidth - pageMargin.left - pageMargin.right;
  const contentX = pageMargin.left;
  const bottomY = pageHeight - pageMargin.bottom;

  let cursorY = pageMargin.top;

  const lineHeightFor = (fontSize: number) => fontSize * lineHeight;

  const addPage = () => {
    doc.addPage();
    cursorY = pageMargin.top;
  };

  const ensureSpace = (height: number) => {
    if (cursorY > pageMargin.top && cursorY + height > bottomY) {
      addPage();
    }
  };

  const addVerticalSpace = (height: number) => {
    if (cursorY + height > bottomY) {
      addPage();
      return;
    }

    cursorY += height;
  };

  const writeLines = (lines: string[], x: number, fontSize: number) => {
    const lineHeightPt = lineHeightFor(fontSize);

    for (const line of lines) {
      ensureSpace(lineHeightPt);
      doc.text(line, x, cursorY, { lineHeightFactor: lineHeight });
      cursorY += lineHeightPt;
    }
  };

  const renderElement = (el: CvElement) => {
    switch (el.type) {
      case "h1": {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(h1FontSize);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(el.text, contentWidth);
        ensureSpace(lines.length * lineHeightFor(h1FontSize));
        writeLines(lines, contentX, h1FontSize);
        break;
      }

      case "h2": {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(h2FontSize);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(el.text, contentWidth);
        ensureSpace(lines.length * lineHeightFor(h2FontSize));
        writeLines(lines, contentX, h2FontSize);
        break;
      }

      case "h3": {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(el.text, contentWidth);
        ensureSpace(lines.length * lineHeightFor(baseFontSize));
        writeLines(lines, contentX, baseFontSize);
        break;
      }

      case "subtitle": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(subtitleColor);
        const lines = splitTextWithHyphenation(el.text, contentWidth, doc);
        writeLines(lines, contentX, baseFontSize);
        break;
      }

      case "text": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);

        const spacing = el.paragraphSpacing ?? 0;

        for (let i = 0; i < el.text.length; i++) {
          if (i > 0 && spacing > 0) addVerticalSpace(spacing);
          const lines = splitTextWithHyphenation(el.text[i], contentWidth, doc);
          writeLines(lines, contentX, baseFontSize);
        }

        break;
      }

      case "richText": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);

        const spacing = el.paragraphSpacing ?? 0;
        const lineHeightPt = lineHeightFor(baseFontSize);

        for (let i = 0; i < el.lines.length; i++) {
          if (i > 0 && spacing > 0) addVerticalSpace(spacing);
          ensureSpace(lineHeightPt);

          let runX = contentX;
          for (const run of el.lines[i]) {
            if (run.url) {
              doc.textWithLink(run.text, runX, cursorY, { url: run.url });
            } else {
              doc.text(run.text, runX, cursorY, {
                lineHeightFactor: lineHeight,
              });
            }
            runX += doc.getTextWidth(run.text);
          }

          cursorY += lineHeightPt;
        }

        break;
      }

      case "list": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);

        const bullet = "— ";
        const bulletWidth = doc.getTextWidth(bullet);
        const textWidth = contentWidth - bulletWidth;
        const lineHeightPt = lineHeightFor(baseFontSize);

        for (const item of el.items) {
          const lines: string[] = splitTextWithHyphenation(item, textWidth, doc);
          ensureSpace(lines.length * lineHeightPt);

          for (let i = 0; i < lines.length; i++) {
            if (i === 0) {
              doc.text(bullet, contentX, cursorY, { lineHeightFactor: lineHeight });
            }

            doc.text(lines[i], contentX + bulletWidth, cursorY, {
              lineHeightFactor: lineHeight,
            });
            cursorY += lineHeightPt;
          }
        }

        break;
      }
    }
  };

  renderElement({ type: "h1", text: cv.name });

  for (let i = 0; i < cv.content.length; i++) {
    const el = cv.content[i];

    if (el.type === "h2" && i > 0) {
      addVerticalSpace(baseFontSize * lineHeight);
    }
    if (el.type === "h3" && i > 0) {
      addVerticalSpace(baseFontSize * 0.5);
    }

    renderElement(el);

    if (
      i < cv.content.length - 1 &&
      (el.type === "list" || el.type === "richText" || el.type === "text")
    ) {
      addVerticalSpace(baseFontSize * 0.5);
    }
  }

  return doc.output("blob") as Blob;
}

export async function downloadCvPdf(
  config: CvLayoutConfig,
  cv: CvDocument,
): Promise<void> {
  const blob = await generateCvPdfBlob(config, cv);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Andrey_Kovlyagin_cv.pdf";
  a.style.display = "none";
  document.body.appendChild(a);

  a.click();

  requestAnimationFrame(() => {
    URL.revokeObjectURL(url);
    a.remove();
  });
}
