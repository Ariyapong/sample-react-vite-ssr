// scripts/genAntdCss.tsx
import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import withTheme from "../pages/theme/index.js";

const outputPath = "./public/antd.min.css";
// const outputPath = "./scripts/antd.min.css";

// const css = extractStyle();

const css = extractStyle(withTheme);

fs.writeFileSync(outputPath, css);
