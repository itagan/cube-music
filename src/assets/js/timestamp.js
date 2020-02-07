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
// 时间戳转月-日
export const timeMd = (timestamp) => {
  let date
  if (timestamp.toString().length === 10) {
    date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '

  return M + D
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
    date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    timestamp = timestamp * 1000
  } else {
    date = new Date(timestamp)
  }
  let timeNow = new Date().getTime()
  let DaysBefore = new Date().setHours(0, 0, 0, 0) - 1 * 24 * 60 * 60 * 1000
  let YearBefore = new Date('2020-1-1 0:0:0').getTime()
  let todayStart = new Date().setHours(0, 0, 0, 0)

  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
  let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  // let S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  if ((timeNow - timestamp) <= 60 * 1000) {
    return '刚刚'
  } else if ((timeNow - timestamp) <= 60 * 60 * 1000) {
    let m = Math.floor((timeNow - timestamp) / 1000) / 60 | 0
    return m + '分钟前'
  } else if ((timeNow - timestamp) > 60 * 60 * 1000 && todayStart < timestamp) {
    return H + m
  } else if (timestamp > DaysBefore) {
    return '昨天' + H + m
  } else if (timestamp <= DaysBefore && timestamp > YearBefore) {
    return M + D
  } else if (YearBefore > timestamp) {
    return Y + M + D
  }
}

// 播放时长转换毫秒转
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

// 播放时长转换
export const dtTrans = (interval) => {
  interval = interval | 0 // 互零操作符，一个正数向下取整 相当于Math.floor方法
  const minute = interval / 60 | 0
  function _pad (num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
  const second = _pad(interval % 60) // 秒数前面补零操作
  return `${minute}:${second}`
}
