<template>
  <div class="login">
    <div class="img">
      <img src="./img/login1.png" alt="">
    </div>
    <cube-button class="register" :light="true" @click="login">手机号登录</cube-button>
    <cube-button class="experience" :light="true" @click="experience">立即体验</cube-button>
    <ul>
      <li>
        <i class="iconfont iconvideo"></i>
      </li>
      <li>
        <i class="iconfont iconmaike"></i>
      </li>
      <li>
        <i class="iconfont iconzan1"></i>
      </li>
      <li>
        <i class="iconfont iconzhanghao"></i>
      </li>
    </ul>
    <div class="agree" ref="shaky">
      <i class="iconfont iconvideo" v-if="!checked" @click="check">同意</i>
      <i class="iconfont iconzan1" v-else @click="check">同意</i>
      <span><< 霸王条款 >></span>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'login.vue',
      data () {
        return {
          checked: false
        }
      },
      methods: {
        login () {
          if (this.checked) {
                    // 下一步
            this.$router.push({
              path: '/login/phone'
            })
          } else {
                    // 提醒下
            this.toast = this.$createToast({
              time: 2000,
              txt: '请先勾选霸王条款哈~',
              type: 'txt'
            })
            this.toast.show()
            this.$refs.shaky.classList.add('shaky')

            setTimeout(() => {
              this.$refs.shaky.classList.remove('shaky')
            }, 1000)
          }
        },
        experience () {
          if (this.checked) {
                    // 下一步
            this.$router.push({
              path: '/login/phone'
            })
          } else {
                    // 提醒下
            this.toast = this.$createToast({
              time: 2000,
              txt: '请先勾选霸王条款哈~',
              type: 'txt'
            })
            this.toast.show()
            this.$refs.shaky.classList.add('shaky')

            setTimeout(() => {
              this.$refs.shaky.classList.remove('shaky')
            }, 1000)
          }
        },
        check () {
          this.checked = !this.checked
          if (this.checked === true) {
            this.$refs.shaky.classList.remove('shaky')
          }
        }
      },
      destroyed () {
        this.checked = false
    }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .login
    background-color:#db2c1f
    width:100%
    height:667px
    z-index:200
    position:relative
    .img
      width:250px
      height:250px
      margin:auto
      padding-top:40px
      img
        width:100%
        height:100%
    .register
      width:300px
      height:40px
      line-height:0
      position:absolute
      bottom:210px
      left:50%
      margin-left:-150px
      border-radius:20px
      background-color:white
      color:red
      flex-center()
    .experience
      width:300px
      height:40px
      line-height:0
      position:absolute
      bottom:150px
      left:50%
      margin-left:-150px
      border-radius:20px
      background-color:transparent
      color:white
      border:1px solid white
      flex-center()
    ul
      display:flex
      width:300px
      text-align:center
      position:absolute
      bottom:100px
      left:50%
      margin-left:-150px
      border-radius:20px
      li
        flex:1
        height:20px
        width:20px
        border-radius:50%
        i
          color:white
          font-size:$font-size-large
    .agree
      flex-center()
      position:absolute
      bottom:50px
      color:white
      font-size:$font-size-small-s
      width:300px
      text-align:center
      left:50%
      margin-left:-150px
      i
        color:#dcdcdc
        padding-right:5px

  //抖动效果
    .shaky {
      animation:shakySlow 1s ease-in-out 4 alternate
    }


    @keyframes shakySlow {
    0% {
        transform: translateX(0px)
    }
    10% {
          transform: translateX(2.5px)
    }
    20% {
          transform: translateX(5px)
    }
    30% {
          transform: translateX(-2.5px)
    }
    40% {
          transform: translateX(0px)
    }
    50% {
          transform: translateX(-2px)
    }
    60% {
          transform: translateX(-4px)
    }
    70% {
          transform: translateX(3px)
    }
    80% {
          transform: translateX(2px)
    }
    90% {
          transform: translateX(1px)
    }
    100% {
          transform: translateX(0)
    }
    }

</style>
