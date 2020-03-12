<template>
  <transition name="cube-action-sheet-fade">
    <div class="mask" @click.self="cancel" v-show="visible">
      <transition name="cube-action-sheet-move">
    <div class="build"  v-if="visible">
      <ul class="build-top" v-show="isVip">
        <li class="li-img">
          <img :src="track.al && track.al.picUrl || track.album.artist.img1v1Url" alt="">
        </li>
        <li class="li-content">
            <div class="li-title">{{track.name}}</div>
            <div class="li-desc">{{track.ar && track.ar[0].name || track.artists[0].name}}</div>
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
            <div class="li-title">啦啦</div>
            <div class="li-desc">测试描述</div>
        </li>
      </ul>

      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">

      <ul class="build-center">
        <li v-if="!single">
          <div class="build-icon">
            <i class="iconfont iconbofang5"></i>
          </div>
          <div class="build-text">
            <span>下一首播放</span>
          </div>
        </li>
        <li @click="toCollected">
          <div class="build-icon">
            <i class="iconfont iconshoucang"></i>
          </div>
          <div class="build-text">
            <span>收藏到歌单</span>
          </div>
        </li>
        <li v-if="!single">
          <div class="build-icon">
            <i class="iconfont iconxiazaigequ"></i>
          </div>
          <div class="build-text">
            <span>下载</span>
            <span class="vip-css">vip</span>
          </div>
        </li>
        <li v-if="!single">
          <div class="build-icon">
            <i class="iconfont iconpinglun"></i>
          </div>
          <div class="build-text">
            <span>评论</span>
          </div>
        </li>
        <li @click="toShare" v-if="!single">
          <div class="build-icon">
            <i class="iconfont iconfenxiang"></i>
          </div>
          <div class="build-text">
            <span>分享</span>
          </div>
        </li>
        <li @click.stop="toSinger">
          <div class="build-icon">
            <i class="iconfont iconwodeshoucang"></i>
          </div>
          <div class="build-text">
            <span>歌手：
              {{track.ar && Artist(track.ar) || Artist(track.artists)}}
            </span>
          </div>
        </li>
        <li v-if="single">
          <div class="build-icon">
            <i class="iconfont iconzuijinbofang"></i>
          </div>
          <div class="build-text">
            <span>来源:
               歌单:'明年今日'
            </span>
            <!-- <span>
              暂无来源
            </span> -->
          </div>
        </li>
        <li v-if="noAlbum" @click.stop="toAlbum">
          <div class="build-icon">
            <i class="iconfont iconzuijinbofang"></i>
          </div>
          <div class="build-text">
            <span>专辑:
               {{(track.al && track.al.name) || (track.album && track.album.name)}}
            </span>
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
        <li v-if="single">
          <div class="build-icon">
            <i class="iconfont iconzuijinbofang"></i>
          </div>
          <div class="build-text">
            <span>音质:自动选择</span>
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
        <li v-if="(track.mvid && track.mvid !== 0) || (track.mv && track.mv !==0)">
          <div class="build-icon">
            <i class="iconfont iconbofang2"></i>
          </div>
          <div class="build-text">
            <span>查看视频</span>
          </div>
        </li>
        <li v-if="single">
          <div class="build-icon">
            <i class="iconfont iconzuijinbofang"></i>
          </div>
          <div class="build-text">
            <span>相似推荐</span>
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
          }
          // noAlbum:true
        }
      },
      props: {
        title: {
          type: String,
          default: ''
        },
        isVip: {
          type: Boolean,
          default: true
        },
        track: {
          type: Object,
          default: {}
        },
        noAlbum: {
          type: Boolean,
          default: true
        },
        single: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        cancel () {
            // 触摸到遮罩层就取消本组件
          this.$emit('cancel')
          this.hide()
        },
        show () {
          this.visible = true
        },
        hide () {
          this.visible = false
        },
        toShare () {
          this.$emit('share')
          // this.$emit('cancel')
          this.hide()
        },
        ring () {
          this.$emit('ring')
          // this.$emit('cancel')
          this.hide()
        },
        toSinger () {
          this.$emit('singer')
          this.hide()
        },
        toCollected () {
          this.$emit('collect')
          this.hide()
        },
        toAlbum () {
          this.$emit('album')
          this.hide()
        },
        Artist (artist) {
          let arr = []
          artist.forEach(item => {
            arr.push(item.name)
          })
          return arr.join('/')
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
    position:absolute
    z-index:2001 //遮罩层需要更高
    top:0
    right:0
    bottom: 0
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







  .cube-action-sheet-fade-enter, .cube-action-sheet-fade-leave-active
    opacity: 0
  .cube-action-sheet-fade-enter-active, .cube-action-sheet-fade-leave-active
    transition: all .3s ease-in-out

  .cube-action-sheet-move-enter, .cube-action-sheet-move-leave-active
    transform: translate3d(0, 100%, 0)
  .cube-action-sheet-move-enter-active, .cube-action-sheet-move-leave-active
    transition: all .3s ease-in-out
</style>
