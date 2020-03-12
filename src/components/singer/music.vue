<template>
 <div class="wrapper">
     <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        nest-mode="native"
        >
          <ul class="ul-list">
          <li class="ul-list-top">
            <i class="iconfont iconbofang2"></i>
            <span class="play-text"> 收藏热门</span>
            <span class="play-num">50</span>
          </li>

          <li v-for="(item, index) in hotSongs" :key="item.id" v-if="!checkbox">
            <div class="song-base">
              <div class="num">
                <span v-show="!playing">{{index + +1}}</span>
                <i class="iconfont iconlaba" v-show="playing"></i>
              </div>

              <div class="song-base-content">
                <div class="title" :class="[playing ? 'activeColor' : '']">
                  <span class="title-left">{{item.name}}</span>
                  <span class="title-right" v-if="item.alia && item.alia.length">({{item.alia[0]}})</span>
                </div>
                <div class="desc">
                  <img src="" alt="" class="sq">
                  <!-- <span class="nickname">{{item.ar[0].name}}</span> -->
                  <span class="name">{{item.al.name}}</span>
                </div>
              </div>

              <div class="playing">
                <i class="iconfont iconbofang5"></i>
              </div>
              <div class="more" @click="more(index)">
                <i class="iconfont icongengduo"></i>
              </div>
            </div>
          </li>


          <cube-checkbox-group v-model="checkList" @input="Input">
          <li v-for="(item, index) in hotSongs" :key="item.id" v-if="checkbox">
            <cube-checkbox :option="{value:index+ +1}" class="checkbox-css">

            <div class="song-base">
              <div class="song-base-content">
                <div class="title" :class="[playing ? 'activeColor' : '']">
                  <span class="title-left">{{item.name}}</span>
                  <span class="title-right" v-if="item.tns && item.tns.length">({{item.tns[0]}})</span>
                </div>
                <div class="desc">
                  <img src="" alt="" class="sq">
                  <span class="nickname">{{item.ar[0].name}}</span>
                  <span class="name">{{item.al.name}}</span>
                </div>
              </div>
              <div  class="drag-drop">
                <i class="iconfont icontuozhuai"></i>
              </div>
            </div>
            </cube-checkbox>
          </li>
          </cube-checkbox-group>

          <li class="ul-list-bottom">
            <span>全部歌曲</span>
             <i class="iconfont iconleft-arrow"></i>
          </li>
          
        </ul>
    </cube-scroll>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    },
    begin: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hotSongs: [],
      playing: false,
      // options: {
      //   pullUpLoad: true,
      //   scrollbar: true,
      //   click: false, // 解决点击事件被触发两次的问题
      //   stopPropagation:false,
      //   scrollX:false,
      //   scrollY:true
      // },
      secondStop: 0,
      scrollEvents: ['scroll'],
      scrollY: 0,
      playing: false,
      checkbox: false,
      activeColor: 'activeColor',
      checkList: [],
      val: 1
    }
  },
  watch: {
    currentPage () {
      if (this.currentPage === 1) {
        this.getMusic()
      }
    }
  },
  computed: {
    options () {
      if (this.begin) {
        // console.log('让我滚动')
        return {
          pullUpLoad: false,
          scrollbar: false,
          click: false, // 解决点击事件被触发两次的问题
          stopPropagation: false,
          scrollX: false,
          scrollY: true
        }
      } else {
        return {
          pullUpLoad: false,
          scrollbar: false,
          click: false, // 解决点击事件被触发两次的问题
          stopPropagation: false,
          scrollX: false,
          scrollY: true
        }
      }
    }
  },
  methods: {
    getMusic () {
      this.$api.singers.singermusic(this.id).then(res => {
        this.hotSongs = res.data.hotSongs
      })
    },
    onPullingUp () {
      // if(!this.hasMore) return
      // setTimeout(() => {
      //   this.getFollows(477726475, this.offset)
      //   const contentScroll = this.$refs.contentScroll
      //   contentScroll.forceUpdate()
      // }, 1000)
      console.log('上拉右边')
    },
    scrollHandler (pos) {
      this.scrollY = -pos.y
      // console.log('子组件右边滚动' + this.scrollY)
    },
    Disable () {
      this.$refs.contentScroll.disable()
    },
    Enable () {
      // this.$refs.contentScroll.enable()
      this.options.scrollY = true
      this.$refs.contentScroll.forceUpdate()
    },
    Input () {

    }
  },
  created () {
    // this.getMusic()

  },
  mounted () {
    //  this.Disable()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  
  .ul-list
    height:auto
    // width:375px
    // background-color:white
    .ul-list-top
      display:flex
      font-size:$font-size-medium-x
      font-weight:bold
      height:40px
      line-height:40px
      padding-left:15px
      .play-text
        margin-left:10px
      .play-num
        margin-left:5px
    .ul-list-bottom  
      display:flex
      font-size:$font-size-medium
      height:40px
      line-height:40px
      justify-content:center
      color:gray
    li
      .song-base
        display:flex
        width:375px
        height:50px
        position:relative
        .num
          width: 40px
          height:50px
          flex-center()
          color:gray
        .song-base-content
          height:50px
          position:absolute
          left:40px
          max-width:250px
          .title
            font-size:$font-size-medium-x
            ellipsis()
            max-width:250px
            height:28px
            line-height:28px
            margin-left:3px
            .title-right
              color:gray
          .desc
            font-size:$font-size-small
            color:gray
            ellipsis()
            max-width:250px
        /*height:22px*/
        /*line-height:22px*/
        .playing
          width: 40px
          height:50px
          flex-center()
          position:absolute
          right:30px
          color:gray
        .more
          width: 40px
          height:50px
          flex-center()
          position:absolute
          right:0
          color:gray

    
    
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

</style>