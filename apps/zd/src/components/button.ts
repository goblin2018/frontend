export type ButtonType = 'primary' | 'text' | 'link' | "ghost"

export type ButtonSize = '56' | '40' | '48' | '64'
export const sizes: { [key: string]: { w: string; h: string } } = {
  56: { h: 'h56', w: 'w56' },
  64: { h: 'h64', w: 'w64' },
  48: { h: 'h48', w: 'w48' },
  40: { h: 'h40', w: 'w40' },
}

export type ButtonShape = 'circle' | 'round' | 'square'
