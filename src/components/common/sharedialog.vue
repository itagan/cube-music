<template>
  <div class="share">
    <cube-popup ref="popup" @mask-click="hide" :position="'bottom'" :zIndex="2001">

      <div class="share-build">
        <div class="share-top">分享</div>

        <ul class="share-center">
          <li>
            <div class="share-icon">
              <i class="iconfont iconnetease"></i>
            </div>
            <div class="share-text">云音乐动态</div>
          </li>
          <li>
            <div class="share-icon">
              <i class="iconfont iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
            </div>
            <div class="share-text">私信</div>
          </li>
          <li>
            <div class="share-icon">
              <i class="iconfont iconfuzhilianjie"></i>
            </div>
            <div class="share-text">复制链接</div>
          </li>
        </ul>

        <div class="scroll-list-wrap">
          <cube-scroll
            ref="scroll"
            direction="horizontal"
            class="horizontal-scroll-list-wrap"
          >
            <ul class="share-bottom">
              <li>
                <div class="share-icon">
                  <i class="iconfont iconweixinpengyouquan"></i>
                </div>
                <div class="share-text">
                  微信朋友圈
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconweixinhaoyou"></i>
                </div>
                <div class="share-text">
                  微信好友
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconQQkongjian"></i>
                </div>
                <div class="share-text">
                  QQ空间
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconqqhaoyou"></i>
                </div>
                <div class="share-text">
                  QQ好友
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconweibodenglu"></i>
                </div>
                <div class="share-text">
                  微博
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconweixinpengyouquan"></i>
                </div>
                <div class="share-text">
                  微信朋友圈
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconweixinhaoyou"></i>
                </div>
                <div class="share-text">
                  微信好友
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconQQkongjian"></i>
                </div>
                <div class="share-text">
                  QQ空间
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconqqhaoyou"></i>
                </div>
                <div class="share-text">
                  QQ好友
                </div>
              </li>
              <li>
                <div class="share-icon">
                  <i class="iconfont iconweibodenglu"></i>
                </div>
                <div class="share-text">
                  微博
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>

        <cube-button class="button" @click="hide">取消</cube-button>

      </div>
    </cube-popup>
  </div>
</template>

<script>
    export default {
        name: "playMore.vue",
        data() {
            return {
                options: {
                    scrollbar: true
                }}
        },
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
   .share-build
      position:relative
      bottom:0
      height:auto
      width:100%
      border-top-left-radius:20px
      border-top-right-radius:20px
      background-color:white
      .share-top
        height:30px
        width:100%
        padding-left:20px
        line-height:30px
        font-size:$font-size-small
      ul
        display:flex
        height:70px
        padding:15px 10px
        li
          height:70px
          width:70px
          text-align:center
          .share-icon
            border-radius:50%
            background-color:rgba(128,128,128,.2)
            height:50px
            width:50px
            font-size:$font-size-large-x
            margin-left:10px
            flex-center()
          .share-text
            padding-top:5px
            height:20px
            width:70px
            line-height:20px
            font-size:$font-size-small
      .share-center
        border-bottom:.5px solid rgba(128,128,128,.2)
      .button
        height:40px
        width:100%
        background-color:rgba(128,128,128,.1)
        text-align:center
        line-height:1
        font-size:$font-size-medium-x
        color:black

  .scroll-list-wrap
    width:375px
    .horizontal-scroll-list-wrap
      border-radius: 5px
      .cube-scroll-content
        display: inline-block
        width:auto
      ul
        padding: 15px 10px
        line-height: 70px
        white-space: nowrap
      li
        display: inline-block

  .cube-scroll-wrapper
    width:375px


</style>
