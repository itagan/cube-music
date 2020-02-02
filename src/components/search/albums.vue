<template>
  <div class="wrapper">
    <div class="pullloadtop" v-if="albumCount === 0"> 
      <span class="load"  v-if="result">
        <i class="iconfont iconyinletiaodongzhuangtai"></i>
        <span> 正在加载...</span>
      </span>
      <span  v-if="!result" class="no-result">无结果</span>
     </div> 

    <div class="content-scroll-wrapper" v-if="albumCount > 0">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
        <ul class="content">
          <li v-for="(item,index) in albums" :key="index"  @click.stop="toAlbum(item.id)">
             <album-base class="my-album">
              <div class="left-img" slot="left">
                <img :src="item.picUrl" alt="">
              </div>
              <div slot="top" class="limit">
               <div class="limit-top">{{item.name}}</div>
              </div>
              <div slot="bottom" class="limit">
                <div class="limit-bottom">
                  {{item.artist.name}}
                {{Timestamp(item.publishTime)}}
                </div>
              </div>
            </album-base>
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
import albumBase from '../../base/swiper/albumsmall'
import {timestamp} from '../../assets/js/timestamp'

export default {
  components: {
    albumBase
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
      albums:[],
      result:true,
      albumCount:0
    }
  },
  watch: {
    currentPage(val) {
      if(val === 5 && !this.albums.length) {
        this.getAlbums(this.value, 30, 0, 10)
      } 
    }
  },
  computed: {},
  methods: {
    getAlbums (keywords, limit, offset, type) {
      this.$api.searchs.search(keywords, limit, offset, type).then(res => {
        this.albumCount = res.data.result.albumCount
        this.hasMore = this.count < res.data.result.albumCount
        if(this.hasMore) {
          this.count+=30
          this.offset+=10
        }
        this.albums =  this.albums.concat(res.data.result.albums)
        setTimeout(() => {
          this.result = this.albumCount > 0 ? true : false
        }, 3000)
      })
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    onPullingUp () {
      if(!this.hasMore) return
      setTimeout(() => {
        this.getAlbums(this.value, 30, this.offset, 10)
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
    Timestamp (time) {
      return timestamp(time)
    },
    toAlbum (id) {
      this.$router.push({
        path:`/albumlist/${id}`
      })
    }
  },
  created() {
    // this.getAlbums(this.value, 30, 0, 10)
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
    .no-result
     color:gray  
     font-size:$font-size-medium   

</style>