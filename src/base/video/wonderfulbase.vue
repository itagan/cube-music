<template>
  <div class="flex-div" ref="nav">
    <div class="container">
      <div class="wrapper" @click.stop="playVideo(item,index,$event)" :key="index">
        <video :poster="item.data.coverUrl"
               :src="item.data.urlInfo.url"
               class="video"
               id="video"
               ref="video"
               :moted="true"
               @timeupdate="updateTime"
        >
          <source :src="item.data.urlInfo.url" type="audio/mpeg">
        </video>
        <div class="wrap">
          <div class="gorp" v-if="gorpShow">22</div>
          <div class="wrapper-left">
            <div  v-show="currentShow">
              <i class="iconfont iconCell-PlayVolume" v-if="currentTimeShow"></i>
              <span v-if="currentTimeShow" >{{item.data.playTime}}</span>
              <div v-if="!currentTimeShow"> {{Durations(currentTime)}} / {{item.data.durationms}}</div>
            </div>
          </div>
          <div class="wrapper-center" v-if="plays" >
            <i class="iconfont iconbofang6" v-if="play" style="font-size: 30px"></i>
            <i class="iconfont iconzanting1" v-else style="font-size: 30px"></i>
          </div>
          <div class="wrapper-right" v-show="playTimes">
            <i class="iconfont iconbofangzhuangtaizanting"  v-if="playTime"></i>
            <span  v-if="playTime">{{item.data.durationms}}</span>
            <i class="iconfont iconquanping" v-if="!playTime" style="font-size: 26px"></i>
          </div>
        </div>
        <div class="control" v-show="this.speedWidth && speedShow" ref="progressBar">
          <div class="bar-inner">
            <div class="speed" ref="speed"></div>
            <div
              ref="controlBtn"
              v-show="controlBtn"
              @touchstart.prevent="btnTouchStart"
              @touchmove.prevent="btnTouchMove"
              @touchend="btnTouchEnd"
            >
              <div class="control-btn" ref="btn"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="title" @click="toPlayerDetail(item.data.vid)">
              <span>
                {{item.data.title}}
              </span>
      </div>
      <div class="wrap-bottom">
        <div class="wrap-bottom-img" @click="avatar()">
          <img :src="item.data.creator.avatarUrl">
          <span>{{item.data.creator.nickname}}</span>
        </div>
        <div class="wrap-bottom-left" @click="praisedCount()">
          <i class="iconfont iconzan1"></i>
          <span>{{item.data.praisedCount}}</span>
        </div>

        <div class="wrap-bottom-center" @click="details(item)">
          <i class="iconfont iconliuyan"></i>
          <span>{{item.data.commentCount}}</span>
        </div>
        <i class="wrap-bottom-right iconfont icon-ellipsis" @click="more()"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import { prefixStyle } from '../../assets/js/dom'
    const btnBtnWidth = 10
    const transform = prefixStyle('transform')
    export default {
      data () {
        return {
          gorpShow: false,
          videoDom: '',
          allVideoDom: '',
          currentShow: true,
          currentTimeShow: true,
          controlBtn: false,
          playTime: true,
          playTimes: true,
          plays: true,
          play: true,
          currentTime: `00:00`,
          speedShow: true,
          speedWidth: 0,
          durations: 0,
          currentDuration: [{}, {}],
          durationHistory: [],
          timerOne: null,
          timerTwo: null,
          timerThree: null
        }
      },
      props: {
        videos: {
          type: Array,
          default: [],
          required: true
        },
        item: {
          type: Object,
          required: true
        },
        index: {
          type: Number,
          required: true
        },
        pullDownY: {
          type: Number,
          default: 0
        },
        ind: {
          type: Number,
          required: true
        }
      },
      created () {
        this.touch = {}
      },
      computed: {
        percent () {
          return this.currentTime / this.durations
        },
        ...mapGetters([
          'currentIndex',
          'back'
        ]),
        current () {
          return this.currentIndex
        }
      },
      watch: {
        percent (newPercent) {
          if (newPercent >= 0 && !this.touch.initiated) {
            const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth
            const offsetWidth = newPercent * barWidth
            this.$refs.speed.style.width = `${offsetWidth}px`
            this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
          }
        },
        videos () {
          this.$emit('refresh')
        },

        current (newCurrent, oldCurrent) {
                // vuex获取索引方式
        },
        ind (ind) {
          this.allVideoDom = document.querySelectorAll('video')
          for (let i = 0; i < this.videos.length; i++) {
            if (ind === i) continue
            this.videos[i].isPlay = false
            this.allVideoDom[i].pause()
            this.allVideoDom[i].currentTime = 0
          }
          this.allVideoDom[ind].play()
        }
      },
      methods: {
        playVideo (item, index, e) {
          this.top = this.$refs.nav.getBoundingClientRect().top
          this.videoDom = this.$refs.video
          this.allVideoDom = document.querySelectorAll('video')
          this.durations = this.videoDom.duration
          if (typeof item.isPlay === 'undefined') {
            this.$set(item, 'isPlay', false)
          }
          if (this.top > 100) {
            this.$emit('rollback')
          }
          if (this.timerOne) {
            clearTimeout(this.timerOne)
          }
          if (this.timerTwo) {
            clearTimeout(this.timerTwo)
          }
          if (this.currentTime === 0) {
            this.videoDom.play()
            item.isPlay = true
            this.plays = false
            this.currentShow = false
            this.playTimes = false
            this.speedShow = true
            this.controlBtn = false
            for (let i = 0; i < this.videos.length; i++) {
              if (i === index) continue
              this.allVideoDom[i].pause()
              this.allVideoDom[i].currentTime = 0
              this.videos[i].isPlay = false
            }
          } else {
            let isTarget = e.target.className === 'iconfont iconbofang6' || e.target.className === 'iconfont iconzanting1'
            if (item.isPlay && isTarget) {
              if (this.timerOne) {
                clearTimeout(this.timerOne)
              }
              if (this.timerTwo) {
                clearTimeout(this.timerTwo)
              }
              this.videoDom.pause()
              item.isPlay = false
              this.plays = true
              this.play = true
              this.currentShow = true
              this.currentTimeShow = false
              this.playTimes = true
              this.playTime = false
              this.speedShow = true
              this.controlBtn = true
              this.currentTime = this.allVideoDom[index].currentTime
              for (let i = 0; i < this.videos.length; i++) {
                if (index === i) continue
                this.videos[i].isPlay = false
                this.allVideoDom[i].pause()
                this.allVideoDom[i].currentTime = 0
                this.videos[i].isPlay = false
              }
            } else if (isTarget && !item.isPlay) {
              this.videoDom.play()
              item.isPlay = true
              this.play = false
              this.currentTimeShow = false
              this.speedShow = true
              this.controlBtn = true
              if (this.timerOne) {
                clearTimeout(this.timerOne)
              }
              if (this.timerTwo) {
                clearTimeout(this.timerTwo)
              }
              this.timerOne = setTimeout(() => {
                this.plays = false
                this.currentShow = false
                this.playTimes = false
                this.playTime = false
                this.controlBtn = false
              }, 3000)
              for (let i = 0; i < this.videos.length; i++) {
                if (i === index) continue
                this.allVideoDom[i].pause()
                this.allVideoDom[i].currentTime = 0
                this.videos[i].isPlay = false
              }
            } else if (!isTarget) {
              this.plays = !this.plays
              this.currentShow = !this.currentShow
              this.playTimes = !this.playTimes
              this.controlBtn = !this.controlBtn
              this.playTime = false
              this.currentTimeShow = false
              this.speedShow = true
              this.timerTwo = setTimeout(() => {
                this.plays = false
                this.currentShow = false
                this.playTimes = false
                this.controlBtn = false
              }, 3000)
              if (!this.videoDom.paused) {
                this.play = false
              }
            }
          }
        },
        updateTime (e) {
          this.currentTime = e.target.currentTime
          this.speedWidth = this.percent * 365
        },
        Durations (durations) {
          durations = durations | 0
          let minute = durations / 60 | 0
          minute = minute < 10 ? '0' + minute : minute
          let second = durations % 60
          second = second < 10 ? '0' + second : second
          return `${minute}:${second}`
        },
        toPlayerDetail (vid) {
          this.$router.push({
            path: `videoplayer`
          })
          this.video({vid})
        },
        avatar () {
                // 去up主页
        },
        praisedCount () {
                // 点赞
        },
        details (item) {
          this.$router.push({
            path: `videoplayer`
          })
          let vid = item.data.vid
          this.video({vid})
          this.commentBack({back: true})
          let currentVideo = this.item.data
          currentVideo._currentTime = this.currentTime
          this.saveCurrentVideoList(currentVideo)
        },
        more () {
                // 更多
        },
            // 触摸有关
        btnTouchStart (e) {
          this.touch.initiated = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.speed.clientWidth
          console.log(this.touch.left)
        },
        btnTouchMove (e) {
          if (!this.touch.initiated) {
            return
          }
          const deltaX = e.touches[0].pageX - this.touch.startX
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnBtnWidth, Math.max(0, this.touch.left + deltaX))
          this._offset(offsetWidth)
          this.bigBtn()
        },
        btnTouchEnd (e) {
          this.touch.initiated = false
          this._triggerPercent()
          this.removeBig()
        },
        _triggerPercent () {
          const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth
          const percent = this.$refs.speed.clientWidth / barWidth
          this.$refs.video.currentTime = this.durations * percent
          if (this.videoDom.paused) {
            this.videoDom.isPlay = true
            this.videoDom.play()
            this.play = false
            if (this.timerOne) {
              clearTimeout(this.timerOne)
            }
            if (this.timerTwo) {
              clearTimeout(this.timerTwo)
            }
            this.timerThree = setTimeout(() => {
              this.plays = false
              this.currentShow = false
              this.playTimes = false
              this.controlBtn = false
            }, 3000)
          }
        },
        _offset (offsetWidth) {
          this.$refs.speed.style.width = `${offsetWidth}px`
          this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        },
        bigBtn () {
          this.$refs.btn.classList.add('activeBtn')
        },
        removeBig () {
          this.$refs.btn.classList.remove('activeBtn')
        },
        ...mapMutations({
          setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
        ...mapActions([
          'video',
          'setCurrentTimes',
          'commentBack',
          'saveCurrentVideoList'
        ])
      },
      destroyed () {
            // 销毁期把每个项的item isPlay属性剔除或者为false。
        for (let i = 0; i < this.videos.length; i++) {
          this.videos[i].isPlay = false
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"


  .flex-div
    width:100%
    height:308.47px
    background-color:black
    .container
      margin:auto
      .wrapper
        background-color:black
        position:relative
        height:210px
        font-size:$font-size-small-s
        .video
          width:100%
          height:210px
        .wrap
          position:absolute
          top:0
          right:0
          bottom:0
          left:0
          opacity: 0.8
          .gorp
            position:absolute
            top:10px
            right:10px
            border:1px solid gray
            min-width:25px
            text-align:center
            border-radius:6px
            height:13px
            line-height:13px
            padding:0 8px
          .wrapper-left
            position: absolute
            left:5px
            bottom:10px
            height:10px
            color:white
          .wrapper-center
            color:white
            position: absolute
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size:$font-size-large-x
          .wrapper-right
            position: absolute
            right:10px
            bottom:10px
            height:10px
            color:white
            .iconquanping
              position:absolute
              bottom:-3px
              right:-8px
        .control
          height:2px
          width:100%
          /*margin:0 7px*/
          background-color:gray
          position:relative
          bottom:0
          .bar-inner
            position:absolute
            bottom:0
            height: 100%
            width:100%
            .speed
              height:2px
              background-color:red
              width:100%
              position: absolute
              left:0
              top: 0
            div
              position: absolute
              left:-10px
              top: -2px
              width: 20px
              height: 20px
              flex-center
              .control-btn
                border-radius:50%
                background-color:red
                height:10px
                width:10px
                position:absolute
                /*bottom:10px*/
                left:10px

      .activeBtn
        height:15px !important
        width:15px  !important
        top:-5px !important

      .title
        border-bottom:.5px solid rgba(128,128,128,.6)
        flex-between()
        margin:auto 5px
        height:50px
        color:white
        span
          ellipsis()
          font-size:$font-size-medium
        img
          width:30px
          height:30px
          border-radius:50%
      .wrap-bottom
        height:50px
        line-height:50px
        color:white
        opacity: 0.8
        margin:auto 10px
        position:relative
        flex-center(column)
        font-size:$font-size-large
        .wrap-bottom-img
          position:absolute
          left:0
          height:100%
          min-width:35px
          flex-center()
          img
            width:30px
            height:30px
            border-radius:50%
            margin-top:-15px
            position:absolute
            top:50%
            left:0
          span
            ellipsis()
            height:35px
            line-height:35px
            margin-left:35px
            font-size:$font-size-small
        .wrap-bottom-left
          position:absolute
          left:210px
          height:100%
          min-width:35px
          span
            font-size:$font-size-small-s
            position:absolute
            bottom:8px
            left:13px
        .wrap-bottom-center
          position:absolute
          left:280px
          height:100%
          min-width:35px
          span
            font-size:$font-size-small-s
            position:absolute
            bottom:8px
            left:13px
        .wrap-bottom-right
          position:absolute
          right:-10px
          height:100%
          width:35px
          text-align:center

    .touch-action
      none
</style>
