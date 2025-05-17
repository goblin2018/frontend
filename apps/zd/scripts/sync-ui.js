const fs = require('fs');
const path = require('path');
// const { execSync } = require('child_process');

// 目录路径
const UI_COMPONENTS_PATH = path.resolve(__dirname, '../../../packages/ui-uni/src/components');
const TARGET_PATH = path.resolve(__dirname, '../src/components/ui-uni');

// 确保目标目录存在
if (!fs.existsSync(TARGET_PATH)) {
  fs.mkdirSync(TARGET_PATH, { recursive: true });
}

// 清除目标目录中的旧组件文件
const clearOldFiles = () => {
  if (fs.existsSync(TARGET_PATH)) {
    const files = fs.readdirSync(TARGET_PATH);
    files.forEach(file => {
      const fullPath = path.join(TARGET_PATH, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
    });
  }
};

// 复制ui-uni组件到本地项目
const copyComponents = () => {
  console.log('开始同步 ui-uni 组件到本地...');
  
  // 清除旧文件
  clearOldFiles();
  
  // 复制组件目录
  const componentDirs = fs.readdirSync(UI_COMPONENTS_PATH).filter(dir => 
    dir.startsWith('w-') && fs.lstatSync(path.join(UI_COMPONENTS_PATH, dir)).isDirectory()
  );
  
  componentDirs.forEach(dir => {
    const sourcePath = path.join(UI_COMPONENTS_PATH, dir);
    const targetPath = path.join(TARGET_PATH, dir);
    
    // 创建目标目录
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }
    
    // 复制文件
    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      const srcFile = path.join(sourcePath, file);
      const destFile = path.join(targetPath, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`复制: ${srcFile} -> ${destFile}`);
    });
  });
  
  // 复制index.ts文件(如果存在)
  const indexFile = path.join(UI_COMPONENTS_PATH, 'index.ts');
  if (fs.existsSync(indexFile)) {
    fs.copyFileSync(indexFile, path.join(TARGET_PATH, 'index.ts'));
    console.log(`复制: ${indexFile} -> ${path.join(TARGET_PATH, 'index.ts')}`);
  }
  
  // 复制global.d.ts文件(如果存在)
  const dtsFile = path.join(UI_COMPONENTS_PATH, 'global.d.ts');
  if (fs.existsSync(dtsFile)) {
    fs.copyFileSync(dtsFile, path.join(TARGET_PATH, 'global.d.ts'));
    console.log(`复制: ${dtsFile} -> ${path.join(TARGET_PATH, 'global.d.ts')}`);
  }
  
  console.log('同步完成!');
};

// 执行复制
copyComponents(); 