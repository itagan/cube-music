<template>
  <ul class="wrapper">
    <li class="li-top">
      共被收藏 {{nums}} 次
    </li>
     <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        >
    <li class="li" v-for="item in playlist.slice(1)" :key="item.id" data-type="0" @click="toList(item.id)">
        <div class="li-item" >
          <div class="li-left">
            <img :src="item.coverImgUrl" v-if="item">
          </div>

          <div class="li-right">
            <div class="li-right-top">{{item.name}}</div>
            <div class="li-right-bottom" v-if="item">
              {{item.trackCount}}首,
              播放{{item.playCount}}次
              </div>
          </div>
        </div>
      </li>
      </cube-scroll>
    </div>
  </ul>
</template>

<script>
export default {
  components: {},
  props: {
    playlist: {
      type: Array,
      default: []
    },
    nums: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false // 解决点击事件被触发两次的问题
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      pullDownY: 0,
      offset: 0,
      hasMore: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    onPullingUp () {

    },
    scrollHandler (pos) {
      this.pullDownY = -pos.y
    },
    toList (id) {
      this.$router.push({
        path: `songlist/${id}`
      })
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .wrapper
    background-color:white
    width:100%
    height:auto
    .li-top
      height:40px
      line-height:40px
      width:100%
      margin-left:10px
      font-size:$font-size-medium
    .li
      height:50px
      line-height:50px
      width:100%
      margin-top:10px
      position:relative
      .li-item
        display:flex
        height:50px
        line-height:50px
        width:100%
        .li-left
          width:50px
          height:50px
          margin-left:10px
          border-radius:5px
          border:1px solid #dcdcdc
          img
            width:100%
            height:100%
        .li-right
          flex:1
          margin-left:10px
          height:50px
          line-height:50px
          max-width:265px
          .li-right-top
            font-size:$font-size-medium
            height:25px
            line-height:25px
            ellipsis()
          .li-right-bottom
            font-size:$font-size-small
            height:20px
            line-height:20px
            color:gray


     .content-scroll-wrapper
        position:absolute
        height:567px //需要除去头部高度，避免产生页面原生滚动
        width:375px
        bottom:40px
        top:50px
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
        // margin:10px auto
        .load
          font-size:$font-size-medium
          i
            color:red
          span
            color:gray
            font-size:$font-size-medium   

      //上方加载中相关样式
      // .pullloadtop
      //   width:100%
      //   height:30px
      //   position:relative
      //   top:150px
      //   z-index:1
      //   flex-center()
      //   .load
      //     font-size:$font-size-medium
      //     i
      //       color:red
      //     span
      //       color:gray       
       
</style>