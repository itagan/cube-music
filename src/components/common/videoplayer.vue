<!--<template>-->
<!--  <div class="wrap">-->

<!--    <div class="video">-->
<!--      <video :src="videourl" width="375px" height="210px" :poster="detail.coverUrl" autoplay></video>-->
<!--    </div>-->

<!--    <div v-if="!this.detail.videoGroup.length" class="pullload">-->
<!--                <span class="load">-->
<!--                   <i class="iconfont iconyinletiaodongzhuangtai"></i>-->
<!--                  <span> 正在加载...</span>-->
<!--                </span>-->
<!--    </div>-->

<!--      <div class="sticky-view-container" v-show="allshow" v-else>-->
<!--        <cube-sticky :pos="scrollY" :check-top="checkTop">-->
<!--          <div class="scroll-ele" @scroll="scrollHandler">-->
<!--            <div class="title">-->
<!--              <div class="titleTop">-->
<!--                <span>{{detail.title}}</span>-->
<!--                <i class="iconfont" :class="icon" @click.stop="toggle()"></i>-->
<!--              </div>-->

<!--              <div class="titleCenter" ref="setHeight">-->
<!--                <span class="numbers">{{detail.playTime}}次观看</span>-->

<!--                <span class="label" v-for="item in detail.videoGroup" :key="detail.videoGroup.id">{{item.name}}</span>-->

<!--              </div>-->
<!--              <div class="titleTime" v-if="descshow">-->
<!--&lt;!&ndash;                <div class="labels">&ndash;&gt;-->
<!--&lt;!&ndash;                  <span class="label" v-for="item in detail.videoGroup" :key="detail.videoGroup">{{item.name}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--                <span>发布：{{detail.publishTime}}</span>-->
<!--                <span class="titledesc">{{detail.description}}</span>-->
<!--              </div>-->



<!--              <ul class="titleBottom">-->
<!--                <li>-->
<!--                <i class="iconfont iconzan1"></i>-->
<!--                  <span>{{detail.praisedCount}}</span>-->
<!--                </li>-->
<!--                <li>-->
<!--                  <i class="iconfont iconzan1"></i>-->
<!--                  <span>{{detail.subscribeCount}}</span>-->
<!--                </li>-->
<!--                <li>-->
<!--                  <i class="iconfont iconzan1"></i>-->
<!--                  <span>{{detail.commentCount}}</span>-->
<!--                </li>-->
<!--                <li>-->
<!--                  <i class="iconfont iconzan1"></i>-->
<!--                  <span>{{detail.shareCount}}</span>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->

<!--            <cube-sticky-ele>-->
<!--              <ul class="sticky-header">-->
<!--                <li>-->
<!--                  <img :src="detail.avatarUrl" class="imgHeader">-->
<!--                  <span>-->
<!--                    {{detail.creator.nickname}}-->
<!--                  </span>-->
<!--                </li>-->

<!--                <li class="follow">-->
<!--                  <i class="iconfont iconzan1"></i>-->
<!--                  关注-->
<!--                </li>-->
<!--              </ul>-->
<!--            </cube-sticky-ele>-->
<!--            <recommend-swiper @select="recommendvideo" :detail="detail"></recommend-swiper>-->
<!--            <comment :detail="detail" @allhot="allhotshow"></comment>-->
<!--            <new-comment :detail="detail"></new-comment>-->
<!--          </div>-->
<!--        </cube-sticky>-->
<!--      </div>-->

<!--        <hot-comment :detail="detail" ref="allhotcomment" @parshow="isshow"></hot-comment>-->

<!--    <div class="comment" v-if="commit">评论</div>-->
<!--  </div>-->
<!--</template>-->


<!--<script type="text/ecmascript-6">-->
<!--    import {mapGetters, mapMutations} from 'vuex'-->
<!--    import {serializeNumber} from '../../assets/js/number'-->
<!--    import {timestamp,durationms} from '../../assets/js/timestamp'-->
<!--    import recommendSwiper from "../../base/swiper/recommendSwiper";-->
<!--    import Comment from './comment'-->
<!--    import newComment from "./newcomment";-->
<!--    import hotComment from "./hotcomment";-->

<!--    export default {-->
<!--        inject:['reload'],-->
<!--        data() {-->
<!--            return {-->
<!--                scrollY: 0,-->
<!--                checkTop: false,-->
<!--                detail:{},-->
<!--                videourl:'',-->
<!--                show:true,-->
<!--                descshow:false,-->
<!--                allshow:true,-->
<!--                commit:true,-->

<!--            }-->
<!--        },-->
<!--        components: {-->
<!--            recommendSwiper,-->
<!--            Comment,-->
<!--            newComment,-->
<!--            hotComment-->
<!--        },-->
<!--        computed:{-->
<!--            icon(){-->
<!--                return this.show ? 'iconzan1' : 'iconduoren'-->
<!--            },-->
<!--            ...mapGetters([-->
<!--                'currentVid'-->
<!--            ]),-->
<!--        },-->
<!--        created() {-->
<!--            this.getVideo();-->
<!--            this.getvVideoUrl();-->
<!--        },-->
<!--        methods: {-->
<!--            scrollHandler(e) {-->
<!--                this.scrollY = e.currentTarget.scrollTop-->
<!--            },-->
<!--            getVideo() {-->
<!--                this.$api.video.video(this.currentVid).then(res => {-->
<!--                    this.detail = res.data.data;-->
<!--                    this.detail.playTime = serializeNumber(res.data.data.playTime);-->
<!--                    this.detail.publishTime = timestamp(this.detail.publishTime)-->
<!--                    this.detail.durationms = durationms(this.detail.durationms)-->
<!--                })-->
<!--            },-->
<!--            //获取播放地址-->
<!--            getvVideoUrl() {-->
<!--                this.$api.video.videourl(this.currentVid).then(res => {-->
<!--                    this.videourl = res.data.urls[0].url;-->
<!--                    // console.log(this.videourl)-->
<!--                })-->
<!--            },-->
<!--            //展开还是隐藏视频描述等-->
<!--            toggle() {-->
<!--                if(this.show) {-->
<!--                    this.show = false;-->
<!--                    this.descshow = true;-->
<!--                    this.$refs.setHeight.style.height = 'auto'-->
<!--                }else {-->
<!--                    this.show = true;-->
<!--                    this.descshow = false;-->
<!--                    this.$refs.setHeight.style.height = '35px'-->
<!--                }-->
<!--            },-->
<!--            recommendvideo(vid) {-->
<!--                this.getVideo();-->
<!--                this.getvVideoUrl();-->
<!--                this.reload(); //刷新本页面-->
<!--                // this.$nextTick( this.getVideo())-->
<!--                //刷新后重置-->
<!--                this.show = true;-->
<!--                this.descshow = false;-->
<!--                this.$refs.setHeight.style.height = '35px'-->
<!--            },-->
<!--            //显示全部精彩评论-->
<!--            allhotshow() {-->
<!--                this.$refs.allhotcomment.show();-->
<!--                // setTimeout( ()=>{-->
<!--                //     this.$refs.allhotcomment.getHotcomment();-->
<!--                // },2000);-->
<!--                setTimeout( ()=> {-->
<!--                    this.$refs.allhotcomment.getHotcomment();-->
<!--                    this.commit = false;-->
<!--                    this.allshow = false;-->
<!--                },300);-->
<!--                // this.allshow = false-->
<!--            },-->
<!--            //子组件提醒父组件-->
<!--            isshow() {-->
<!--                this.commit = true;-->
<!--                this.allshow = true;-->
<!--            },-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<style scoped lang="stylus" rel="stylesheet/stylus">-->
<!--  @import "../../common/stylus/variable"-->
<!--  @import "../../common/stylus/mixin"-->
<!--  .wrap-->
<!--    /*position:absolute*/-->
<!--    .video-->
<!--      width:100%-->
<!--      height:215px-->
<!--      background-color:gray-->
<!--    .sticky-view-container-->
<!--      position: absolute-->
<!--      z-index:100-->
<!--      top: 215px-->
<!--      bottom: 0-->
<!--      left: 0-->
<!--      width: 100%-->
<!--      font-size:$font-size-medium-->
<!--      .sticky-header-->
<!--        flex-between()-->
<!--        height:45px-->
<!--        background-color:white-->
<!--        position:relative-->
<!--        .imgHeader-->
<!--           height:30px-->
<!--           width:30px-->
<!--           border-radius:50%-->
<!--           margin-top:-15px-->
<!--           position:absolute-->
<!--           top:50%-->
<!--        span-->
<!--          height:45px-->
<!--          line-height:45px-->
<!--          margin-left:35px-->
<!--          font-size:$font-size-small-->
<!--        .follow-->
<!--          width:65px-->
<!--          height:25px-->
<!--          background-color:red-->
<!--          border-radius:15px-->
<!--          line-height:25px-->
<!--          text-align:center-->
<!--          color:white-->
<!--          font-size:$font-size-small-->
<!--      .cube-sticky-->
<!--        padding: 0 10px-->
<!--      .scroll-ele-->
<!--        height: 100%-->
<!--        overflow: auto-->
<!--        -webkit-overflow-scrolling: touch-->
<!--        .title-->
<!--          margin: auto-->
<!--          background-color:white-->
<!--          padding-bottom:3px-->
<!--          margin-bottom:1px-->
<!--          .titleTop-->
<!--            padding-top:10px-->
<!--            flex-between()-->
<!--            span-->
<!--              font-size:$font-size-medium-x-->
<!--              word-break:wrap-->
<!--              margin-right:10px-->
<!--              line-height:1.2-->
<!--            i-->
<!--              position:relative-->
<!--              top:-5px-->
<!--          .titleCenter-->
<!--            font-size:$font-size-small-s-->
<!--            margin-top:5px-->
<!--            /*flex-between()*/-->
<!--            display:flex-->
<!--            flex-wrap:wrap-->
<!--            height:35px-->
<!--            overflow:hidden-->
<!--            /*position:relative*/-->
<!--            .numbers-->
<!--              color:#a9a9a9-->
<!--              margin-right:10px-->
<!--              margin-top:10px-->
<!--              padding:3px-->
<!--            .label-->
<!--              height:12px-->
<!--              border-radius:5px-->
<!--              background-color:#dcdcdc-->
<!--              color:#696969-->
<!--              padding:3px 5px-->
<!--              margin-left:10px-->
<!--              position:relative  //解决margin-lft的影响-->
<!--              left:-10px //结合相对定位，这里相对自身-->
<!--              margin-top:10px-->
<!--              min-width:5px-->
<!--          .titleTime-->
<!--            font-size:$font-size-small-s-->
<!--            display: flex-->
<!--            justify-content: center-->
<!--            flex-direction: column-->
<!--            margin-top:15px-->
<!--            /*position:relative*/-->
<!--            .labels-->
<!--              //flex-between()-->
<!--              display:flex-->
<!--              flex-wrap:wrap-->
<!--              margin:15px 0-->
<!--              font-size:$font-size-small-s-->
<!--              position:relative-->
<!--              left:-10px-->
<!--              .label-->
<!--                height:12px-->
<!--                border-radius:5px-->
<!--                background-color:#dcdcdc-->
<!--                color:#696969-->
<!--                padding:3px-->
<!--                margin: 5px 0-->
<!--                margin-left:10px-->
<!--            .titledesc-->
<!--              display:block-->
<!--              line-height:1.2-->
<!--              padding-right:10px-->
<!--              margin-top:8px-->

<!--          .titleBottom-->
<!--            flex-between()-->
<!--            margin:5px-->
<!--            li-->
<!--              flex-center(column)-->
<!--              color:#696969-->
<!--              i-->
<!--                font-size:$font-size-large-x-->
<!--              span-->
<!--                margin-top:3px-->
<!--                font-size:$font-size-small-s-->

<!--        //磁贴后样式-->
<!--      .cube-sticky-fixed-->
<!--        .sticky-header-->
<!--          //flex-between()-->
<!--          margin:auto 10px-->

<!--    .comment-->
<!--      position:fixed-->
<!--      bottom:0px-->
<!--      height:40px-->
<!--      width:100%-->
<!--      background-color:gray-->
<!--      z-index:101-->
<!--      margin-top:40px-->
<!--</style>-->



<template>
  <div class="wrap">

    <div class="video">
      <video :src="videourl" width="375px" height="210px" :poster="detail.coverUrl" autoplay controls muted=""></video>
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
    import {timestamp,durationms} from '../../assets/js/timestamp'
    import recommendSwiper from "../../base/swiper/recommendSwiper";
    import Comment from './comment'
    import newComment from "./newcomment";
    import hotComment from "./hotcomment";

    export default {
        inject:['reload'],
        data() {
            return {
                scrollY: 0,
                // checkTop: false,
                detail:{},
                videourl:'',
                show:true,
                descshow:false,//是否显示描述
                allshow:true, //是否显示全部精彩评论
                commit:true,//是否显示底部评论功能
                totop:false, //右下角回到顶部功能
                scrollEvents: ['scroll','before-scroll-start'],
                // scrollEvents: ['scroll','scrollStart'],//多个事件的话这里数组写。

                pullUpLoad: true,
                pullUpLoadThreshold: 0,
                pullUpLoadMoreTxt: '加载中…………',
                pullUpLoadNoMoreTxt: '没有更多数据了~',

                loadisshow:false, //上拉加载是否显示,数据全部加载完则不显示了
                limits:20, //传给子组件需要显示的评论数量
                swipeHeight:0,//子组件recommentswiper的高度
                titleHeight:35,//标题高度
            }
        },
        components: {
            recommendSwiper,
            Comment,
            newComment,
            hotComment
        },
        computed:{
            icon(){
                return this.show ? 'iconzan1' : 'iconduoren'
            },
            ...mapGetters([
                'currentVid',
                'limit'
            ]),
            options() {
                return {
                    pullUpLoad: this.pullUpLoadObj,
                    scrollbar: true,
                }
            },
            pullUpLoadObj: function() {
                return this.pullUpLoad ? {
                    threshold: parseInt(this.pullUpLoadThreshold),
                    txt: {
                        more: this.pullUpLoadMoreTxt,
                        noMore: this.pullUpLoadNoMoreTxt
                    }
                } : false
            },
        },
        // beforeCreate() {
        //     //刚进入新页面应该重置vuex避免获取渲染错误数据
        //     this.setLimit(20);
        // },
        created() {
            this.getvVideoUrl();
            this.getVideo();
            // this.$nextTick(() => {
            //     this.getHeight();
            // })
        },
        methods: {
            scrollHandler({ y }) {
                this.scrollY = -y;
                // console.log(this.scrollY);
                let heights = this.titleHeight + this.swipeHeight + 45 - 323;
                this.totop = this.scrollY > heights;
                // if(this.scrollY){
                //     this.getHeight();
                // }
            },
            scrollStartHandler() {
                this.getHeight();
                // console.log(this.titleHeight);
                // console.log(this.swipeHeight);
            },
            onPullingUp() {
                //滚动上拉加载的时候派发事件给子组件：告知limit新数据
                this.limits = this.limit + +10;
                // console.log(this.limits);
            },
            newlimits(has) {
                if(has){
                    this.loadisshow = true;
                    this.$refs.scroll.forceUpdate();
                    //再把新数据设置到vuex
                    this.setLimit(this.limits);
                }else {
                    this.$refs.scroll.forceUpdate();
                    //决定上拉加载效果是否显示出来
                    this.loadisshow = false;
                }
            },
            getVideo() {
                this.$api.video.video(this.currentVid).then(res => {
                    // this.setLimit(20); //重置vuex

                        this.detail = res.data.data;
                        this.detail.playTime = serializeNumber(res.data.data.playTime);
                        this.detail.publishTime = timestamp(this.detail.publishTime);
                        this.detail.durationms = durationms(this.detail.durationms);

                })
            },
            //获取播放地址
            getvVideoUrl() {
                this.$api.video.videourl(this.currentVid).then(res => {
                    this.videourl = res.data.urls[0].url;
                    // console.log(this.videourl)
                })
            },
            //展开还是隐藏视频描述等
            toggle() {
                if(this.show) {
                    this.show = false;
                    this.descshow = true;
                    this.$refs.setHeight.style.height = 'auto'
                }else {
                    this.show = true;
                    this.descshow = false;
                    this.$refs.setHeight.style.height = '35px'
                }
            },
            recommendvideo(vid) {
                this.getVideo();
                this.getvVideoUrl();
                this.reload(); //刷新本页面
                // this.$nextTick( this.getVideo())
                //把vuex的数据还原
                this.setLimit(20);
                this.limits = 20;
                //刷新后重置
                this.show = true;
                this.descshow = false;
                this.$refs.setHeight.style.height = '35px'
            },
            //显示全部精彩评论
            allhotshow() {
                this.$refs.allhotcomment.show();
                // setTimeout( ()=>{
                //     this.$refs.allhotcomment.getHotcomment();
                // },2000);
                setTimeout( ()=> {
                    this.$refs.allhotcomment.getHotcomment();
                    this.commit = false;
                    this.allshow = false;
                },300);
            },
            //子组件提醒父组件
            isshow() {
                this.commit = true;
                this.allshow = true;
            },
            //评论返回顶部
            backtop() {
                this.$refs.scroll.scrollTo(0,0,200);
                //this.$refs.scroll.scrollToElement('.title', 200);其它方式，除了css还可以ref引用this.$refs.tohere

            },
            //评论区上升
            commentTop() {
                // this.$refs.scroll.scrollTo(0,-515,200);
                // this.$refs.tohere 测试发现自定义子组件不能用这个方式，而该用css引用dom
                this.$refs.scroll.scrollToElement('.here', 200,0,-50);
            },
            tagBacktop() {
                let heights = this.titleHeight + this.swipeHeight + 45 - 323;
                if(this.scrollY > heights) {
                    this.backtop()
                    // this.commentTop()
                }else {
                    this.commentTop()
                }
            },
            //子组件通知父组件swipe数量并得出该组件高度
            swipeNum(num) {
                this.swipeHeight = 15 + num * 60 + num * 10;
            },
            //获取高度
            getHeight() {
                // let heights = this.$refs.getSwipeHeight.height;
                // let height= this.$refs.element.offsetHeight

                // console.log(height)
                this.$refs.getNum.getLength();
                this.titleHeight = this.$refs.titleHeight.offsetHeight; //标题class.title高度
                // let num = this.$refs.getNum.offsetHeight; //获取失败
                // console.log(num)
            },
            ...mapMutations({
                setLimit:'SET_LIMIT'
            })
        },
        // mounted() {
        //     this.$nextTick(() => {
        //         //获取dom高度，确定返回按钮出现
        //         // console.log(this.$refs.titleheight.offsetHeight)
        //        // console.log( this.$refs.getSwiperHeight.offsetHeight)
        //         this.getHeight();
        //     })
        // }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrap
    /*position:absolute*/
    .video
      width:100%
      height:215px
      background-color:gray
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

