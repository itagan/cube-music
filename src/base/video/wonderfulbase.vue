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

        <div class="control" v-show="this.speedWidth" ref="progressBar">
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

        <div class="wrap-bottom-center" @click="details(item.data.vid)">
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
          currentShow: true, // 视频左下角播放量或者进度是否显示
          currentTimeShow: true, // 播放量跟播放进度转换
          check: true, // 是否显示
          countTime: true, // 视频左下角播放量变成播放时间进度
          wrapShow: false, // 遮罩层是否存在
          controlBtn: false, // 进度按钮
          playTime: true, // 播放总时间是否变成视频全屏按钮
          playTimes: true, // 播放总时间或者全屏按钮是否会显示
          plays: true, // 播放或暂停按钮显示出来
          play: true, // 播放和暂停按钮切换
          currentTime: `00:00`, // 播放进度时间
          activeIndex: -1,
          speedWidth: 0,
          durations: 0, // 视频播放总时间
          currentDuration: [{}, {}], // 存放前后播放视频的播放进度
          durationHistory: [] // 存放本视频流页面前后视频播放进度的历史记录
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
        this.touch = {}  // 用于不同回调的时候共享数据挂载到这里来
      },
      computed: {
        percent () {
          return this.currentTime / this.durationms
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
                // 为避免拖动的时候跳动，因为拖动的时候原来还播着，这里加个条件限制，拖动的时候initiated为true 这样就不能进行改变跳动了
          if (newPercent >= 0 && !this.touch.initiated) {
            const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth // 获取实际进度条框的长度
            const offsetWidth = newPercent * barWidth // 偏移的宽度即比例*总长
            this.$refs.speed.style.width = `${offsetWidth}px` // 按钮底部进度条移动是其宽度距离
            this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)` // 按钮小球的偏移，别忘记单位和模板字符串形式
          }
        },
        videos () {
                // 刷新了，数据变化了。向父级说明刷新完成
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
          this.top = this.$refs.nav.getBoundingClientRect().top // 播放盒子距离顶部距离。
            // 播放的时候判断距离顶部距离。上滚动回到可播放区。
          if (this.top > 100) {
            this.$emit('rollback')
          }

          this.videoDom = this.$refs.video
          this.allVideoDom = document.querySelectorAll('video')
          this.durationms = this.videoDom.duration
          this.setCurrentIndex(index)

          if (typeof item.isPlay === 'undefined') {
                    // 给对象添加属性
            this.$set(item, 'isPlay', false)
          }

                // 隐藏播放量，显示播放进度
          this.currentTimeShow = false
            // 播放或暂停的时候进度按钮显示
          this.controlBtn = true
            // 播放总长度变成全屏按钮
          this.playTime = false
          this.play = false
            // 右下角播放总长度变成全屏按钮
          this.playTimes = true
            // 左下角播放量或者进度是否显示
          this.currentShow = true
          let obj = {}
          obj[index] = this.currentTime

            // 看看当前被点击的是否有在数组中//不存在则返回-1
          let i = this.currentDuration.findIndex((value) => {
            return index === parseInt(Object.keys(value)[0])
          })

            // 每次点击都能够决定是否呈现播放或者暂停按钮
          this.plays = !this.plays

            // 播放的时候视频顶部显示切换
          setTimeout(() => {
            this.controlBtn = false
                // 右下角播放总长度变成全屏按钮
            this.playTimes = false
                // 左下角播放量或者进度是否显示
            this.currentShow = false
                // 中间播放按钮或暂停按钮是否显示
            this.plays = false
          }, 5000)

          if (this.currentTime === 0) {
                    // 播放进度为0的情况下，点击就可以播放。否则需要点击播放或暂停按钮实现
            if (item.isPlay) {
              this.videoDom.pause()
                    // 标志位
              item.isPlay = false
              this.activeIndex = -1
              this.countTime = false
                    // 中间播放按钮或暂停按钮是否显示
              this.plays = true
                    // 暂停按钮变播放按钮
              this.play = true

              this.currentTime = this.allVideoDom[index].currentTime
              if (i !== -1) {
                            // 原来就存在的话，那就把它替换为新播放进度
                this.currentDuration[i][index] = this.allVideoDom[index].currentTime
              } else {
                if (this.currentDuration.length >= 2) {
                  this.currentDuration.splice(0, 1)// 删除第1个
                  this.currentDuration.push(obj)// 再把新的推进来
                } else {
                  this.currentDuration.push(obj)
                }
              }

                        // 当该视频开启了播放，即使之后暂停。其它视频统统还原状态。仅仅保存上一条播放的进度。其它重置。
              for (let i = 0; i < this.videos.length; i++) {
                if (index === i) continue
                this.videos[i].isPlay = false
                this.allVideoDom[i].pause()
                this.allVideoDom[i].currentTime = 0 // 重置
                this.videos[i].isPlay = false
              }
            } else {
                        // 从vuex获取播放进度时间并给对应视频设置播放进度
                        // this.currentTime = this.videoCurrentTime[0];
                        // videoDams[index].currentTime = this.videoCurrentTime;

              this.videoDom.play()
                    // 标志位播放
              item.isPlay = true
              this.activeIndex = index

                    // 播放的时候视频顶部显示切换
              setTimeout(() => {
                            // 底部播放或暂停的时候进度按钮显示
                this.controlBtn = false
                        // 右下角播放总长度变成全屏按钮
                this.playTimes = false
                        // //中间播放按钮变暂停按钮
                        // this.plays = false;
                        // 左下角播放量或者进度是否显示
                this.currentShow = false
                        // 隐藏播放进度播放量，显示播放量
                this.currentTimeShow = true
                        // 播放按钮变暂停按钮
                this.play = true
                        // 中间播放按钮或暂停按钮是否显示
                this.plays = false
              }, 5000)

              if (this.currentDuration.length >= 2) {
                if (i !== -1) {
                                // 在数组中存在，那么取出上次的播放进度作为当前播放开头
                  this.currentTime = this.currentDuration[i][index]
                  this.allVideoDom[index].currentTime = this.currentDuration[i][index]
                }
              } else {
                            // 没找到说明没有最近上次播放进度
                this.currentDuration.splice(0, 1)// 删除第1个
                this.currentDuration.push(obj)// 再把新的推进来
              }
              for (let i = 0; i < this.videos.length; i++) {
                if (i === index) continue
                this.allVideoDom[i].pause()
                this.allVideoDom[i].currentTime = 0 // 重置
                        // 还得把其它项的isPlay属性重置为false。解决点击两次才播放的bug。因为其他的isPlay属性可能还是true。。
                this.videos[i].isPlay = false
              }
            }
          } else {
                let isTarget = e.target.className === 'iconfont iconbofang6' || e.target.className === 'iconfont iconzanting1'
              if (isTarget) {
              if (item.isPlay) {
                this.videoDom.pause()
                        // 标志位
                item.isPlay = false
                this.activeIndex = -1
                this.countTime = false
                        // 中间播放按钮或暂停按钮是否显示
                this.plays = true
                        // 暂停按钮变播放按钮
                this.play = true

                this.currentTime = this.allVideoDom[index].currentTime
                if (i !== -1) {
                                // 原来就存在的话，那就把它替换为新播放进度
                  this.currentDuration[i][index] = this.allVideoDom[index].currentTime
                } else {
                  if (this.currentDuration.length >= 2) {
                    this.currentDuration.splice(0, 1)// 删除第1个
                    this.currentDuration.push(obj)// 再把新的推进来
                  } else {
                                    // this.currentDuration.splice(0,1);//删除第1个
                    this.currentDuration.push(obj)
                  }
                }

                            // 当该视频开启了播放，即使之后暂停。其它视频统统还原状态。仅仅保存上一条播放的进度。其它重置。
                for (let i = 0; i < this.videos.length; i++) {
                  if (index === i) continue
                  this.videos[i].isPlay = false
                  this.allVideoDom[i].pause()
                  this.allVideoDom[i].currentTime = 0 // 重置
                  this.videos[i].isPlay = false
                }
              } else {
                            // 从vuex获取播放进度时间并给对应视频设置播放进度
                            // this.currentTime = this.videoCurrentTime[0];
                            // videoDams[index].currentTime = this.videoCurrentTime;
                this.videoDom.play()
                        // 标志位播放
                item.isPlay = true
                this.activeIndex = index

                        // 播放的时候视频顶部显示切换
                setTimeout(() => {
                                // 底部播放或暂停的时候进度按钮显示
                  this.controlBtn = false
                            // 右下角播放总长度变成全屏按钮
                  this.playTimes = false
                            // //中间播放按钮变暂停按钮
                            // this.plays = false;
                            // 左下角播放量或者进度是否显示
                  this.currentShow = false
                            // 隐藏播放进度播放量，显示播放量
                  this.currentTimeShow = true
                            // 播放按钮变暂停按钮
                  this.play = true
                            // 中间播放按钮或暂停按钮是否显示
                  this.plays = false
                }, 5000)

                if (this.currentDuration.length >= 2) {
                  if (i !== -1) {
                                    // 在数组中存在，那么取出上次的播放进度作为当前播放开头
                    this.currentTime = this.currentDuration[i][index]
                    this.allVideoDom[index].currentTime = this.currentDuration[i][index]
                  }
                } else {
                                // 没找到说明没有最近上次播放进度
                  this.currentDuration.splice(0, 1)// 删除第1个
                  this.currentDuration.push(obj)// 再把新的推进来
                }
                for (let i = 0; i < this.videos.length; i++) {
                  if (i === index) continue
                  this.allVideoDom[i].pause()
                  this.allVideoDom[i].currentTime = 0 // 重置
                            // 还得把其它项的isPlay属性重置为false。解决点击两次才播放的bug。因为其他的isPlay属性可能还是true。。
                  this.videos[i].isPlay = false
                }
              } // 标志位
            } else {
                        // 播放后遮罩层存在,那就只能点击中间的播放暂停按钮实现播放暂停
                        // this.wrapShow = true;
            }
          }
        },

        updateTime (e) {
          this.currentTime = e.target.currentTime // 播放的时候派发事件，能够获得当前播放时间 ***注意写法
          this.speedWidth = this.percent * 355
        },
        Durations (durations) {
          durations = durations | 0 // 互零操作符，一个正数向下取整 相当于Math.floor方法
          let minute = durations / 60 | 0
          minute = minute < 10 ? '0' + minute : minute
          let second = durations % 60
          second = second < 10 ? '0' + second : second// 秒数前面补零操作
          return `${minute}:${second}`
        },
        toPlayerDetail (vid) {
            // 视频详情页，这个不会把底部评论提前
          this.$router.push({
            path: `videoplayer`
          })
            // 给vuex提交vid，确定当前要播放视频id
          this.video({vid})
        },
        avatar () {
                // 去up主页
        },
        praisedCount () {
                // 点赞
        },
        details (vid) {
            // 视频详情页，这个不会把底部评论提前
          this.$router.push({
            path: `videoplayer`
          })
            // 给vuex提交vid，确定当前要播放视频id
          this.video({vid})
          this.commentBack({back: true})
        },
        more () {
                // 更多
        },
            // 触摸有关
        btnTouchStart (e) {
          this.touch.initiated = true  // 设立标志位，true表示初始化了
          this.touch.startX = e.touches[0].pageX // 开始触摸时候的位置
          this.touch.left = this.$refs.speed.clientWidth // 开始点击的时候进度条本身偏移长度
          console.log(this.touch.left)
        },
        btnTouchMove (e) {
          if (!this.touch.initiated) {
            return // 触摸时候没有start事件直接进入move直接返回
          }
          const deltaX = e.touches[0].pageX - this.touch.startX   // 计算Move过程中移动的距离，移动的坐标减去开始的
                //  拖拽的长度不能太大，拖拽如果直接到末尾的话，那就是总长-按钮的距离了。取它与拖拽移动距离的最小值
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnBtnWidth, Math.max(0, this.touch.left + deltaX))
          this._offset(offsetWidth)
          this.bigBtn()
        },
        btnTouchEnd (e) {
          this.touch.initiated = false
          this._triggerPercent() // 拖动结束调用方法设置播放进度
          this.removeBig()
        },
        _triggerPercent () {
          const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth // 获取进度条框的实际长度，需要减去上面按钮的宽度
          const percent = this.$refs.speed.clientWidth / barWidth // 底部进度条的长度/进度条框长度，得到比例

          this.$refs.video.currentTime = this.durationms * percent
                // 拖动后实现播放
          if (!this.videoDom.isPlay) {
            this.videoDom.isPlay = true
            this.videoDom.play()
          }
        },
        _offset (offsetWidth) {
                // 底部的进度条和拖动按钮设置一样的长度/位移
          this.$refs.speed.style.width = `${offsetWidth}px`
          this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        },
            // 滚动的时候小球放大
        bigBtn () {
          this.$refs.btn.classList.add('activeBtn')
        },
            // 不滚动的时候还有
        removeBig () {
          this.$refs.btn.classList.remove('activeBtn')
        },
        ...mapMutations({
          setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
        ...mapActions([
          'video',
          'setCurrentTimes',
          'commentBack'
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
