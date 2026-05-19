import { createButton } from "../ui/button";
import { downloadIcon, fileTextIcon } from "../ui/icons";
import { defaultCvConfig } from "./config";
import { sampleCv } from "./data";
import { downloadCvPdf } from "./generate";
import { openCvMarkdown } from "./markdown";

export function createCvDownloader(): HTMLDivElement {
  const cvColumn = document.createElement("div");
  cvColumn.className = "flex flex-wrap items-start gap-3";

  const btnMain = createButton("Download CV", {
    variant: "default",
    icon: downloadIcon,
    onClick: async () => {
      const originalHTML = btnMain.innerHTML;
      btnMain.textContent = "Downloading...";
      btnMain.disabled = true;

      try {
        await downloadCvPdf(defaultCvConfig, sampleCv);
      } catch (error) {
        console.error(error);
      } finally {
        btnMain.innerHTML = originalHTML;
        btnMain.disabled = false;
      }
    },
  });

  const btnMarkdown = createButton(".md", {
    variant: "outline",
    icon: fileTextIcon,
    onClick: () => {
      openCvMarkdown(sampleCv);
    },
  });

  cvColumn.appendChild(btnMain);
  cvColumn.appendChild(btnMarkdown);

  return cvColumn;
}
