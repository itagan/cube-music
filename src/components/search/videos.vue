<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="videoCount === 0"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div> 

    <div class="content-scroll-wrapper" v-if="videoCount > 0">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
        <ul class="content">
          <li v-for="(item,index) in videos" :key="index">
            <sub-video :item="item"></sub-video>
          </li>
        </ul>

        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="pullload">
            <template>
                <span v-if="props.isPullUpLoad" class="load">
                  <i class="iconfont iconyinletiaodongzhuangtai" v-if="hasMore"></i>
                  <span v-if="hasMore"> 加载中...</span>
                  <span v-if="!hasMore"> 没有更多了呢</span>
                </span>
            </template>
          </div>
        </template>

      </cube-scroll>
    </div>
  </div>
</template>

<script>
import subVideo from '../../base/swiper/subvideo'
export default {
  components: {
    subVideo
  },
  props: {
    value:{
      type:String,
      default:''
    },
    currentPage:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false // 解决点击事件被触发两次的问题
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      pullDownY: 0,
      hasMore: true,
      songCount:'',
      offset:0,
      count:0,
      videos:[],
      result:true,
      videoCount:0
    }
  },
  watch: {
    currentPage(val) {
      if(val === 6 && !this.videos.length) {
        this.getVideos(this.value, 30, 0, 1014)
      } 
    }
  },
  computed: {},
  methods: {
    getVideos (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        //手动api补全解决不全的bug
        if(res.data.result.videoCount) {
          this.videoCount = res.data.result.videoCount
        }else {
          this.videoCount = 0
        }
        this.hasMore = this.count < res.data.result.videoCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.videos =  this.videos.concat(res.data.result.videos)
        setTimeout(() => {
          this.result = this.videoCount > 0 ? true : false
        }, 3000)
      })
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if(!this.hasMore) return
      setTimeout(() => {
        this.getVideos(this.value, 30, this.offset, 1014)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    TransAlias (alias) {
      let arr = []
      for(let i = 0; i < alias.length; i++) {
        arr.push(alias[i])
      }
      return arr.join('/')
    },
  },
  created() {
    // this.getVideos(this.value, 30, 0, 1014)
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:100%
    width:100%
    background-color:white
    margin-top:22px
    // margin-bottom:50px
    .content
      li
        margin:10px auto
        .my-album
          .left-img
            position:absolute
            width:50px
            height:50px
            z-index:100
            img
              width:100%
              height:100%
              border-radius:5px
      
  .content-scroll-wrapper
    position:absolute
    height:567px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:20px
    background-color:white 
    .content
      height: 100%
      overflow: hidden      


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

  //上方加载中相关样式
  .pullloadtop
    width:100%
    height:30px
    // margin-top:150px
    position:relative
    top:150px
    z-index:1
    flex-center()
    .load
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray  
    .no-result
     color:gray  
     font-size:$font-size-medium     

</style>