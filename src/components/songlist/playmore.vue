<template>
  <div class="mask" @click.self="cancel">
    <transition name="fade-more" v-if="visible">
    <div class="build">
      <ul class="build-top" v-show="isVip">
        <li class="li-img">
          <img :src="track.al.picUrl" alt="">
        </li>
        <li class="li-content">
            <div class="li-title">{{track.name}}</div>
            <div class="li-desc">{{track.ar[0].name}}</div>
        </li>
        <li class="li-vip">
          开通vip
        </li>
      </ul>

      <div v-show="isVip" class="open-vip">开通vip畅享千万曲库下载特权</div>

      <ul class="build-top" v-show="!isVip">
        <li class="li-img">
          <img src="../user/img/login1.png" alt="">
        </li>
        <li class="li-content">
            <div class="li-title">苦笑</div>
            <div class="li-desc">阿感</div>
        </li>
      </ul>

      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">

      <ul class="build-center">
        <li>
          <div class="build-icon">
            <i class="iconfont iconbofang5"></i>
          </div>
          <div class="build-text">
            <span>下一首播放</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconshoucang"></i>
          </div>
          <div class="build-text">
            <span>收藏到歌单</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconxiazaigequ"></i>
          </div>
          <div class="build-text">
            <span>下载</span>
            <span class="vip-css">vip</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconpinglun"></i>
          </div>
          <div class="build-text">
            <span>评论</span>
          </div>
        </li>
        <li @click="toShare">
          <div class="build-icon">
            <i class="iconfont iconfenxiang"></i>
          </div>
          <div class="build-text">
            <span>分享</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconwodeshoucang"></i>
          </div>
          <div class="build-text">
            <span>歌手：伍佰</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconzuijinbofang"></i>
          </div>
          <div class="build-text">
            <span>专辑：伍佰</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconbofang5"></i>
          </div>
          <div class="build-text">
            <span>单曲购买</span>
          </div>
        </li>
        <li @click="ring">
          <div class="build-icon">
            <i class="iconfont iconcailingdingzhi"></i>
          </div>
          <div class="build-text">
            <span>设为铃声</span>
            <span class="vip-css">vip</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconbofang2"></i>
          </div>
          <div class="build-text">
            <span>查看视频</span>
          </div>
        </li>
        <li>
          <div class="build-icon">
            <i class="iconfont iconquxiao"></i>
          </div>
          <div class="build-text">
            <span>屏蔽歌曲或歌手</span>
          </div>
        </li>
      </ul>
        </cube-scroll>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "playMore.vue",
        data() {
          return {
            visible:false,
            options: {
              scrollbar: true
            }
          }
        },
        props: {
          title: {
            type: String,
            default: ''
          },
          isVip : {
            type:Boolean,
            default:true
          },
          track: {
            type:Object,
            default:{}
          }
        },
        methods: {
          cancel () {
            // 触摸到遮罩层就取消本组件
            this.$emit('cancel')
          },
          show () {
            this.visible = true
          },
          hide () {
            this.visible = false
          },
          toShare () {
            this.$emit('share')
            this.$emit('cancel')
          },
          ring () {
            this.$emit('ring')
            this.$emit('cancel')
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .mask
    width:100%
    height:100%
    position:fixed
    top:0
    z-index:2001 //遮罩层需要更高
    left:0
    /*background-color:gray*/
    background: rgba(0, 0, 0, 0.5)
    .build
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
      .build-top
        height:80px
        /*line-height:90px*/
        padding-left:10px
        width:100%
        border-bottom:.5px solid rgba(128, 128, 128, 0.3)
        color:gray
        font-size:$font-size-small
        display:flex
        position:relative
        .li-img
          position:absolute
          left:12px
          top:10px
          img
            height:45px
            width:45px
            border-radius:5px
        .li-content
          position:absolute
          left:60px
          .li-title
            font-size:$font-size-medium
            max-width:210px
            margin-left:5px
            ellipsis()
            height:30px
            line-height:30px
            padding-top:10px
            color:black
          .li-desc
            font-size:$font-size-small
            color:gray
            height:20px
            margin-left:5px
        .li-vip
          height:20px
          width:50px
          border-radius:10px
          position:absolute
          right:22px
          top:30px
          color:red
          border:1px solid red
          padding:0 8px
          flex-center()
      .open-vip
        position:absolute
        height:15px
        line-height:15px
        color:gray
        font-size:$font-size-small
        top:60px
        left:12px
      .scroll-list-wrap
        height:380px
        .build-center
          width:100%
          margin:auto 10px
          overflow:hidden
          li
            display:flex
            height:45px
            line-height:45px
            border-bottom:.5px solid rgba(128, 128, 128, 0.3)
            .build-icon
              margin-left:5px
              font-size:$font-size-large-x
            .build-text
              margin-left:12px
              font-size:$font-size-medium-x
              .vip-css
                color:red
                font-size:$font-size-small
                display:inline-block
                height:12px
                width:20px
                border:1px solid red
                line-height:12px
                text-align:center
                border-radius:2px







  /*动画效果*/
  .fade-more-enter-active,
  .fade-more-leave-active
    transition: all .5s ease-in

  .fade-more-enter,
  .fade-more-leave-to
    transform: translateY(700px)
    opacity: 0
</style>
