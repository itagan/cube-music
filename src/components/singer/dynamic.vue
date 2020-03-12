<template>
  <div class="wrapper">

    <div class="pullloadtop" v-if="!events.length">
     <div>
        <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
     </div>
    </div>

     <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        nest-mode="native"
        >
         <ul class="wrapper">
          <li v-for="(item,index) in jsons" :key="index">
            <my-dynamic :item="item" :events="events" :index="index"></my-dynamic>
          </li>
        </ul>

    </cube-scroll>
    </div>
  </div>
</template>

<script>
import myDynamic from '../dynamic/dynamic'
export default {
  components: {
    myDynamic
  },
  props: {
    profile: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      events: [],
      jsons: [],
      lasttime: -1,
      hasMore: true,
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
      offset: 0
    }
  },
  watch: {
    profile () {
      this.getDynamic(this.profile.userId, 10, -1)
    }
  },
  computed: {},
  methods: {
    getDynamic (userId, limit, lasttime) {
      this.$api.users.getDynamic(userId, limit, lasttime).then(res => {
        // this.lasttime = res.data.lasttime
        // this.hasMore = res.data.more

        // if (this.hasMore) {
        //   this.hasMore = res.data.more
        //   this.lasttime = res.data.lasttime
        // }
        this.events = this.events.concat(res.data.events)
        this.jsons = this.events.map(item => {
          return JSON.parse(item.json)
        })
        this.$emit('dynamicNum', this.events.length)

        console.log(this.events)
      })
    },
    onPullingUp () {
      if (!this.hasMore) return
      // setTimeout(() => {
      //   this.getAlbums(this.id, 20, this.offset)
      //   const contentScroll = this.$refs.contentScroll
      //   contentScroll.forceUpdate()
      // }, 1000)
    },
    scrollHandler (pos) {
      this.scrollY = -pos.y
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:auto
    background-color:white
    li
      height:auto
      width:100%
      border-bottom:.5px solid rgba(128,128,128,.7)


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