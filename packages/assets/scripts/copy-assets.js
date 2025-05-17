#!/usr/bin/env node

// 这个脚本负责复制所有静态资源到dist目录，不需要任何TS导出或React依赖

import fs from 'fs';
import path from 'path';

// 源目录和目标目录
const srcDir = path.resolve('src/assets');
const distDir = path.resolve('dist');

// 支持的静态资源扩展名
const supportedExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.ttf', '.woff', '.woff2'];

// 清理目标目录
console.log('清理目标目录...');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 复制文件函数
function copyFile(src, dest) {
  const content = fs.readFileSync(src);
  fs.writeFileSync(dest, content);
  console.log(`复制: ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
}

// 递归复制目录
function copyDir(src, dest) {
  // 确保目标目录存在
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // 递归复制子目录
      copyDir(srcPath, destPath);
    } else {
      // 检查是否为支持的静态资源
      const ext = path.extname(entry.name).toLowerCase();
      if (supportedExtensions.includes(ext)) {
        copyFile(srcPath, destPath);
      }
    }
  }
}

// 开始复制
console.log('开始复制静态资源...');
if (fs.existsSync(srcDir)) {
  copyDir(srcDir, distDir);
  console.log(`静态资源已复制到 ${path.relative(process.cwd(), distDir)}`);
} else {
  console.error(`源目录不存在: ${path.relative(process.cwd(), srcDir)}`);
  process.exit(1);
}

// 创建简单的索引文件
const assets = fs.readdirSync(distDir);
const indexContent = `# 可用静态资源列表\n\n${assets.map(file => `- ${file}`).join('\n')}`;
fs.writeFileSync(path.join(distDir, 'README.md'), indexContent);

console.log('完成！'); 