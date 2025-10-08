import ts from 'typescript'
import fs from 'fs'
import { trimPrefix } from './string'

interface ParseResult {
  node: ts.InterfaceDeclaration
  name: string
  title: string
}

export const parse = (path: string): ParseResult => {
  let sf = ts.createSourceFile(
    'abcd.ts',
    fs.readFileSync(path).toString(),
    ts.ScriptTarget.Latest,
    /*setParentNodes */ true
  )
  let base = sf.statements.find((node) =>
    ts.isInterfaceDeclaration(node)
  ) as ts.InterfaceDeclaration
  let docs = ts.getLeadingCommentRanges(sf.getFullText(), base.pos)
  let name = ''
  let title = ''
  docs?.forEach((doc, i) => {
    // 去除注释前面的斜杠
    let d = sf.getFullText().substring(doc.pos, doc.end)
    d = trimPrefix(d, '//').trim()
    if (i == 0) {
      title = d
    } else {
      name = d
    }
  })
  return {
    node: base,
    name: name,
    title: title,
  }
}
