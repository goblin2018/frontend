interface ControlledType {
  [key: string]: boolean | undefined
}

type Cls = string | ControlledType | undefined

export default function clsx(...cls: Cls[]): string {
  return cls

    .map((c) => {
      if (typeof c === 'object') {
        return Object.keys(c)
          .filter((k) => c[k] === true)
          .join(' ')
      }
      return c
    })
    .join(' ')
}
