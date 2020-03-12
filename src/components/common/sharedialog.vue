<template>

 <!-- <div class="mask" @click.self="cancel" v-if="visible">
    <transition name="fade-more" v-if="visible">
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

        <div class="scroll-list-wrap-share">
          <cube-scroll
            ref="scroll"
            direction="horizontal"
            :options="options"
            @scroll="scrollHandler"
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
       </transition>
      </div> -->

  <transition name="cube-action-sheet-fade">
    <div class="mask" @click.self="cancel" v-show="visible">
      <transition name="cube-action-sheet-move">
        <!-- 这里用v-if，否则不能产生滚动 -->
        <div class="share-build" v-if="visible">
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

          <div class="scroll-list-wrap-share">
            <cube-scroll
              ref="Scroll"
              direction="horizontal"
              :options="options"
              @scroll="scrollHandler"
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
          <cube-button class="button" @click.stop="hide">取消</cube-button>
        </div>
      </transition>
    </div>
  </transition>

</template>

<script>
    export default {
      name: 'playMore.vue',
      data () {
        return {
          visible: false,
          options: {
            scrollbar: true
          },
          scrollY: 0
        }
      },
      methods: {
        // show () {
        //   this.$refs.popup.show()
        // },
        // hide () {
        //   this.$refs.popup.hide()
        // },
        scrollHandler ({ y }) {
          this.scrollY = -y
          // console.log(this.scrollY)
        },
        cancel () {
          // 触摸到遮罩层就取消本组件
        // this.$emit('cancel')
          this.hide()
        },
        show () {
          this.visible = true
        },
        hide () {
          this.visible = false
        }
      }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .mask
    width:100%
    height:100%
    position:fixed
    top:0
    z-index:2002 //遮罩层需要更高
    left:0
    background: rgba(0, 0, 0, 0.5)
    .share-build
      width:100%
      height:auto
      background-color:white
      /*opacity:1*/
      border-top-left-radius:20px
      border-top-right-radius:20px
      font-size:$font-size-medium
      z-index:2001
      position:fixed
      bottom:0
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

  .scroll-list-wrap-share >>>  //深度选择器解决样式因scoped隔绝传递问题
    width:375px
    .cube-scroll-wrapper
      width:375px
      .cube-scroll-content
        display: inline-block
        width:auto
      ul
        padding: 15px 10px
        line-height: 70px
        white-space: nowrap
      .share-bottom
        width:auto
      li
        display: inline-block

  .cube-scroll-wrapper
    width:375px





  .cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
    opacity: 0
  .cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
    transition: all .3s ease-in-out

  .cube-action-sheet-move-enter, .cube-action-sheet-move-leave-active
    transform: translate3d(0, 100%, 0)
  .cube-action-sheet-move-enter-active, .cube-action-sheet-move-leave-active
    transition: all .3s ease-in-out

</style>
