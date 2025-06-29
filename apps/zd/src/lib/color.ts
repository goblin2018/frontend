export const green: Color = {
  text: {
    500: 'text-green-500',
  },
  border: {
    500: 'border-green-500',
  },
  bg: {
    50: 'bg-green-50',
    100: 'bg-green-100',
  },
}
export const orange: Color = {
  text: {
    500: 'text-orange-500',
  },
  border: {
    500: 'border-orange-500',
  },
  bg: {
    50: 'bg-orange-50',
    100: 'bg-orange-100',
  },
}

export interface Color {
  text: {
    [key: number]: string
  }
  border: {
    [key: number]: string
  }
  bg: {
    [key: number]: string
  }
}

/**
 * 将十六进制颜色转换为 rgba 格式
 * @param hex 十六进制颜色值，支持 #86EFAC、#86E、86EFAC 等格式
 * @param alpha 透明度，0-1 之间的数值
 * @returns rgba 格式的颜色字符串
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  // 处理不同的颜色格式
  let color = hex
  if (hex.startsWith('#')) {
    color = hex.slice(1)
  }

  // 如果是3位十六进制，转换为6位
  if (color.length === 3) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // 确保是6位十六进制
  if (color.length !== 6) {
    console.warn('Invalid color format:', hex, 'using fallback color')
    return `rgba(134, 239, 172, ${alpha})`
  }

  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)

  // 检查转换是否成功
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn('Invalid color format:', hex, 'using fallback color')
    return `rgba(134, 239, 172, ${alpha})`
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
