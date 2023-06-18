import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";
import * as path from "path";

const config: UserConfig = {
  plugins: [react(), ssr()],
  resolve: {
    alias: [
      // { find: "@", replacement: path.resolve(__dirname, "./") },
      { find: "#root", replacement: path.resolve(__dirname, "./") },
    ],
  },
};

export default config;
