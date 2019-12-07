<template>
  <div class="code">
    <div class="code-back">
      <i class="iconfont iconzan1" @click="back"></i>
      <span>手机号验证</span>
    </div>
    <div class="code-top">验证码已发送至</div>
    <div class="code-center">
      <span>+86 {{this.phone}}</span>
      <span>{{time}}s</span>
    </div>
    <div class="code-bottom">
      <label>
        <input maxlength="4" type="number" v-model="code" autofocus="autofocus">
      </label>
      <ul>
        <li class="one-li" ref="oneLi">{{code[0]}}</li>
        <li>{{code[1]}}</li>
        <li>{{code[2]}}</li>
        <li>{{code[3]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'code.vue',
      data () {
        return {
          code: '',
          phone: 0,
          time: 60,
          interval: ''
        }
      },
      created () {
        this.getPhone()
      },
      methods: {
            // 获取手机号码
        getPhone () {
          this.phone = this.$route.params.phone
        },
            // 验证验证码
        verification () {
          this.$api.users.verifyCode(this.phone, this.code).then(res => {
            if (res.data.code === 200) {
            }

            if (res.status === 503) {
              const toast = this.$createToast({
                time: 1000,
                txt: '验证码错误！',
                type: 'error'
              })
              toast.show()
            }
          })
        },
            // 输入的时候底部边框自动变黑色，删除就还原

            // 自动倒计时
        countdown () {
                // 参考网友……
                // let that = this;
                // let interval = window.setInterval(function() {
                //     that.interval = interval;
                //     if ((that.time--) <= 1) {
                //         clearInterval(interval);
                //     }
                // }, 1000);

          this.interval = window.setInterval(() => {
            if ((this.time--) <= 1) {
              clearInterval(this.interval)
            }
          }, 1000)
        },
        back () {
                // 返回上一页
          this.$router.back()
            // 清除定时器
          clearInterval(this.interval)
        }
      },
      watch: {
        code (val) {
          if (val.trim().length === 4) {
            this.verification()
          }
          let li = document.getElementsByTagName('li')
          if (val.trim().length > 0) {
            li[val.trim().length - 1].classList.add('border')
            li[val.trim().length].classList.remove('border')
          }
                // if(li[0].innerHTML.length === 0) {
                //     li[0].classList.remove('border');
                //     console.log('0')
                // }

                // 解决第1个样式不去除的问题以及产生的报错
          if (!val) {
            li[0].classList.remove('border')
          }
        }
      },
      mounted () {
        this.countdown()
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .code
    z-index:200  //不能太大避免影响弹框显示
    position:relative
    background-color:white
    height:667px
    width:100%
    .code-back
      font-size:$font-size-medium-x

      margin:auto 5px
      flex-center()
      padding-top:10px
      position:relative
      i
        position:absolute
        left:10px

    .code-top
      font-size:$font-size-medium-x
      height:30px
      line-height:30px
      margin:40px 10px 0
    .code-center
      font-size:$font-size-medium
      color:gray
      height:30px
      line-height:30px
      margin:auto 10px
      flex-between()
    .code-bottom
      position:relative
      margin:auto 5px
      input
        opacity:0
        width:100%
        background-color:gray
        position:absolute
        height:59px
      ul
        flex-around()
        width:100%
        .one-li
          border-bottom:2px solid gray
        li
          height:60px
          width:21%
          border-bottom:2px solid #dcdcdc
          flex-center(column)


        .border
          border-bottom:2px solid black
</style>
