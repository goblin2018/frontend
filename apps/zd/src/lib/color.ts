
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
