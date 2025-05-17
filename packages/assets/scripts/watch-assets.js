#!/usr/bin/env node

// 这个脚本会监视src/assets目录的变化，并实时复制到dist目录

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// 源目录和目标目录
const srcDir = path.resolve('src/assets');
const distDir = path.resolve('dist');

// 首先执行一次完整复制
console.log('初始化复制...');
const copyProcess = spawn('node', ['scripts/copy-assets.js'], { stdio: 'inherit' });

copyProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('初始复制失败');
    process.exit(1);
  }
  
  console.log('开始监视文件变化...');
  
  // 确保assets目录存在
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  // 监视文件变化
  fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    
    const srcPath = path.join(srcDir, filename);
    const destPath = path.join(distDir, filename);
    
    console.log(`检测到变化: ${eventType} ${filename}`);
    
    // 确保文件仍然存在（可能是删除事件）
    if (fs.existsSync(srcPath)) {
      // 确保目标目录存在
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // 复制文件
      try {
        const content = fs.readFileSync(srcPath);
        fs.writeFileSync(destPath, content);
        console.log(`已更新: ${filename}`);
      } catch (err) {
        console.error(`复制失败: ${filename}`, err);
      }
    } else {
      // 文件被删除，也从目标删除
      if (fs.existsSync(destPath)) {
        try {
          fs.unlinkSync(destPath);
          console.log(`已删除: ${filename}`);
        } catch (err) {
          console.error(`删除失败: ${filename}`, err);
        }
      }
    }
    
    // 更新索引文件
    try {
      const assets = fs.readdirSync(distDir).filter(file => !file.startsWith('.') && file !== 'README.md');
      const indexContent = `# 可用静态资源列表\n\n${assets.map(file => `- ${file}`).join('\n')}`;
      fs.writeFileSync(path.join(distDir, 'README.md'), indexContent);
    } catch (err) {
      console.error('更新索引失败', err);
    }
  });
  
  console.log(`监视中: ${srcDir}`);
}); 