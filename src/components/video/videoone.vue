<template>
<!--  <ul>-->
<!--    <li v-for="(item,index) in videos" :key="item.data.vid">-->
<!--          <base-video :videos="videos" :item="item" :index="index"></base-video>-->
<!--    </li>-->
<!--  </ul>-->


  <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <ul>
          <li v-for="(item,index) in videos" :key="item.data.vid" >
            <base-video :videos="videos" :item="item" :index="index" @refresh="refreshfinish"></base-video>
          </li>
        </ul>

        <template slot="pulldown" slot-scope="props">
          <div v-if="props.pullDownRefresh"
               class="cube-pulldown-wrapper"
               :style="props.pullDownStyle">
            <div v-if="props.beforePullDown"
                 class="before-trigger"
                 :style="{paddingTop: props.bubbleY + 'px'}">
              <span :class="{rotate: props.bubbleY > 0}">↓</span>
            </div>


            <div class="after-trigger" v-else>
              <div v-show="props.isPullingDown" class="loading">
                <i class="iconfont iconyinletiaodongzhuangtai"></i>
                <span> 更新中...</span>
              </div>
              <span :class="{rotate: props.bubbleY > 0}" v-show="!props.isPullingDown">↓</span>

              <transition name="bounce" v-if="!props.isPullingDown">
                <div v-show="findmore" class="text-wrapper">
                  <span class="refresh-text">
                    发现了更多新内容
                  </span>
                </div>
              </transition>
            </div>
          </div>
        </template>


        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pullload">
            <template>
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 加载中...</span>
                </span>
<!--              <span v-else>更新成功</span>-->
            </template>
          </div>
        </template>

      </cube-scroll>
  </div>
</template>

<script>
  // 测试文件**** 新方案:分割基础组件baseVideo出去再从这里循环生成列表，解决一个bug（图标是否显示问题），但新产生一个bug（点击两下可能才播放暂停）。暂时未解决****

      import baseVideo from '../../base/video/basevideo'
      import {serializeNumber} from '../../assets/js/number'
      import {durationms} from '../../assets/js/timestamp'
      export default {
        name: 'video1.vue',
        components: {
          baseVideo
        },
        data () {
          return {
              videos: [],
              item: {},
              index: -1,
              options: {
                  pullDownRefresh: {
                      threshold: 30,
                      // stop: 44,
                      stopTime: 1000,
                      txt: '更新成功'
                  },
                  pullUpLoad: true
              },
              secondStop: 0,
              scrollEvents: ['scroll'],
              findmore:false,
              pullDownY:0

          }
        },
          props:{
              groupid:{
                  type:Number,
                  default:9102
              }
          },
        created () {
          this.getVideos()
        },
        watch:{
            groupid() {
                this.getVideos()
            }
        },
        methods: {
          getVideos () {
            this.$api.video.videolist(this.groupid).then((res) => {
              this.videos = res.data.datas;
              for (let i = 0; i < this.videos.length; i++) {
                this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
                this.videos[i].data.durationms = durationms(this.videos[i].data.durationms)
              }
              // console.log(this.videos)
            })
          },


            onPullingDown() {
                setTimeout(() => {
                    // this.getVideos();
                    this.videos = this.videos.reverse();
                    this.$refs.contentScroll.scrollTo(0, this.secondStop, 300);
                    // this.forceUpdate();//下拉完毕
                }, 1000);
            },


            onPullingUp() {
                setTimeout(() => {
                    if (this.isPullUpLoad) {
                        this.videos = [] // 清空数据，以防重复渲染
                    };
                    this.getVideos();
                    const contentScroll = this.$refs.contentScroll;
                    contentScroll.forceUpdate();
                    // contentScroll.refresh();
                }, 1000);
            },

            refreshfinish() {
                const contentScroll = this.$refs.contentScroll
                contentScroll.scroll.beforePullDown && contentScroll.refresh()
                contentScroll.forceUpdate();

                // if(this.pullDownY === 0) {
                //     console.log('11')
                //     this.findmore = true;
                // }

                this.findmore = true;


            },
            // onScrollHandle(pos) {
            //     this.pullDownY = pos.y;
            //     // if(this.pullDownY === 0) {
            //     //     this.findmore = true;
            //     // }
            // },
        }
      }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .content-scroll-wrapper
    position:absolute
    height:517px
    width:375px
    bottom:50px
    ul
      height: 100%
      overflow: hidden


  .cube-pulldown-wrapper
     text-align: center
    .before-trigger
      height: auto
      font-size: 30px
      align-self: flex-end
      span
        display: inline-block
        line-height: 1
        transition: all 0.3s
        color: #666
        padding: 15px 0
        &.rotate
          transform: rotate(180deg)

    .after-trigger
      flex: 1
      margin: 0
      /*position:relative*/
      .loading
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray
      .text-wrapper
        margin: auto
        padding: 5px 0
        z-index:500
        position:relative
        width:140px
        height:18px
        text-align:center
        line-height:18px
        background-color:black
        opacity:0.4
        border-radius:15px
        top:0
        .refresh-text
          color: white
          font-size:$font-size-medium


    //加载中相关样式
    .pullload
      width:100%
      height:30px
      margin-top:1px
      background-color:white
      position:relative
      top:0
      bottom:50px
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray
          font-size:$font-size-medium


      .bounce-enter-active
        animation: bounce-in .5s;

      .bounce-leave-active
        animation: bounce-in .5s reverse;

      @keyframes bounce-in
        0% {
          transform: translateX(0px);
        }
        50% {
          transform: translateX(50px);
        }
        100% {
          transform: translateX(0px);
        }




  .cube-scroll-content
    height:auto
</style>
