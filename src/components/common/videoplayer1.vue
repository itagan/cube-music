<template>
  <div class="wraps">
    <div class="wrapper" @click.prevent="playVideo()">
      <video :poster="detail.coverUrl"
             :src="videourl"
             class="video"
             width="375px"
             height="210px"
             id="video"
             ref="video"
             :moted="true"
             @timeupdate="updateTime"
      >
        <source :src="videourl" type="audio/mpeg">
      </video>

      <div class="wrap" v-show="wrapShow">
        <div class="wrapperLeft">
          <div  v-show="currentshow">
            {{Durationms(currentTime)}} / {{detail.durationms}}
          </div>
        </div>

        <div class="wrapperCenter" v-if="plays">
          <i class="iconfont iconliuyan" v-if="play"></i>
          <i class="iconfont iconnetease" v-else></i>
        </div>

        <div class="wrapperRight" v-show="playTimes">
          <i class="iconfont iconliuyan" ></i>
        </div>

      </div>

      <div class="control">
        <div class="speed"  :style=" {width: speedWidth + 'px'} "></div>

        <div class="controlBtn" ref="setWidth" :style="{left: speedWidth + 'px'} " v-show="controlBtn"></div>
      </div>
    </div>



    <transition name="fade-video" class="fadeVideo">

      <div v-if="!this.detail.videoGroup" class="pullloadtop">
       <span class="load">
          <i class="iconfont iconyinletiaodongzhuangtai"></i>
          <span> 正在加载...</span>
       </span>
      </div>

      <div class="sticky-view-container" v-show="allshow" v-else>
        <cube-sticky :pos="scrollY">

          <cube-scroll
            :scroll-events="scrollEvents"
            @before-scroll-start="scrollStartHandler"
            @scroll="scrollHandler"
            @pulling-up="onPullingUp"
            :options="options"
            ref="scroll"
            class="scroll-ele"
          >

            <!--          <div class="scroll-ele">-->
            <div class="title" ref="titleHeight">
              <div class="titleTop">
                <span>{{detail.title}}</span>
                <i class="iconfont" :class="icon" @click.stop="toggle()"></i>
              </div>

              <div class="titleCenter" ref="setHeight">
                <span class="numbers">{{detail.playTime}}次观看</span>

                <span class="label" v-for="item in detail.videoGroup" :key="detail.videoGroup.id">{{item.name}}</span>

              </div>

              <div class="titleTime" v-if="descshow">
                <span>发布：{{detail.publishTime}}</span>
                <span class="titledesc">{{detail.description}}</span>
              </div>
              <ul class="titleBottom">
                <li>
                  <i class="iconfont iconzan1"></i>
                  <span>{{detail.praisedCount}}</span>
                </li>
                <li>
                  <i class="iconfont iconzan1"></i>
                  <span>{{detail.subscribeCount}}</span>
                </li>
                <li>
                  <i class="iconfont iconzan1"></i>
                  <span>{{detail.commentCount}}</span>
                </li>
                <li>
                  <i class="iconfont iconzan1"></i>
                  <span>{{detail.shareCount}}</span>
                </li>
              </ul>
            </div>

            <cube-sticky-ele>
              <ul class="sticky-header">
                <li>
                  <img :src="detail.avatarUrl" class="imgHeader">
                  <span>
                    {{detail.creator.nickname}}
                  </span>
                </li>

                <li class="follow">
                  <i class="iconfont iconzan1"></i>
                  关注
                </li>
              </ul>
            </cube-sticky-ele>


            <recommend-swiper @select="recommendvideo" :detail="detail" @swipeNum="swipeNum" ref="getNum"></recommend-swiper>
            <comment :detail="detail" @allhot="allhotshow" ref="tohere" class="here"></comment>
            <new-comment :detail="detail" @Limits="newlimits" :limits="limits"></new-comment>

            <template slot="pullup" slot-scope="props">
              <div v-if="props.pullUpLoad" class="pullload">
                <template v-if="loadisshow">
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 加载中...</span>
                </span>
                  <span v-else>更新成功</span>
                </template>
              </div>
            </template>

          </cube-scroll>
        </cube-sticky>
      </div>
    </transition>

    <hot-comment :detail="detail" ref="allhotcomment" @parshow="isshow"></hot-comment>

    <div class="comment" v-if="commit">
      <input type="text" placeholder="发表评论">
      <div @click="tagBacktop">
        <i class="iconfont iconnetease" v-if="totop"></i>
        <span v-else class="liuyan">
          <i class="iconfont iconliuyan"></i>
          <span>{{detail.commentCount}}</span>
        </span>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'
    import {serializeNumber} from '../../assets/js/number'
    import {timestamp, durationms} from '../../assets/js/timestamp'
    import recommendSwiper from '../../base/swiper/recommendSwiper'
import Comment from './comment'
    import newComment from './newcomment'
import hotComment from './hotcomment'

export default {
      inject: ['reload'],
      data () {
        return {
          scrollY: 0,
                // checkTop: false,
          detail: {},
          videourl: '',
          show: true,
          descshow: false, // 是否显示描述
          allshow: true, // 是否显示全部精彩评论
          commit: true, // 是否显示底部评论功能
          totop: false, // 右下角回到顶部功能
          scrollEvents: ['scroll', 'before-scroll-start'],
                // scrollEvents: ['scroll','scrollStart'],//多个事件的话这里数组写。

          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          pullUpLoadMoreTxt: '加载中…………',
          pullUpLoadNoMoreTxt: '没有更多数据了~',

          loadisshow: false, // 上拉加载是否显示,数据全部加载完则不显示了
          limits: 20, // 传给子组件需要显示的评论数量
          swipeHeight: 0, // 子组件recommentswiper的高度
          titleHeight: 35, // 标题高度

          currentshow: true, // 视频左下角播放量或者进度是否显示
          currentTimeShow: true, // 播放量跟播放进度转换
          check: true, // 是否显示
          countTime: true, // 视频左下角播放量变成播放时间进度
          wrapShow: true, // 遮罩层显示
          controlBtn: false, // 进度按钮
          playTime: true, // 播放总时间是否变成视频全屏按钮
          playTimes: true, // 播放总时间或者全屏按钮是否会显示
          plays: true, // 播放或暂停按钮显示出来
                // playss:true,
          play: true, // 播放和暂停按钮切换
          currentTime: `00:00`, // 播放进度时间
                // _currentTime:`00:00`,//保存进度
          activeIndex: -1,
                // duration:'', //视频播放总时间
          speedWidth: 0,
          durationms: 0, // 视频播放总时间
          currentDuration: [{}, {}], // 存放前后播放视频的播放进度
          durationHistory: [] // 存放本视频流页面前后视频播放进度的历史记录

        }
      },
      components: {
        recommendSwiper,
        Comment,
        newComment,
        hotComment
      },
      computed: {
        icon () {
          return this.show ? 'iconzan1' : 'iconduoren'
        },
        ...mapGetters([
          'currentVid',
          'limit',
          'back'
        ]),
        options () {
          return {
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true
          }
        },
        pullUpLoadObj: function () {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          } : false
        }
      },
        // beforeCreate() {
        //     //刚进入新页面应该重置vuex避免获取渲染错误数据
        //     this.setLimit(20);
        // },
      created () {
        this.getvVideoUrl()
        this.getVideo()
        // this.$nextTick(() => {
        //     this.getHeight();
        // })
        // this.commentBack()
    },
      methods: {
        scrollHandler ({ y }) {
          this.scrollY = -y
            // console.log(this.scrollY);
          let heights = this.titleHeight + this.swipeHeight + 45 - 323
          this.totop = this.scrollY > heights
            // if(this.scrollY){
            //     this.getHeight();
            // }
        },
        scrollStartHandler () {
          this.getHeight()
            // console.log(this.titleHeight);
            // console.log(this.swipeHeight);
        },
        onPullingUp () {
                // 滚动上拉加载的时候派发事件给子组件：告知limit新数据
          this.limits = this.limit + +10
            // console.log(this.limits);
        },
        newlimits (has) {
          if (has) {
            this.loadisshow = true
            this.$refs.scroll.forceUpdate()
                // 再把新数据设置到vuex
            this.setLimit(this.limits)
          } else {
            this.$refs.scroll.forceUpdate()
                // 决定上拉加载效果是否显示出来
            this.loadisshow = false
          }
        },
        getVideo () {
          if (!this.currentVid) {
            this.$router.push(`/find`)
            return
          }
          this.$api.video.video(this.currentVid).then(res => {
            console.log(res)
                // this.setLimit(20); //重置vuex
            this.detail = res.data.data
            this.detail.playTime = serializeNumber(res.data.data.playTime)
            this.detail.publishTime = timestamp(this.detail.publishTime)
            this.detail.durationms = durationms(this.detail.durationms)
          })
        },
            // 获取播放地址
        getvVideoUrl () {
          this.$api.video.videourl(this.currentVid).then(res => {
            this.videourl = res.data.urls[0].url
            console.log(res)
          })
        },
            // 展开还是隐藏视频描述等
        toggle () {
          if (this.show) {
            this.show = false
            this.descshow = true
            this.$refs.setHeight.style.height = 'auto'
          } else {
            this.show = true
            this.descshow = false
            this.$refs.setHeight.style.height = '35px'
          }
        },
        recommendvideo (vid) {
          this.getVideo()
          this.getvVideoUrl()
          this.reload() // 刷新本页面
            // this.$nextTick( this.getVideo())
            // 把vuex的数据还原
          this.setLimit(20)
          this.limits = 20
          this.setCommentBack(false)
            // 刷新后重置
          this.show = true
          this.descshow = false
          this.$refs.setHeight.style.height = '35px'
        },
            // 显示全部精彩评论
        allhotshow () {
          this.$refs.allhotcomment.show()
            // setTimeout( ()=>{
            //     this.$refs.allhotcomment.getHotcomment();
            // },2000);
          setTimeout(() => {
            this.$refs.allhotcomment.getHotcomment()
            this.commit = false
            this.allshow = false
          }, 300)
        },
            // 子组件提醒父组件
        isshow () {
          this.commit = true
          this.allshow = true
        },
            // 评论返回顶部
        backtop () {
          this.$refs.scroll.scrollTo(0, 0, 200)
            // this.$refs.scroll.scrollToElement('.title', 200);其它方式，除了css还可以ref引用this.$refs.tohere
        },
            // 评论区上升
        commentTop () {
                // this.$refs.scroll.scrollTo(0,-515,200);
                // this.$refs.tohere 测试发现自定义子组件不能用这个方式，而该用css引用dom
          this.$refs.scroll.scrollToElement('.here', 200, 0, -50)
        },
        tagBacktop () {
          let heights = this.titleHeight + this.swipeHeight + 45 - 323
          if (this.scrollY > heights) {
            this.backtop()
                    // this.commentTop()
          } else {
            this.commentTop()
          }
        },
            // 子组件通知父组件swipe数量并得出该组件高度
        swipeNum (num) {
          this.swipeHeight = 15 + num * 60 + num * 10
        },
            // 获取高度
        getHeight () {
                // let heights = this.$refs.getSwipeHeight.height;
                // let height= this.$refs.element.offsetHeight

                // console.log(height)
          this.$refs.getNum.getLength()
          this.titleHeight = this.$refs.titleHeight.offsetHeight // 标题class.title高度
            // let num = this.$refs.getNum.offsetHeight; //获取失败
            // console.log(num)
        },
            // 某些时候打开本页面需要评论区提前展示
        commentBack () {
                // setTimeout(() => {
                //     //从vuex拿数据决定是否提前展示..延时确保滚动结构正常
                //     if(this.back) {
                //         this.commentTop()
                //     }
                // },100);

                // 从vuex拿数据决定是否提前展示
          if (this.back) {
            this.commentTop()
          }
        },

            // 视频播放有关
        playVideo () {

        },
        updateTime (e) {
          this.currentTime = e.target.currentTime // 播放的时候派发事件，能够获得当前时间 ***注意写法

          this.speedWidth = this.percent * 345
        },
        Durationms (durationms) {
                // 对时间戳进行转化为分秒
                // durationms = durationms / 1000;//转换为多少秒  本身播放当前时间为秒
          durationms = durationms | 0 // 互零操作符，一个正数向下取整 相当于Math.floor方法
          let minute = durationms / 60 | 0
          minute = minute < 10 ? '0' + minute : minute
            // let second = _pad(durationms) % 60;
          let second = durationms % 60
          second = second < 10 ? '0' + second : second// 秒数前面补零操作
          return `${minute}:${second}`
        },

        ...mapMutations({
          setLimit: 'SET_LIMIT',
          setCommentBack: 'SET_BACK'
        })
      },
      mounted () {
            // 确保DOM结构渲染完成才能滚动。延时确保滚动结构距离正常
        this.$nextTick(() => {
                // this.commentBack();
          setTimeout(() => {
            this.commentBack()
          }, 1000)
                // this.setCommentBack(false);
        })
      },

        // watch:{
        //     // 'back': function () {
        //     //     //你需要执行的代码
        //     //     this.commentBack();
        //     //     console.log('有监控')
        //     // }
        //     back(back){
        //         if(back) {
        //             console.log('监控了')
        //         }
        //     }
        // }
      destroyed () {
            // 销毁本页面时候，把vuex的一些重置
        this.setCommentBack(false)
    }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wraps
    /*position:absolute*/
    /*.video*/
    /*  width:100%*/
    /*  height:215px*/
    /*  background-color:gray*/
    .wrapper
      width:100%
      height:215px
      background-color:#dcdcdc
      border-radius:10px
      position:relative
      height:203px
      font-size:$font-size-small-s
      .video
        width:100%
        height:200px
        border-radius:10px
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
        width:100%
        background-color:yellow
        position:absolute
        bottom:0
        .speed
          height:2px
          background-color:red
          /*width:0*/
          margin:0 5px
        .controlBtn
          border-radius:50%
          background-color:red
          height:10px
          width:10px
          position:absolute
          bottom:-3px
          left:0

    .sticky-view-container
      position: absolute
      /*z-index:100*/
      top: 215px
      bottom: 0
      left: 0
      width: 100%
      font-size:$font-size-medium
      .sticky-header
        flex-between()
        height:45px
        background-color:white
        position:relative
        .imgHeader
          height:30px
          width:30px
          border-radius:50%
          margin-top:-15px
          position:absolute
          top:50%
        span
          height:45px
          line-height:45px
          margin-left:35px
          font-size:$font-size-small
        .follow
          width:65px
          height:25px
          background-color:red
          border-radius:15px
          line-height:25px
          text-align:center
          color:white
          font-size:$font-size-small
      .cube-sticky
        padding: 0 10px
      .scroll-ele
        /*height: 100%*/
        /*overflow: auto*/
        -webkit-overflow-scrolling: touch //滚动回弹效果
        .title
          margin: auto
          background-color:white
          padding-bottom:3px
          margin-bottom:1px
          .titleTop
            padding-top:10px
            flex-between()
            span
              font-size:$font-size-medium-x
              word-break:wrap
              margin-right:10px
              line-height:1.2
            i
              position:relative
              top:-5px
          .titleCenter
            font-size:$font-size-small-s
            margin-top:5px
            /*flex-between()*/
            display:flex
            flex-wrap:wrap
            height:35px
            overflow:hidden
            /*position:relative*/
            .numbers
              color:#a9a9a9
              margin-right:10px
              margin-top:10px
              padding:3px
            .label
              height:12px
              border-radius:5px
              background-color:#dcdcdc
              color:#696969
              padding:3px 5px
              margin-left:10px
              position:relative  //解决margin-lft的影响
              left:-10px //结合相对定位，这里相对自身
              margin-top:10px
              min-width:5px
          .titleTime
            font-size:$font-size-small-s
            display: flex
            justify-content: center
            flex-direction: column
            margin-top:15px
            /*position:relative*/
            .labels
              //flex-between()
              display:flex
              flex-wrap:wrap
              margin:15px 0
              font-size:$font-size-small-s
              position:relative
              left:-10px
              .label
                height:12px
                border-radius:5px
                background-color:#dcdcdc
                color:#696969
                padding:3px
                margin: 5px 0
                margin-left:10px
            .titledesc
              display:block
              line-height:1.2
              padding-right:10px
              margin-top:8px

          .titleBottom
            flex-between()
            margin:5px
            li
              flex-center(column)
              color:#696969
              i
                font-size:$font-size-large-x
              span
                margin-top:3px
                font-size:$font-size-small-s

      //磁贴后样式
      .cube-sticky-fixed
        .sticky-header
          //flex-between()
          margin:auto 10px

    .comment
      position:fixed
      bottom:0
      height:40px
      width:100%
      background-color:white
      z-index:1000
      border-top:1px solid #dcdcdc
      font-size:$font-size-medium
      flex-between()
      input
        height 100%
        flex:1
        margin-left:10px
      div
        height: 100%
        width:40px
        flex-center()
        font-size:$font-size-large-x
        .liuyan
          position:relative
          i
            flex-center()
            width:100%
            height:100%
          span
            position:absolute
            bottom:15px
            right:-0px
            font-size:$font-size-small-ss


    //上拉加载中相关样式
    .pullload
      width:100%
      height:50px
      margin-top:1px
      background-color:white
      position:relative
      bottom:50px
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray

    //上方加载中相关样式
    .pullloadtop
      width:100%
      height:100%
      margin-top:50px
      background-color:white
      /*position:relative*/
      /*bottom:50px*/
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray

</style>

