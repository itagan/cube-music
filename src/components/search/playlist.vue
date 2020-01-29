<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="!playlists.length">
      <span class="load">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
    </div>

    <div class="content-scroll-wrapper" v-else>
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
        <ul class="content">
          <li v-for="(item,index) in playlists" :key="index">
            <list-base>
              <img v-lazy="item.coverImgUrl" alt="" slot="left" class="img"> 
              <div slot="top" class="limit">
               <div class="limit-top">{{item.name}}</div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">
                 {{item.trackCount}}首音乐
                by
                {{item.creator.nickname}},
                播放{{Num(item.playCount)}}次
                </div>
              </div>
            </list-base>
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
import listBase from '../../base/swiper/listbasesmall'
import {serializeNumber} from '../../assets/js/number'
export default {
  components: {
    listBase
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
      playlists:[]
    }
  },
  watch: {
    currentPage(val) {
      if(val === 3 && !this.playlists.length) {
       this.getPlaylist(this.value, 30, 0, 1000)
      } 
    }
  },
  computed: {},
  methods: {
    getPlaylist (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.hasMore = this.count < res.data.result.playlistCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.playlists =  this.playlists.concat(res.data.result.playlists)
      })
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if(!this.hasMore) return
      setTimeout(() => {
        this.getPlaylist(this.value, 30, this.offset, 1000)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    Num (num) {
      return serializeNumber(num)
    }
  },
  created() {
    // this.getPlaylist(this.value, 30, 0, 1000)
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
        img 
          width:50px
          height:50px 
          border-radius:5px
        .limit
          .limit-top
            max-width:285px
            ellipsis() 
          .limit-bottom
            max-width:285px
            ellipsis()    
          
      
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

</style>