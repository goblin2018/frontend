export class StringSet {
  set: Set<string>

  constructor(...values: string[]) {
    this.set = new Set<string>(values)
  }

  add(value: string) {
    this.set.add(value)
  }

  length(): number {
    return this.set.size
  }

  remove(value: string) {
    this.set.delete(value)
  }

  toLines(): string {
    let r = ''
    this.set.forEach((v) => {
      r += v
      r += '\n'
    })
    return r
  }

  toCommas(): string {
    let r = ''
    this.set.forEach((v) => {
      r += v
      r += ', '
    })

    r = r.slice(0, r.length - 2)
    return r
  }
}
