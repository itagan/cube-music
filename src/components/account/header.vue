<template>
  <my-header class="header">
    <i class="iconfont iconrichscan_icon" slot="left" @click="scan"></i>
    <div slot="center" class="account" v-show="account">账号</div>
    <i class="iconfont iconyinletiaodongzhuangtai" slot="right" @click="playMusic"></i>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    export default {
      name: 'header.vue',
      components: {
        MyHeader
      },
      data () {
        return {
          account: false
        }
      },
      props: {
        show: {
          type: Boolean,
          default: false
        }
      },
      watch: {
        show (show) {
          this.account = !!show
        }
      },
      methods: {
            // 扫一扫
        scan () {

        },
            // 播放音乐
        playMusic () {

        }

      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .account
    font-size:$font-size-medium-x
  span
    color:gray
    font-size:$font-size-medium-x
</style>
