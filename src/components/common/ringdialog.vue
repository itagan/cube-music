<template>
  <div class="ring-dialog-view">
    <cube-popup ref="popup">
      <div class="ring-dialog-wrapper">
        <div class="ring-dialog-container">
          <div class="title">
            <ul>
              <li>
                <div class="icon-footer"><i class="iconfont iconnetease"></i></div>
                <div class="icon-text">网易云音乐</div>
              </li>
              <li><i class="iconfont iconjia"></i></li>
              <li>
                <div> class="icon-footer"<i class="iconfont icondiantai"></i></div>
                <div>库乐队</div>
              </li>
            </ul>
          </div>
          <div class="content">
            <div class="content-text">
              由于苹果系统限制，手机更换铃声需要安装"库乐队"APP后即可使用
            </div>
            <cube-button class="button" @click="hide">前往App Store 下载</cube-button>
          </div>
        </div>

        <div class="close" @click="hide"><i class="cubeic-close"></i></div>
      </div>
    </cube-popup>
  </div>
</template>

<script>
    export default {
        name: "ringDialog.vue",
        methods: {
            show () {
                this.$refs.popup.show()
            },
            hide () {
                this.$refs.popup.hide()
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .ring-dialog-wrapper
    position: relative
    max-width: 360px
    margin: 0 25px
    .ring-dialog-container
      box-sizing: border-box
      width:250px
      height:250px
      /*padding: 38px 20px 20px 20px*/
      border-radius: 10px
      .title
        background-color:pink
        width:100%
        height:150px
        flex-center()
        ul
          width:150px
          height:70px
          flex-between()
          li
            height:70px
            width:50px
            .icon-footer
              height:50px
              width:50px
              border-radius:8px
            .icon-text
              height:20px
      .content
        height:150pz
        width:100%
        background-color:white
        .content-text
          text-align:center
          width:200px
        .button
          display: inline-block
          width: 230px
          margin-top: 20px
          padding: 14px
          border-radius: 4px
          font-size: 15px
          background-color: #5B8FDC

    .close
      height:20px
      width:20px
      border-radius:50%
      background-color:ragb(0,0,0,.6)
      position: absolute
      bottom:10px
</style>
