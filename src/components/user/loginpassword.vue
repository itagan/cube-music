<template>
  <div class="phone">
    <div class="back">
      <i class="iconfont iconfanhui" @click="back"></i>
      <span>手机号登录</span>
    </div>

    <cube-input
      v-model="value"
      :placeholder="placeholder"
      :type="type"
      :maxlength="maxlength"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :eye="eye"
      :clearable="clearable"
      class="my-input"
    ></cube-input>

    <cube-button class="login" :light="true" @click.stop="login">立即登录</cube-button>

    <div class="reset">
      <span>重设密码</span>
      <i></i>
    </div>
  </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
      data () {
        return {
          value: '',
          placeholder: '输入密码',
          type: 'password',
          readonly: false,
          maxlength: 100,
          disabled: false,
          autofocus: true,
          autocomplete: true,
          eye: {
            open: true,
            reverse: false
          },
          clearable: {
            visible: true,
            blurHidden: true
          },
          phone: 0,
          code: '',
          uid: -1
        }
      },
      created () {
        this.getPhone()
      },
      methods: {
        back () {
                // 返回上一页
          this.$router.back()
        },
            // input(val) {
            //     //输入中
            //     if (val.length > 0) {
            //         document.getElementsByClassName('next')[0].style.opacity = 1
            //     } else {
            //         document.getElementsByClassName('next')[0].style.opacity = 0.2
            //     }
            //
            // },
            // 获取手机号码
        getPhone () {
                // return this.code;
          this.phone = this.$route.params.phone
        },
        getRes () {
          this.$api.users.cellphone(this.phone, this.value).then(res => {
            this.code = res.data.code
            this.uid = res.data.account.id
            console.log(res)
          })
        },
        login () {
          // this.getRes()
    
            // 提示方法
          const toast = msg => {
            this.$createToast({
              time: 1000,
              txt: msg,
              type: 'error'
            })
          }

          this.$api.users.cellphone(this.phone, this.value).then(res => {
            this.code = res.data.code
            // this.uid = res.data.account.id
            console.log(res)
            if (this.code === 502) {
              toast.show('密码错误！')
            } else if (this.code === 200) {
                    // 把用户id信息提交到vuex
              this.uid = res.data.account.id
              this.setUid(this.uid)

                // 登录成功，刷新登录状态
              this.$api.users.refresh().then(res => {
                console.log(res)
                if (res.status === 200) {
                  console.log('刷新状态成功')
                    // 刷新成功，可以登录并跳转到首页
                  this.$router.push(
                    {
                      path: '/find'
                    }
                        )
                } else {
                  console.log('刷新状态失败')
                }
              })
            }
          })

          // if (this.code === 400) {
          //   toast.show('密码错误！')
          // } else if (this.code === 200) {
          //           // 把用户id信息提交到vuex
          //   this.setUid(this.uid)

          //       // 登录成功，刷新登录状态
          //   this.$api.users.refresh().then(res => {
          //     console.log(res)
          //     if (res.status === 200) {
          //       console.log('刷新状态成功')
          //           // 刷新成功，可以登录并跳转到首页
          //       this.$router.push(
          //         {
          //           path: '/find'
          //         }
          //               )
          //     } else {
          //       console.log('刷新状态失败')
          //     }
          //   })
          // }
        },
        ...mapMutations({
          setUid: 'SET_UID'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .phone
    width:100%
    height:667px
    background-color:white
    z-index:200
    position:relative
    .back
      font-size:$font-size-medium-x
      margin:auto 5px
      flex-center()
      padding-top:10px
      position:relative
      i
        position:absolute
        left:10px
    .my-input
      width:100%
      height:40px
      margin-top:30px

    .login
      width:350px
      height:25px
      line-height:0
      position:absolute
      top:125px
      left:50%
      margin-left:-175px
      border-radius:20px
      background-color:red
      color:white
      $font-size-medium
    .reset
      font-size:$font-size-small-s
      position:absolute
      top:170px
      width:80px
      height:20px
      line-height:20px
      text-align:center
      left:50%
      margin-left:-40px
</style>
