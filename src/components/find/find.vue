<template>

  <div class="find">
    <find-header></find-header>

    <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">

        <find-slider class="find-slider"></find-slider>
        <find-nav class="find-nav"></find-nav>
        <find-recommend ref="recommend"></find-recommend>
        <find-new></find-new>
        <find-videos ref="video"></find-videos>

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
<!--              <transition name="bounce" v-if="trans">-->
              <div class="text-wrapper">
                  <span class="refresh-text">
                    已为你推荐新的个性化内容
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

  </div>


</template>

<script>
    import FindHeader from './header'
    import FindSlider from './slider'
    import FindNav from './nav'
    import FindRecommend from './recommendsongs'
    import FindNew from './newsong'
    import FindVideos from './videos'
    export default {
      name: 'find.vue',
      components: {
        FindHeader,
        FindSlider,
        FindNav,
        FindRecommend,
        FindNew,
        FindVideos
      },
      data () {
        return {
          options: {
            pullDownRefresh: {
              threshold: 30,
              stopTime: 2000,
              txt: '更新成功'
            },
            pullUpLoad: true
          },
          secondStop: 0,
          scrollEvents: ['scroll'],
          pullDownY: 0,
          isRefresh: false,
          trans: false
        }
      },
      methods: {

        onPullingDown () {
                // this.isRefresh = true;

          setTimeout(() => {
            this.$refs.recommend.getResults()
            this.$refs.video.getVideos()

            this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
            this.$refs.contentScroll.forceUpdate()// 下拉完毕
            this.isRefresh = true
          }, 1000)
        },

        onPullingUp () {
          setTimeout(() => {
            this.$refs.video.upLoad()

            const contentScroll = this.$refs.contentScroll
            contentScroll.forceUpdate()
                // contentScroll.refresh();
          }, 1000)
        },
        scrollHandler (pos) {
          this.pullDownY = -pos.y
        }

      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .find
    height:667px
    width:375px
    .find-nav
      margin-top:160px

  .content-scroll-wrapper
    position:relative
    height:617px
    width:375px
    bottom:50px
    top:50px
    z-index:300



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
      width:200px
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
    /*background-color:white*/
    position:relative
    bottom:100px
    margin-top:100px
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
        transform: translateX(150px);
      }
      100% {
        transform: translateX(0px);
      }




  .cube-scroll-content
    height:auto
</style>
