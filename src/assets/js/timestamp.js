// 时间戳转年-月-日
export const timestamp = (timestamp) => {
  let date
  if (timestamp.toString().length === 10) {
    date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '

  return Y + M + D
}
// 时间戳转年月日等。
// 今年以前的都是xx年xx月xx日
// 昨天之前：xx月xx日
// 昨天的则 显示  昨天 时:分
// 1小时以前的  时:分
// 1小时之内的，xx分钟前
// 1分钟之内的，为刚刚
export const timestampOther = (timestamp) => {
  let date
  if (timestamp.toString().length === 10) {
    date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
  // let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  // let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  // let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D
}

// 播放时长转换
export const durationsTransformation = (durations) => {
  // 对时间戳进行转化为分秒
  durations = durations / 1000// 转换为多少秒
  durations = durations | 0 // 互零操作符，一个正数向下取整 相当于Math.floor方法
  let minute = durations / 60 | 0
  minute = minute < 10 ? '0' + minute : minute
  // let second = _pad(durations) % 60;
  let second = durations % 60
  second = second < 10 ? '0' + second : second// 秒数前面补零操作
  return `${minute}:${second}`
}
