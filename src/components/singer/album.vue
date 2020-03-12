<template>
  <div class="wrapper">


    <div class="pullloadtop" v-if="!albums.length">
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
          <div class="ul-list-top">
           <div>
              <span>按发行时间排序</span>
            </div>
            <div>
              <i></i>
              <span>排序</span>
            </div>
          </div>
         <ul class="my-album">
          <li v-for="item in albums" :key="item.id" @click.stop="toAlbum(item.id)">
              <album-base :item="item"></album-base>
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
import albumBase from '../../base/swiper/albumsinger'

export default {
  components: {
    albumBase
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
        pullUpLoad: true,
        scrollbar: true,
        click: false, // 解决点击事件被触发两次的问题
        stopPropagation: false,
        scrollX: false,
        scrollY: true
      },
      scrollEvents: ['scroll'],
      scrollY: 0,
      offset: 0,
      hasMore: true,
      albums: []
    }
  },
  watch: {

  },
  computed: {},
  methods: {
    getAlbums (id, limit, offset) {
      this.$api.singers.singeralbum(id, limit, offset).then(res => {
        this.hasMore = res.data.more
        if (this.hasMore) {
          this.offset += 20
        }
        this.albums = this.albums.concat(res.data.hotAlbums)
        this.$emit('albumNum', this.albums.length)
      })
    },
    toAlbum (id) {
      this.$router.push({
        path: `/albumlist/${id}`
      })
    },
    onPullingUp () {
      if (!this.hasMore) return
      this.$refs.contentScroll.refresh()
      setTimeout(() => {
        this.getAlbums(this.id, 20, this.offset)
        const contentScroll = this.$refs.contentScroll
        contentScroll.forceUpdate()
      }, 1000)
    },
    scrollHandler (pos) {
      this.scrollY = -pos.y
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
    this.getAlbums(this.id, 20, 0)
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
    .my-album
      height:auto
      padding-bottom:20px
      li
       height:50px
       margin-top:10px

       
  .content-scroll-wrapper
    position:relative
    height:617px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:0
    background-color:white 
    padding-bottom:30px
    .content
      height: 100%
      overflow: hidden     


     //加载中相关样式
  .pullload
    width:100%
    height:30px
    margin-top:5px
    background-color:white
    position:relative
    top:0
    bottom:50px
    flex-center()
    // margin:10px auto
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