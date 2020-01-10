<template>
  <div class="albums">

    <div v-if="!this.albums" class="pull-load-top">
       <span class="load">
          <i class="iconfont iconyinletiaodongzhuangtai"></i>
          <span> 正在加载...</span>
       </span>
    </div> 

  
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          @pulling-up="onPullingUp"
          :options="options"
          ref="scroll"
        >
         <ul class="num-album">
           <li>数字专辑</li>
           <li>更多热销专辑</li>
         </ul>
         <ul class="top-album">
           <li class="album-base-top" v-for="item in topAlbums" :key="item.id">
              <div class="left-img">
                <img v-lazy="item.picUrl" alt="" :key="item.picUrl">
              </div>

              <div class="left-border"></div>
              <div class="left-cir"></div>

              <div class="album-bottom">
                <div class="album-bottom-title">{{item.name}}</div>
                <div class="album-bottom-name">{{item.artist.name}}</div>
              </div>
           </li>
         </ul>

          <cube-sticky-ele>
            <div class="sticky-header">
             <span>本周新碟</span>
            </div>
          </cube-sticky-ele>

          <ul class="new-album">
           <li class="album-base-new" v-for="item in albums" :key="item.id">
              <div class="left-img">
                <img v-lazy="item.picUrl" alt="" :key="item.picUrl">
              </div>

              <div class="left-border"></div>
              <div class="left-cir"></div>

              <div class="album-bottom">
                <div class="album-bottom-title">{{item.name}}</div>
                <div class="album-bottom-name">{{item.artist.name}}</div>
              </div>
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
      </cube-sticky>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'newalbum.vue',
      components: {
      },
      props:{
        type: {
          type:Number,
          default:0
        }
      },
      data () {
        return {
          scrollY: 0,
          scrollEvents: ['scroll'],
          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          albums:[],
          topAlbums:[],
          total:0,
          offset:0,
          hasMore:true
        }
      },
      computed: {
        options () {
          return {
            pullUpLoad: true,
            scrollbar: true,
            startY: 0
          }
        },
        pullUpLoadObj: function () {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold)
          } : false
        }
      },
      created () {
        this.getAlbums(0, 20)
        this.getTopAlbums()
      },
      methods: {
        getAlbums (offset, limit) {
          this.$api.albums.newalbum(offset, limit).then(res => {
            // console.log(res.data)
            // this.albums = res.data.albums
            this.total = res.data.total
            if(this.albums.length <= this.total) {
            this.offset += 20
            }
            this.albums = this.albums.concat(res.data.albums)
            this.$refs.scroll.forceUpdate()
          })
        },
        getTopAlbums () {
          this.$api.albums.homenewalbum().then(res => {
            console.log(res.data)
            this.topAlbums = res.data.albums.slice(0, 3)
          })
        },
        scrollHandler ({ y }) {
          this.scrollY = -y          
        },
        onPullingUp () {
          if(this.albums.length <= this.total) {
            this.hasMore = true
            setTimeout(() => {
              this.getAlbums(this.offset, 20)
              this.$refs.scroll.forceUpdate()
            }, 1000)
          }else {
            this.hasMore = false
            this.$refs.scroll.forceUpdate()
          }
        },
      },
      watch: {
      },
      mounted () {

      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .albums
    height:auto
    .num-album
      flex-between()
      margin:10px
      li:nth-child(1)
        font-size:$font-size-medium-x
        font-weight:bold
      li:nth-child(2)
        font-size:$font-size-medium
        border:1px solid rgba(128,128,128,.6)
        flex-center()
        width:110px
        height:20px
        border-radius:10px
    .top-album
      width:100%
      display:flex
      height:150px
      border-bottom:5px solid rgba(128,128,128,.2)
      background-color:white
      // padding:10px 0
      .album-base-top
        position:relative
        margin: auto 10px
        height:150px
        width:120px
        .left-img
          position:absolute
          width:90px
          height:90px
          z-index:100
          img
            width:100%
            height:100%
            border-radius:5px
        .left-border
          position:absolute
          border:.5px solid gray
          width:83px
          height:83px
          left:10px
          top:3px
          z-index:99
          background-color:white
          opacity:0.4
        .left-cir
          position:absolute
          border-radius:50%
          width:80px
          height:80px
          background-color:black
          z-index:98
          left:25px
          top:5px
        .album-bottom
          position:absolute  
          bottom:15px
          font-size:$font-size-small
          .album-bottom-title
            height:20px
            line-height:20px
            width:90px
            ellipsis()
          .album-bottom-name
            height:20px
            line-height:20px
            width:90px
            ellipsis()
            color:gray


    .new-album
      width:100%
      display:flex
      height:auto
      flex-wrap:wrap
      border-bottom:5px solid rgba(128,128,128,.2)
      background-color:white
      // padding:10px 0
      .album-base-new
        position:relative
        margin:10px
        height:190px
        width:165px
        .left-img
          position:absolute
          width:145px
          height:145px
          z-index:100
          img
            width:100%
            height:100%
            border-radius:5px
        .left-border
          position:absolute
          border:.5px solid gray
          width:139px
          height:139px
          left:10px
          top:3px
          z-index:99
          background-color:white
          opacity:0.4
        .left-cir
          position:absolute
          border-radius:50%
          width:135px
          height:135px
          background-color:black
          z-index:98
          left:35px
          top:5px
        .album-bottom
          position:absolute  
          bottom:0px
          font-size:$font-size-small
          .album-bottom-title
            height:20px
            line-height:20px
            width:140px
            ellipsis()
          .album-bottom-name
            height:20px
            line-height:20px
            width:140px
            ellipsis()
            color:gray       

  .sticky-view-container
    position: relative
    top: 50px
    bottom: 0
    left: 0
    width: 375px
    height:567px
    z-index:1
    border-top-left-radius:20px
    border-top-right-radius:20px
    .sticky-header
      height:45px
      line-height:45px
      padding-left:15px
      background-color:white
      font-size:$font-size-medium-x
      span 
        font-weight:bold
      

    /*.cube-sticky*/
      /*padding: 0 10px*/
    .scroll-ele
      -webkit-overflow-scrolling: touch //滚动回弹效果

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
      // margin:10px auto
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray
          font-size:$font-size-medium  



    //上方加载中相关样式
    .pull-load-top
      width:100%
      height:100%
      margin-top:50px
      background-color:white
      /*position:relative*/
      /*bottom:50px*/
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray
</style>
