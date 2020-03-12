<template>
  <div class="wrapper">

   <!-- <div class="pullloadtop" v-if="!videos.length">
     <div>
        <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
     </div>
    </div> -->

     <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        nest-mode="native"
        >
          <div class="ul-list-top">
            <div>
              <span>全部</span>
              <span>(200个)</span>
            </div>
            <div>
              <span>全部</span>
              <span>MV</span>
            </div>
          </div>
         <ul class="my-video">
          <li v-for="(item) in videos" :key="item.id" @click="selectItem(item.vid)">
            <sub-video :item="item"></sub-video>
          </li>
         </ul>

    </cube-scroll>
    </div>
  </div>
</template>

<script>
import subVideo from '../../base/swiper/singervideo'

export default {
  components: {
    subVideo
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        pullUpLoad: false,
        scrollbar: false,
        click: false, // 解决点击事件被触发两次的问题
        stopPropagation: false,
        scrollX: false,
        scrollY: true
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      scrollY: 0,
      offset: 0,
      hasMore: true,
      videos: []
    }
  },
  watch: {

  },
  computed: {},
  methods: {
    getMvs (id) {
      this.$api.singers.singermv(id).then(res => {
        this.hasMore = res.data.hasMore
        this.videos = res.data.mvs
        // if (this.hasMore) {
        //   this.offset++
        //   this.mvs = this.videos.concat(res.data.data)
        //   console.log(this.videos)
        // }
        this.$emit('videoNum', this.videos.length)
      })
    },
    selectItem (vid) {

    },
    onPullingUp () {
    },
    scrollHandler (pos) {
      this.scrollY = -pos.y
      //  console.log('子组件左边滚动' + this.scrollY)
    },
    Disable () {
      // this.$refs.contentScroll.disable()
      // console.log(this.$refs.contentScroll)
    },
    Enable () {
      // this.$refs.contentScroll.enable()
      // this.options.scrollY = true
      this.$refs.contentScroll.refresh()
      //  console.log('开始滚动')
    },
    toListLike () {

    }
  },
  created () {
    this.getMvs(this.id)
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.Disable()
    // })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  
  .ul-list-top
      flex-between()
      margin:10px
  .my-video
    height:auto
    li
      height:60px
      margin-top:10px
  .content-scroll-wrapper
    position:relative
    height:567px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:0
    background-color:white 
    .content
      height: 100%
      overflow: hidden   


 //上方加载中相关样式
  .pullloadtop
    width:100%
    height:100%
    position: absolute
    top:0
    left:0
    bottom:0
    z-index: 10000
    // flex-center()
    background-color:white
    display:flex
    div
      position:absolute
      top:100px
      left:150px
      .load
        font-size:$font-size-medium-x 
        i
          color:red
        span
          color:gray    

</style>