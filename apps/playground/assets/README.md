# Assets2

一个纯静态资源包，有两种使用模式：

1. **预览模式**：用于查看所有可用资源的 React 应用
2. **资源模式**：直接导出纯静态资源文件，无需任何 React 或 TypeScript 依赖

## 使用方法

### 开发和预览

运行开发服务器预览所有资源（同时监视资源变化）：

```bash
pnpm dev
```

仅监视静态资源变化（不启动React预览）：

```bash
pnpm dev:assets
```

构建预览应用程序：

```bash
pnpm build:preview
```

预览已构建的应用程序：

```bash
pnpm preview
```

### 作为纯静态资源使用

构建纯静态资源（不包含 React 或 TypeScript）：

```bash
pnpm build:assets
```

这将创建一个只包含静态资源文件的构建，没有任何 JavaScript 或 React 依赖。
所有静态资源文件会被直接复制到 `dist` 目录中，保持原始文件名。

### 在其他项目中使用

构建后，您可以直接复制 `dist` 目录中的文件到您的项目，或者将整个包作为依赖引入。

如果作为依赖，资源可以通过以下方式访问：

```html
<!-- 在 HTML 中 -->
<img src="node_modules/assets2/react.svg" alt="React Logo" />
```

或者在构建工具中（如 Webpack、Vite 等）：

```javascript
// 使用导入语法（取决于构建工具配置）
import reactLogo from "assets2/react.svg";
```

## 添加新资源

1. 将新资源放在 `src/assets/` 目录下
2. 如果在开发模式下，文件会自动被复制到 `dist` 目录
3. 或运行 `pnpm build:assets` 手动重新构建

支持的文件类型：

- .svg - SVG 图像
- .png, .jpg, .jpeg, .gif, .webp - 栅格图像
- .ico - 图标文件
- .ttf, .woff, .woff2 - 字体文件

## 项目结构

- `src/assets/` - 所有静态资源文件
- `scripts/copy-assets.js` - 复制静态资源的脚本
- `scripts/watch-assets.js` - 监视并实时复制静态资源的脚本
- `src/AssetGallery.tsx` - 用于预览的资源画廊组件
