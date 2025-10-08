export default function throttle(fn: Function, delay: number) {
  console.log('throttle')
  let waiting = false
  return function (this: any) {
    if (!waiting) {
      fn.apply(this, arguments)
      waiting = true
      setTimeout(() => {
        waiting = false
      }, delay)
    }
  }
}
