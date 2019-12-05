<template>
  <div>
    <my-header :show="show"></my-header>

    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :scroll-events="scrollEvents"
        :options="options"
        :direction="direction"
        @scroll="scrollHandler"
      >
        <personal></personal>
        <feature></feature>
        <cube-button class="login-out" type="button" @click="loginOut">退出登录</cube-button>


      </cube-scroll>
    </div>

  </div>
</template>

<script>
    import myHeader from './header'
    import Personal from "./personal"
    import Feature from './feature'
    export default {
        name: 'account.vue',
        components: {
            myHeader,
            Personal,
            Feature
        },
        data() {
          return {
              options: {
                  probeType: 3,
                  scrollbar: true,
              },
              scrollEvents: ['scroll'],
              direction:'vertical',
              scrollY:0,
              show:false


          }
        },
        methods: {
            scrollHandler(pos) {
                this.scrollY = -pos.y;
                if(this.scrollY > 10) {
                    this.show = true
                }else {
                    this.show = false
                }
            },
            // loginOut() {
            //     //退出登录
            //
            // },
            loginOut() {
                this.$createDialog({
                    type: 'confirm',
                    title: '网易云音乐',
                    content: '确定退出当前账号吗',
                    zIndex:2100,
                    $class: {
                        'my_class': true,
                    },
                    confirmBtn: {
                        text: '确定',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    cancelBtn: {
                        text: '取消',
                        active: false,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    onConfirm: () => {
                        this.$api.users.logout();
                        this.$router.push(
                            {
                                path:'/login'
                            }
                        )
                    },
                    // onCancel: () => {
                    //     this.$createToast({
                    //         type: 'warn',
                    //         time: 1000,
                    //         txt: '点击取消按钮'
                    //     }).show()
                    // }
                }).show()
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .scroll-list-wrap
    height: 617px
    width:375px
    margin-bottom:50px


    .login-out
      width:100%
      height:40px
      background-color:white !important
      color:red !important
      margin-top:5px
      line-height:0

    .my_class
      .cube-dialog-main
        border-radius:20px
        background-color:gray

</style>
