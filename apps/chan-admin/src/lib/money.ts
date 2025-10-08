export function formatMoney(money?: number) {
  if (!money) {
    return 0
  }
  let r = money / 100

  if (Number.isInteger(r)) {
    return r
  }

  return r.toFixed(2)
}
