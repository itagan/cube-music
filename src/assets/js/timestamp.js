//时间戳转年月日
export const timestamp = (timestamp) => {
  var date;
  if(timestamp.toString().length === 10) {
    date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }else {
    date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  // var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  // var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  // var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  return Y+M+D;
};

export const durationms = (durationms) => {
  // 对时间戳进行转化为分秒
  durationms = durationms / 1000;//转换为多少秒
  durationms = durationms | 0; // 互零操作符，一个正数向下取整 相当于Math.floor方法
  let  minute = durationms / 60 | 0;
  minute = minute < 10 ? '0' + minute : minute;
  let second = durationms % 60;
  second = second < 10 ? '0' + second : second;// 秒数前面补零操作
    return `${minute}:${second}`
};
