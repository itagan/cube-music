<template>
      <div class="wrapper" @click="playVideo" >
        <video :poster="detail.coverUrl"
               :src="videoUrl"
               class="video"
               width="375px"
               height="200px"
               id="video"
               ref="video"
               :moted="true"
               @timeupdate="updateTime"
        >
          <source :src="videoUrl" type="audio/mpeg">
        </video>

        <div class="wrap">
          <div class="gorp" v-if="gorpShow">22</div>
          <div class="left-top" @click="toBack">
            <i class="iconfont iconfanhui" style="font-size: 24px"></i>
          </div>
          <div class="wrapper-left">
            <div  v-show="currentShow">
              <i class="iconfont iconCell-PlayVolume" v-if="currentTimeShow"></i>
              <span v-if="currentTimeShow" >{{detail.playTime}}</span>
              <div v-if="!currentTimeShow"> {{Durations(currentTime)}} / {{detail.durationms}}</div>
            </div>
          </div>
          <div class="wrapper-center" v-if="plays" >
            <i class="iconfont iconbofang5" v-if="play" style="font-size: 40px"></i>
            <i class="iconfont iconzanting2" v-else style="font-size: 30px"></i>
          </div>

          <div class="wrapper-right" v-show="playTimes">
            <i class="iconfont iconbofangzhuangtaizanting"  v-if="playTime"></i>
            <span  v-if="playTime">{{detail.durationms}}</span>
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

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import { prefixStyle } from '../../assets/js/dom'
    const btnBtnWidth = 10
    const transform = prefixStyle('transform')

    export default {
      name: 'videoList.vue',
      data () {
        return {
          gorpShow: false,
          videoDom: '',
          titleImg: false,
          isPlay: false,
          currentShow: true,
          currentTimeShow: true,
          check: true,
          wrapShow: false,
          controlBtn: false,
          playTime: true,
          playTimes: true,
          plays: true,
          play: true,
          speedShow: true,
          currentTime: `00:00`,
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
        detail: {
          type: Object,
          required: true
        },
        videoUrl: {
          type: String,
          default: ''
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
          'videoList',
          'currentVideo',
          'videoCurrentTime',
          'currentIndex',
          'back'
        ])
      },
      watch: {
        percent (newPercent) {
          if (newPercent >= 0 && !this.touch.initiated) {
            const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth
            const offsetWidth = newPercent * barWidth
            this.$refs.speed.style.width = `${offsetWidth}px`
            this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
          }
        }
      },
      methods: {
        playVideo (e) {
          this.videoDom = this.$refs.video
          this.durations = this.videoDom.duration
          if (this.timerOne) {
            clearTimeout(this.timerOne)
          }
          if (this.timerTwo) {
            clearTimeout(this.timerTwo)
          }
          if (this.currentTime === 0) {
            this.videoDom.play()
            this.isPlay = true
            this.plays = false
            this.currentShow = false
            this.playTimes = false
            this.speedShow = true
            this.controlBtn = false
          } else {
            let isTarget = e.target.className === 'iconfont iconbofang5' || e.target.className === 'iconfont iconzanting2'
            if (this.isPlay && isTarget) {
              if (this.timerOne) {
                clearTimeout(this.timerOne)
              }
              if (this.timerTwo) {
                clearTimeout(this.timerTwo)
              }
              this.videoDom.pause()
              this.isPlay = false
              this.plays = true
              this.play = true
              this.currentShow = true
              this.currentTimeShow = false
              this.playTimes = true
              this.playTime = false
              this.speedShow = true
              this.controlBtn = true
            } else if (isTarget && !this.isPlay) {
              this.videoDom.play()
              this.isPlay = true
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
          this.currentTime = e.target.currentTime // 播放的时候派发事件，能够获得当前播放时间 ***注意写法
          this.speedWidth = this.percent * 375
        },
        Durations (durations) {
          durations = durations | 0
          let minute = durations / 60 | 0
          minute = minute < 10 ? '0' + minute : minute
          let second = durations % 60
          second = second < 10 ? '0' + second : second
          return `${minute}:${second}`
        },
        btnTouchStart (e) {
          this.touch.initiated = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.speed.clientWidth
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
        scrollBack () {
          this.$refs.nav.scrollBy(0, -30, 300)
        },
        toBack () {
          this.$router.go(-1)
          setTimeout(() => {
            this.setCommentBack(false)
          }, 100)
        },
        ...mapActions([
          'video',
          'setCurrentTimes',
          'commentBack'
        ]),
        ...mapMutations({
          setVideoList: 'SET_VIDEO_LIST',
          setVideoCurrentTime: 'SET_VIDEO_CURRENT_TIME',
          setCommentBack: 'SET_BACK'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

        .wrapper
          background-color:#dcdcdc
          width:375px
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
              padding:2px 8px
              background-color:greenyellow
            .left-top
              position: absolute
              left:20px
              top:20px
              color:white
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
            background-color:gray
            position:relative
            bottom:2px
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
                padding:0 5px
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
                  z-index:2005

        .activeBtn
          height:15px !important
          width:15px  !important
          top:-5px !important


      .touch-action
        none
</style>
