// const el = require('eslint-plugin-vue')

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split('')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 类名前缀设置技巧
export function getData (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    // setAttribute() 方法添加指定的属性，并为其赋指定的值。
    // 如果这个指定的属性已存在，则仅设置/更改值。
    return el.setAttribute(name, val)
  } else {
    // getAttribute() 方法返回指定属性名的属性值。
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style
// 设置浏览器供应商所对应的属性
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== 'undefined') {
      return key
    }
  }
  return false
})()
// 自我执行函数获取值
export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
