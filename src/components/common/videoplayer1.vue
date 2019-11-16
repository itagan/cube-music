<template>
  <div class="wrap">

    <div class="video">
      <video :src="videourl" width="375px" height="210px" :poster="detail.coverUrl" autoplay></video>
    </div>

    <div v-if="!this.detail.videoGroup.length" class="pullload">
                <span class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 正在加载...</span>
                </span>
    </div>

      <div class="sticky-view-container" v-show="allshow" v-else>
        <cube-sticky :pos="scrollY">

          <cube-scroll
            :scroll-events="scrollEvents"
            @scroll="scrollHandler"
            @pulling-up="onPullingUp"
            :options="options"
            ref="scroll"
            class="scroll-ele"
          >

<!--          <div class="scroll-ele">-->
            <div class="title">
              <div class="titleTop">
                <span>{{detail.title}}</span>
                <i class="iconfont" :class="icon" @click.stop="toggle()"></i>
              </div>

              <div class="titleCenter" ref="setHeight">
                <span class="numbers">{{detail.playTime}}次观看</span>

                <span class="label" v-for="item in detail.videoGroup" :key="detail.videoGroup.id">{{item.name}}</span>

              </div>
              <div class="titleTime" v-if="descshow">
<!--                <div class="labels">-->
<!--                  <span class="label" v-for="item in detail.videoGroup" :key="detail.videoGroup">{{item.name}}</span>-->
<!--                </div>-->
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


            <recommend-swiper @select="recommendvideo" :detail="detail"></recommend-swiper>
            <comment :detail="detail" @allhot="allhotshow"></comment>
            <new-comment :detail="detail"></new-comment>

<!--            <template slot="pullup" slot-scope="props">-->
<!--              <div v-if="props.pullUpLoad" class="pullload">-->
<!--                <template v-if="loadisshow">-->
<!--                <span v-if="props.isPullUpLoad" class="load">-->
<!--                   <i class="iconfont iconyinletiaodongzhuangtai"></i>-->
<!--                  <span> 加载中...</span>-->
<!--                </span>-->
<!--                  <span v-else>更新成功</span>-->
<!--                </template>-->
<!--              </div>-->
<!--            </template>-->

<!--          </div>-->
          </cube-scroll>
        </cube-sticky>
      </div>

        <hot-comment :detail="detail" ref="allhotcomment" @parshow="isshow"></hot-comment>

    <div class="comment" v-if="commit">评论</div>
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
                descshow:false,
                allshow:true,
                commit:true,

                scrollEvents: ['scroll'],

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
                'currentVid'
            ]),
        },
        created() {
            this.getVideo();
            this.getvVideoUrl();
        },
        methods: {
            // scrollHandler(e) {
            //     this.scrollY = e.currentTarget.scrollTop
            // },
            scrollHandler({ y }) {
                this.scrollY = -y
            },
            getVideo() {
                this.$api.video.video(this.currentVid).then(res => {
                    this.detail = res.data.data;
                    this.detail.playTime = serializeNumber(res.data.data.playTime);
                    this.detail.publishTime = timestamp(this.detail.publishTime)
                    this.detail.durationms = durationms(this.detail.durationms)
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
                // this.allshow = false
            },
            //子组件提醒父组件
            isshow() {
                this.commit = true;
                this.allshow = true;
            },
        },
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
      z-index:100
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
        height: 100%
        overflow: auto
        -webkit-overflow-scrolling: touch
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
      bottom:0px
      height:40px
      width:100%
      background-color:gray
      z-index:101
      margin-top:40px
</style>
