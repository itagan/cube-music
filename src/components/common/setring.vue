<template>
  <div class="share">
    <cube-popup ref="popup" @mask-click="hide" :position="'bottom'" :zIndex="2001">

        <ul class="set-ring">
          <li class="set-ring-top">
            <span>设置选择</span>
          </li>
          <li @click="ring">
           <span>设为彩铃</span>
            <span class="vip-css">vip</span>
          </li>
          <li @click="subscribe">
            <span>设为铃声</span>
          </li>
        </ul>

    </cube-popup>
  </div>
</template>

<script>
    export default {
        name: "setRing.vue",
        data() {
          return {}
        },
        created() {
            // this.subscribeDialog = this.$createSubscribeDialog()
        },
        methods: {
          show () {
            this.$refs.popup.show()
          },
          hide () {
            this.$refs.popup.hide()
          },
          ring () {
            this.$createSubscribeDialog().show()
            this.hide ()
          },
          subscribe () {
            this.$createSubscribeDialog().show()
            this.hide ()
          },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .set-ring
    height:auto
    width:100%
    border-top-left-radius:20px
    border-top-right-radius:20px
    background-color:white
    .set-ring-top
      color:gray
      font-size:$font-size-small
    li
      padding-left:15px
      display:flex
      height:40px
      line-height:40px
      border-bottom:.5px solid rgba(128,128,128,.2)
      font-size:$font-size-medium
      .vip-css
        margin-top:12px
        margin-left:2px
        color:red
        font-size:$font-size-small
        display:inline-block
        height:12px
        width:20px
        border:1px solid red
        line-height:12px
        text-align:center
        border-radius:2px



</style>
