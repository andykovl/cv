import "./styles/globals.css";
import { createCvDownloader } from "./cv";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.className = "flex items-center justify-center min-h-screen";

const container = document.createElement("div");
container.className = "flex flex-col items-center";

container.appendChild(createCvDownloader());
app.appendChild(container);
