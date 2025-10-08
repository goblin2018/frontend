import fs from 'fs'
import { pagesDir, typesDir } from './constants'
import { createDir, withDir, withExt } from './file'
import { genIndex } from './files'
import { genDrawer } from './files/drawer'
import { genTable } from './files/table'
import { log } from './log'

const gen = (module: string) => {
  if (!module) {
    log.error('gen', '请输入模块名称')
    return
  }
  // 检查文件是否存在
  const typeFile = withExt(withDir(typesDir, module), 'ts')
  if (!fs.existsSync(typeFile)) {
    log.error('类型文件不存在', typeFile)
    return
  }

  // 生成页面文件
  const dir = withDir(pagesDir, module)
  createDir(dir)
  // index 页面
  const indexFile = dir + '/index.tsx'
  fs.writeFileSync(indexFile, genIndex(module))

  // drawer页面
  const drawerFile = dir + '/drawer.tsx'
  fs.writeFileSync(drawerFile, genDrawer(module))

  // table 页面
  const tableFile = dir + '/table.tsx'
  fs.writeFileSync(tableFile, genTable(module))

  log.success('生成页面成功', module)
}

const module = process.argv[2]
gen(module)
