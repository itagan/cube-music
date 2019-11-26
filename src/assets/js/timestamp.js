// 时间戳转年-月-日
export const timestamp = (timestamp) => {
  var date
  if (timestamp.toString().length === 10) {
    date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  // var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  // var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  // var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  return Y + M + D
}
// 时间戳转年月日等。
// 今年以前的都是xx年xx月xx日
// 昨天之前：xx月xx日
// 昨天的则 显示  昨天 时:分
// 1小时以前的  时:分
// 1小时之内的，xx分钟前
// 1分钟之内的，为刚刚
export const timestampother = (timestamp) => {
  var date
  if (timestamp.toString().length === 10) {
    date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  var Y = date.getFullYear() + '年'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D
}

// 播放时长转换
export const durationms = (durationms) => {
  // 进一步对播放时间处理，秒数补零操作，一位秒数的时候是 0x ，两位不需要处理
  // let _pad = (num, n = 2) =>{
  //   let len = num.toString().length;
  //   while (len < n) {
  //     num = '0' + num;
  //     len++
  //   }
  //   return num
  // }; ****黄奕老师写法

  // 对时间戳进行转化为分秒
  durationms = durationms / 1000// 转换为多少秒
  durationms = durationms | 0 // 互零操作符，一个正数向下取整 相当于Math.floor方法
  let minute = durationms / 60 | 0
  minute = minute < 10 ? '0' + minute : minute
  // let second = _pad(durationms) % 60;
  let second = durationms % 60
  second = second < 10 ? '0' + second : second// 秒数前面补零操作
  return `${minute}:${second}`
}
