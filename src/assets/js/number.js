export const serializeNumber = (Num) => {
  /*
   * 数字转整数 如 10000 转为1万
   * @param {需要转化的数} num
   * @param {需要保留的小数位数} point
   * 1万以内直接返回 大于8位数是亿 大于5位数是1万 (以1W分割 1W以下全部显示)
   */
  // let numStr
  // if (typeof (Num) !== 'string') {
  //   console.log(typeof (Num))
  //   // numStr = Num.toString()
  //   // numStr = (Num).toString()
  //   numStr = String(Num) // 强制转换解决上边转换方法报错渲染错误问题
  // }
  let numStr = String(Num)
  if (numStr.length < 5) {
    return numStr
  } else if (numStr.length > 8) {
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
    return parseFloat(parseInt(Num / 100000000) + '.' + decimal) + '亿'
  } else if (numStr.length > 4) {
    let decimal = numStr.substring(numStr.length - 3, numStr.length - 3)
    return parseFloat(parseInt(Num / 10000) + '.' + decimal) + '万'
  }
}
