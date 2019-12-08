<template>
  <div class=wonderful>
    <nav-bar class="wonderful-header">
      <i class="iconfont iconfanhui" slot="left" @click="goback" style="font-size: 24px"></i>
      <div slot="center" class="music">精彩视频</div>
    </nav-bar>
    <div class="slides">
      <cube-slide
        ref="slide"
        :data="videos"
        direction="vertical"
        :showDots="false"
        :loop="false"
        :autoPlay="false"
        :options="options"
        @change="changePage"
        class="cube-slide">
        <cube-slide-item v-for="(item, index) in videos" :key="index"  class="slide-item" :style="{Height:height}">
          <wonderful-base
            :videos="videos"
            :item="item"
            :index="index"
            :ind="ind"
            :pullDownY="pullDownY"
            @rollback="rollBack"
            class="base"
            ref="base"
          >
          </wonderful-base>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import navBar from '../../base/navbar/navbar'
    import wonderfulBase from '../../base/video/wonderfulbase'
    import {serializeNumber} from '../../assets/js/number'
    import {durationsTransformation} from '../../assets/js/timestamp'
    export default {
      components: {
        navBar,
        wonderfulBase
      },
      data () {
        return {
          videos: [],
          item: {},
          index: 0,
          options: {
            pullUpLoad: true,
            probeType: 1,
            click: false
          },
          secondStop: 0,
          scrollEvents: ['scroll', 'scroll-end'],
          pullDownY: 0,
          der: 0,
          ind: 0,
          height: 308.47
        }
      },
      created () {
        this.getVideos()
      },
      computed: {
        ...mapGetters([
          'videoGroupId'
        ]),

        videoGroup () {
          return this.videoGroupId
        }
      },
      watch: {
        videoGroup () {
        }
      },
      methods: {
        getVideos () {
          this.$api.video.videolist(9102).then((res) => {
            this.videos = res.data.datas
            for (let i = 0; i < this.videos.length; i++) {
              this.videos[i].data.playTime = serializeNumber(this.videos[i].data.playTime)
              this.videos[i].data.durationms = durationsTransformation(this.videos[i].data.durationms)
            }
          })
        },
        goback () {
          this.$router.go(-1)
        },
        rollBack () {
                // 点击下边的视频即往上滚动并播放。
          this.$refs.slide.slide.next()
          this.$refs.slide.slide.refresh()
        },
        changePage (current) {
          this.ind = current
          this.setCurrentIndex(current)
        },
        ...mapMutations({
          setCurrentIndex: 'SET_CURRENT_INDEX'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wonderful
    height:667px
    widows:375px
    background-color:black
    position:relative
    z-index:2001
    .wonderful-header
      height:50px
      width:375px
      background-color:black
      color:white
      font-size:$font-size-medium-x
    .slides
      height:617px
      margin-top:50px
      width:100%
      position:absolute
      bottom:0
      overflow:hidden //避免产生自然滚动bug
      .cube-slide
        height:308.47px  //也代表轮播偏移滑动距离
        overflow:visible //不让偏移出去的轮播项被隐藏
        .slide-item
          height:308.47px !important
          width:100%
</style>
