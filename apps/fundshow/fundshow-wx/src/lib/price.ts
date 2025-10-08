export function formatPrice(price?: number): string {
  
  if (!price) {
    return '0'
  }

  let p = price / 100
  if (Number.isInteger(p)) {
    return p.toFixed(0)
  }

  return p.toFixed(2)
}
