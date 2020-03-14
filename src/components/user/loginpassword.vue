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
      :autocomplete="autocomplete"
      :eye="eye"
      :clearable="clearable"
      @input="input"
      ref="autoFocus"
      class="my-input"
    ></cube-input>

    <cube-button class="login" :light="true" @click.stop="login">立即登录</cube-button>

    <div class="reset">
      <span>重设密码</span>
      <i class="iconfont iconiconfontyoujiantou"></i>
    </div>
  </div>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'

    export default {
      data () {
        return {
          value: '',
          placeholder: '输入密码',
          type: 'password',
          readonly: false,
          maxlength: 100,
          disabled: false,
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
        input (val) {
                // 输入中
          if (val.length > 0) {
            document.getElementsByClassName('login')[0].style.opacity = 1
          } else {
            document.getElementsByClassName('login')[0].style.opacity = 0.4
          }
        },
            // 获取手机号码
        getPhone () {
          this.phone = this.$route.params.phone
        },
        login () {    
            // 提示方法
          const toast = msg => {
            this.$createToast({
              time: 1000,
              txt: msg,
              type: 'error',
              zIndex: 2002
            }).show()
          }

          this.$api.users.cellphone(this.phone, this.value).then(res => {
            if(!res) return false
            this.code = res.data && res.data.code
            if (this.code === 502) {
              toast('密码错误！')
            } else if (this.code === 200) {
                    // 把用户id信息提交到vuex
              this.uid = res.data.account.id
              this.token = res.data.token
              // this.setUid(this.uid)
              this.saveMyUid(this.uid)
              this.saveMyToken(this.token)
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
        }),
        ...mapActions([
          'saveMyToken',
          'saveMyUid'
        ])
      },
      mounted () {
        this.$nextTick(() => {
          //原生自动对焦替换cube ui自动对焦，避免不自动对焦**
          //提示如Autofocus processing was blocked because a document's URL has a fragment '#/login/phone'.
          this.$refs['autoFocus'].$refs.input.focus()
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
    z-index:2001
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
      border-bottom:1px solid #dcdcdc

    .login
      width:340px
      padding:10px
      position:absolute
      top:130px
      left:50%
      margin-left:-170px
      border-radius:20px
      background: -webkit-linear-gradient(left, rgba(255,0,0,.8), rgba(255,0,0,1)); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, rgba(255,0,0,.8), rgba(255,0,0,1)); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, rgba(255,0,0,.8), rgba(255,0,0,1)); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, rgba(255,0,0,.8), rgba(255,0,0,1)); /* 标准的语法（必须放在最后） */
      color:white
      opacity:0.4
      font-size:$font-size-medium
    .reset
      font-size:$font-size-small-s
      color:rgba(128,128,128,.8)
      position:absolute
      top:175px
      width:100%
      height:20px
      flex-center()
      padding-left:5px
      i 
       font-size:$font-size-large-x 
       padding-top:1px
       margin-left:-4px
       color:rgba(128,128,128,.3)

      //对cube-ui样式修改
.cube-input_active::after
  border:none
.cube-input::after  
  border:none
</style>
