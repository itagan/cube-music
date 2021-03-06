// 避免输入的时候发送多次请求
export const debounce = (func, delay = 200) => {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
