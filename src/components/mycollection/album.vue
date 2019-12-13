<template>
    <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div class="content">
          <my-search
            :placeholder="placeholder"
            :fake="fake"
            @query="getQuery"
            @click.native="goToSearch"
            class="album-search"
          ></my-search>
          <ul class="my-album">
            <li class="li-left">
              <div class="left-img">
                <img src="../user/img/login1.png" alt="">
              </div>
              <div class="left-border"></div>
              <div class="left-cir"></div>
            </li>
            <li class="li-center">
              <span>我的数字专辑</span>
            </li>
            <li class="li-right">
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>

          <ul class="collect-album">
            <li class="collect-album-top"><span>收藏的专辑</span></li>
            <li v-for="item in albums" :key="item.id" @click="selectItem(item.id)">
              <album-base :item="item"></album-base>
            </li>
          </ul>
        </div>

        <template slot="pulldown" slot-scope="props">
          <div v-if="props.pullDownRefresh"
               class="cube-pulldown-wrapper"
               :style="props.pullDownStyle">
            <div v-if="props.beforePullDown"
                 class="before-trigger"
                 :style="{paddingTop: props.bubbleY + 'px'}">
              <span :class="{rotate: props.bubbleY > options.pullDownRefresh.threshold - 60}" class="refresh-text">↓</span>
              <span v-if="props.bubbleY > options.pullDownRefresh.threshold - 60" class="refresh-text">下拉刷新</span>
              <span v-else class="refresh-text">松开刷新</span>
            </div>

            <div class="after-trigger" v-else>
              <div v-show="props.isPullingDown" class="loading">
                <i class="iconfont iconyinletiaodongzhuangtai"></i>
                <span> 更新中...</span>
              </div>
              <span :class="{rotate: props.bubbleY > 0}" v-show="!props.isPullingDown" class="refresh-text">↓下拉刷新</span>
            </div>
          </div>
        </template>
<!--        <template slot="pullup" slot-scope="props">-->
<!--          <div v-if="props.pullUpLoad" class="pullload">-->
<!--            <template>-->
<!--                <span v-if="props.isPullUpLoad" class="load">-->
<!--                   <i class="iconfont iconyinletiaodongzhuangtai"></i>-->
<!--                  <span> 加载中...</span>-->
<!--                </span>-->
<!--            </template>-->
<!--          </div>-->
<!--        </template>-->

      </cube-scroll>
    </div>
</template>

<script>
    import MySearch from '../../base/search/search'
    import albumBase from "../../base/swiper/albumbase";
    export default {
        name: "album.vue",
        components: {
          MySearch,
          albumBase
        },
        data () {
          return {
            placeholder: '搜索专辑',
            fake:false,
            albums:[],
            item:{},
            options: {
              pullDownRefresh: {
                threshold: 60,
                stopTime: 1000,
                txt: '更新成功'
              },
              pullUpLoad: true,
              click: false // 解决点击事件被触发两次的问题
            },
            secondStop: 0,
            scrollEvents: ['scroll'],
            pullDownY: 0
          }
        },
        created() {
          this.getAlbums()
        },
        methods: {
          getQuery (query) {
            console.log(query)
          },
          goToSearch () {
            this.fake = true
          },
          getAlbums () {
            this.$api.subs.albums().then(res => {
              console.log(res.data.data)
              this.albums = res.data.data
            })
          },
          selectItem (id) {

          },
          onPullingDown () {
            setTimeout(() => {
              this.albums = this.albums.reverse()
                // this.getAlbums()
              this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
              this.$refs.contentScroll.forceUpdate();//下拉完毕
            }, 1000)
          },

          onPullingUp () {
            setTimeout(() => {
              // this.getAlbums()
              const contentScroll = this.$refs.contentScroll
              contentScroll.forceUpdate()
              // contentScroll.refresh();
            }, 1000)
          },
          scrollHandler (pos) {
            this.pullDownY = -pos.y
          }

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

    .album-search
      width:90%
      position:relative
      left:2.5%
    .my-album
      width:100%
      flex-between()
      position:relative
      height:50px
      line-height:50px
      background-color:white
      padding:10px 0
      li
        height:50px
        line-height:50px
      .li-left
        position:relative
        margin-left:10px
        .left-img
          position:absolute
          width:50px
          height:50px
          z-index:100
          img
            width:100%
            height:100%
            border-radius:5px
        .left-border
          position:absolute
          border:.5px solid gray
          width:45px
          height:45px
          left:6px
          top:2px
          z-index:99
        .left-cir
          position:absolute
          border-radius:50%
          width:50px
          height:50px
          background-color:black
          z-index:98
          left:8px
      .li-center
        font-size:$font-size-medium-x
        position:absolute
        left:75px
      .li-right
        font-size:$font-size-medium-x
        margin-right:10px

    .collect-album
      padding-top:10px
      margin-top:10px
      background-color:white
      .collect-album-top
        font-size:$font-size-medium
        margin-left:10px


    .content-scroll-wrapper
      position:absolute
      height:617px //需要除去头部高度，避免产生页面原生滚动
      width:375px
      bottom:100px
      top:50px
      /*z-index:300*/
      .content
        height: 100%
        overflow: hidden


  .cube-pulldown-wrapper
    text-align: center
  .before-trigger
    height: auto
    font-size: 30px
    align-self: flex-end
    span
      display: inline-block
      line-height: 1
      transition: all 0.3s
      color: #666
      padding: 15px 0
      &.rotate
        transform: rotate(180deg)

  .after-trigger
    flex: 1
    margin: 0
    /*position:relative*/
    .loading
      font-size:$font-size-medium
      i
        color:red
      span
        color:gray
    .text-wrapper
      margin: auto
      padding: 5px 0
      z-index:500
      position:relative
      width:140px
      height:18px
      text-align:center
      line-height:18px
      background-color:black
      opacity:0.4
      border-radius:15px
      top:0

  .refresh-text
    color: white
    font-size:$font-size-medium

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

  .cube-scroll-content
    height:auto

</style>
