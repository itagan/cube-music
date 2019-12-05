<template>
      <div class="wrapper" @click="playVideo" >
        <video :poster="detail.coverUrl"
               :src="videourl"
               class="video"
               width="375px"
               height="200px"
               id="video"
               ref="video"
               :moted="true"
               @timeupdate="updateTime"
        >
          <source :src="videourl" type="audio/mpeg">
        </video>

        <div class="wrap">
          <div class="grop" v-if="gropshow">22</div>
          <div class="leftTop" @click="toBack">
            <i class="iconfont iconzan1"></i>
          </div>
          <div class="wrapperLeft">
            <div  v-show="currentshow">
              <i class="iconfont iconzan1" v-if="currentTimeShow"></i>
              <span v-if="currentTimeShow" >{{detail.playTime}}</span>
              <div v-if="!currentTimeShow"> {{Durationms(currentTime)}} / {{detail.durationms}}</div>
            </div>
          </div>
          <div class="wrapperCenter" v-if="plays" >
            <i class="iconfont iconnetease" v-if="play"></i>
            <i class="iconfont iconliuyan" v-else></i>
          </div>

          <div class="wrapperRight" v-show="playTimes">
            <i class="iconfont iconzan1"  v-if="playTime"></i>
            <span  v-if="playTime">{{detail.durationms}}</span>
            <i class="iconfont iconliuyan" v-if="!playTime"></i>
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
              <div class="controlBtn" ref="btn"></div>
            </div>
          </div>
        </div>

      </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {currentVideo} from '../../store/getters'
    import {serializeNumber} from '../../assets/js/number'
    import {durationms} from '../../assets/js/timestamp'
    import { prefixStyle } from '../../assets/js/dom'

    const btnBtnWidth = 10; //按钮的长度 //触摸按钮的时候放大按钮，从10到20
    const transform  = prefixStyle('transform')

    export default {
        name: "videoList.vue",
        data() {
            return {
                gropshow:false,
                videoDom:'',
                titleImg:false, //标题右边的图
                isPlay:false, //是否播放..
                currentshow:true,//视频左下角播放量或者进度是否显示
                currentTimeShow:true,//播放量跟播放进度转换
                check:true,//是否显示
                wrapShow:false, //遮罩层是否存在
                controlBtn:false, //进度按钮
                playTime:true, //播放总时间是否变成视频全屏按钮
                playTimes:true,//播放总时间或者全屏按钮是否会显示
                plays:true,//播放或暂停按钮显示出来
                play:true, //播放和暂停按钮切换
                speedShow: true , //进度条和按钮是否显示
                currentTime:`00:00`, //播放进度时间
                speedWidth:0,
                durationms:0,//视频播放总时间
                currentDuration:[{},{}], //存放前后播放视频的播放进度
                durationHistory:[], //存放本视频流页面前后视频播放进度的历史记录
            }
        },
        props: {
            detail: {
                type:Object,
                required: true
            },
            videourl:{
                type:String,
                default: ''
            }
        },
        created() {
            this.touch = {}  //用于不同回调的时候共享数据挂载到这里来
        },
        computed: {
            percent(){
                return this.currentTime / this.durationms
            },
            ...mapGetters([
                'videoList',
                'currentVideo',
                'videoCurrentTime',
                'currentIndex',
                'back'
            ]),
        },
        watch: {
            percent(newPercent) {
                //为避免拖动的时候跳动，因为拖动的时候原来还播着，这里加个条件限制，拖动的时候initiated为true 这样就不能进行改变跳动了
                if (newPercent >= 0 && !this.touch.initiated) {
                    const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth //获取实际进度条框的长度
                    const offsetWidth = newPercent * barWidth //偏移的宽度即比例*总长
                    this.$refs.speed.style.width = `${offsetWidth}px` //按钮底部进度条移动是其宽度距离
                    this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)` //按钮小球的偏移，别忘记单位和模板字符串形式
                }
            },

        },

        methods:{
            playVideo(e) {
                this.videoDom = this.$refs.video; //获取当前播放的视频DOM
                this.durationms = this.videoDom.duration; //获取播放时长
                if(this.currentTime === 0) {
                    //********功能需求：播放进度为0的情况下，点击就可以播放。否则需要点击播放或暂停按钮实现********
                    this.videoDom.play();
                    this.isPlay = true;


                    //中间播放按钮或暂停按钮是否显示
                    this.plays = false;
                    //左下角播放量或者进度是否显示
                    this.currentshow = false;
                    //右下角播放总长度变成全屏按钮
                    this.playTimes = false;
                    //每次点击应都保持底部进度条有显示
                    this.speedShow = true;
                    //播放或暂停的时候进度按钮显示
                    this.controlBtn = false;

                }else {
                    //已经有播放进度。那么是手动或被动暂停了。
                    //***被暂停时候只能点击图标实现播放或暂停。直接点击屏幕显示图层图标***
                    let isTarget = e.target.className ===  'iconfont iconnetease' || e.target.className ===  'iconfont iconliuyan';

                    if(this.isPlay && isTarget) {
                        this.videoDom.pause();
                        this.isPlay =  false;

                        console.log('暂停');
                        //中间播放按钮或暂停按钮是否显示
                        this.plays = true;
                        //暂停按钮变播放按钮
                        this.play = true;
                        //左下角播放量或者进度是否显示
                        this.currentshow = true;
                        //隐藏播放进度播放量，显示播放量
                        this.currentTimeShow = false;
                        //右下角播放总长度或全屏按钮是否显示
                        this.playTimes = true;
                        //播放总长度变成全屏按钮
                        this.playTime = false;
                        //每次点击应都保持底部进度条有显示
                        this.speedShow = true;
                        //播放或暂停的时候进度按钮显示
                        this.controlBtn = true;

                    } else if(isTarget && !this.isPlay){

                        this.videoDom.play();
                        //标志位播放
                        this.isPlay = true;


                        console.log('播放');
                        setTimeout(() => {
                            //中间播放按钮或暂停按钮是否显示
                            this.plays = true;
                            //暂停按钮变播放按钮
                            this.play = false;
                            //左下角播放量或者进度是否显示
                            this.currentshow = true;
                            //隐藏播放进度播放量，显示播放量
                            this.currentTimeShow = false;
                            //右下角播放总长度或全屏按钮是否显示
                            this.playTimes = true;
                            //播放总长度变成全屏按钮
                            this.playTime = false;
                            //每次点击应都保持底部进度条有显示
                            this.speedShow = true;
                            //播放或暂停的时候进度按钮显示
                            this.controlBtn = true;
                        },3000);

                    } else{
                        //点击的仅仅是屏幕而非播放暂停按钮，那么显示遮罩层几秒钟时间

                        //中间播放按钮或暂停按钮是否显示
                        this.plays = true;
                        //播放按钮变暂停按钮
                        this.play = false;
                        //左下角播放量或者进度是否显示
                        this.currentshow = true;
                        //隐藏播放进度播放量，显示播放量
                        this.currentTimeShow = false;
                        //右下角播放总长度或全屏按钮是否显示
                        this.playTimes = true;
                        //播放总长度变成全屏按钮
                        this.playTime = false;
                        //每次点击应都保持底部进度条有显示
                        this.speedShow = true;
                        //播放或暂停的时候进度按钮显示
                        this.controlBtn = true;

                        setTimeout(() => {

                            //中间播放按钮或暂停按钮是否显示
                            this.plays = false;

                            //左下角播放量或者进度是否显示
                            this.currentshow = false;

                            //右下角播放总长度或全屏按钮是否显示
                            this.playTimes = false;

                            //播放或暂停的时候进度按钮显示
                            this.controlBtn = false;

                        },3000)
                    }
                }

            },

            updateTime (e) {
                this.currentTime = e.target.currentTime; // 播放的时候派发事件，能够获得当前播放时间 ***注意写法
                this.speedWidth = this.percent * 355;
            },
            Durationms(durationms){
                // 对时间戳进行转化为分秒
                // durationms = durationms / 1000;//转换为多少秒  本身播放当前时间为秒
                durationms = durationms | 0; // 互零操作符，一个正数向下取整 相当于Math.floor方法
                let  minute = durationms / 60 | 0;
                minute = minute < 10 ? '0' + minute : minute;
                // let second = _pad(durationms) % 60;
                let second = durationms % 60;
                second = second < 10 ? '0' + second : second;// 秒数前面补零操作
                return `${minute}:${second}`;
            },


            //触摸有关
            btnTouchStart(e) {
                this.touch.initiated = true  //设立标志位，true表示初始化了
                this.touch.startX = e.touches[0].pageX //开始触摸时候的位置
                this.touch.left = this.$refs.speed.clientWidth //开始点击的时候进度条本身偏移长度
                console.log(this.touch.left)
            },
            btnTouchMove(e) {
                if (!this.touch.initiated) {
                    return //触摸时候没有start事件直接进入move直接返回
                }
                const deltaX = e.touches[0].pageX - this.touch.startX   //计算Move过程中移动的距离，移动的坐标减去开始的
                //  拖拽的长度不能太大，拖拽如果直接到末尾的话，那就是总长-按钮的距离了。取它与拖拽移动距离的最小值
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnBtnWidth, Math.max(0, this.touch.left + deltaX))
                this._offset(offsetWidth)
                this.bigBtn();
                console.log('滚动了');
            },
            btnTouchEnd(e) {
                this.touch.initiated = false;
                this._triggerPercent() //拖动结束调用方法设置播放进度
                this.removeBig();
                console.log('滚动结束了');

            },
            _triggerPercent() {
                const barWidth = this.$refs.progressBar.clientWidth - btnBtnWidth //获取进度条框的实际长度，需要减去上面按钮的宽度
                const percent = this.$refs.speed.clientWidth  / barWidth //底部进度条的长度/进度条框长度，得到比例

                this.$refs.video.currentTime = this.durationms * percent
                // 拖动后实现播放
                if (!this.isPlay) {
                    this.isPlay = true;
                    this.videoDom.play();

                }
            },
            _offset (offsetWidth) {
                //底部的进度条和拖动按钮设置一样的长度/位移
                this.$refs.speed.style.width = `${offsetWidth}px`
                this.$refs.controlBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
            },
            //滚动的时候小球放大
            bigBtn() {
                this.$refs.btn.classList.add('activeBtn');
            },
            //不滚动的时候还有
            removeBig() {
                this.$refs.btn.classList.remove('activeBtn');
            },
            //滚动的时候父组件调用的方法
            scrollBack() {
                //自身偏移距离
                this.$refs.nav.scrollBy(0, -30, 300);
                console.log('我被调用')
            },
            toBack() {
                this.$router.go(-1)
            },
            ...mapActions([
                'video',
                'setCurrentTimes',
                'commentBack'
            ]),
            ...mapMutations({
                setVideoList:'SET_VIDEO_LIST',
                setVideoCurrentTime:'SET_VIDEO_CURRENT_TIME',
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
            .grop
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
            .leftTop
              position: absolute
              left:20px
              top:30px
              color:white
              font-size:$font-size-large-x
            .wrapperLeft
              position: absolute
              left:5px
              bottom:10px
              height:10px
              color:white
            .wrapperCenter
              color:white
              position: absolute
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              font-size:$font-size-large-x
            .wrapperRight
              position: absolute
              right:10px
              bottom:10px
              height:10px
              color:white
          .control
            height:2px
            width:96%
            margin:0 7px
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
                width:96%
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
                .controlBtn
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


      .touch-action
        none
</style>
