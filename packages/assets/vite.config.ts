import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isAssets = mode === "assets";

  // 如果是资源模式，只复制静态资源文件
  if (isAssets) {
    // 确保构建前清空之前的构建
    if (fs.existsSync("dist")) {
      fs.rmSync("dist", { recursive: true, force: true });
    }

    // 确保dist目录存在
    if (!fs.existsSync("dist")) {
      fs.mkdirSync("dist");
    }

    return {
      // 资源构建模式下不需要 React
      plugins: [],
      build: {
        // 禁用压缩和最小化
        minify: false,
        // 不生成JavaScript
        rollupOptions: {
          input: {},
          output: {
            // 不生成任何 JS 文件
            assetFileNames: () => {
              return `[name][extname]`;
            },
          },
        },
        // 自定义构建脚本
        emptyOutDir: true,
      },
    };
  }

  // 预览模式，使用 React
  return {
    plugins: [react(), tailwindcss(), svgr()],
    build: {
      assetsDir: "assets",
    },
    assetsInclude: ["**/*.svg"],
  };
});
