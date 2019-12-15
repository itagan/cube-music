<template>
  <div class="song-list">

    <div class="song-list-background">
      <img width="100%" height="100%" :src="playlist.coverImgUrl" alt="">
    </div>

    <transition name="slide-fade">
      <my-header class="my-header" ref="header" v-show="isShow"></my-header>
    </transition>

    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @before-scroll-start="scrollStartHandler"
          @scroll="scrollHandler"
          @pulling-up="onPullingUp"
          :options="options"
          ref="scroll"
          class="scroll-ele"
        >
          <my-search
            :placeholder="placeholder"
            :fake="fake"
            @query="getQuery"
            @click.native="goToSearch"
            :class="{'my-search-leave': this.searchLeave ,'my-search-enter' : this.searchEnter}"
            class="my-search"
          >
          </my-search>
          <message class="my-message" :messages="messages" :playlist="playlist"></message>

          <cube-sticky-ele>
            <ul class="sticky-header">
              <li class="play-icon">
                <i class="iconfont iconbofang2"></i>
              </li>

              <li class="play-all">
                  <span>
                    播放全部
                  </span>
                  <span class="play-all-num">
                    (共{{tracks.length}}首)
                  </span>
              </li>

              <li class="play-sub">
                <i class="iconfont iconjia"></i>
                <span>收藏</span>
                <span class="sub-num">({{playlist.subscribedCount}})</span>
              </li>
            </ul>
          </cube-sticky-ele>
          <list :tracks="tracks" class="my-list"></list>
          <ul class="song-list-collection">
            <li class="li-img" v-for="item in subs" :key="item.userId">
              <img :src="item.avatarUrl" alt="">
            </li>

            <li class="collection-num">{{subs.length}}人收藏</li>
            <li class="collection-icon">
              <i class="iconfont iconiconfontyoujiantou"></i>
            </li>
          </ul>
        </cube-scroll>
      </cube-sticky>
    </div>
  </div>
</template>

<script>
    import myHeader from "./header"
    import mySearch from "../../base/search/searchcancel"
    import Message from "./message"
    import List from "./list"
    export default {
        name: "songList.vue",
        components: {
          myHeader,
          mySearch,
          Message,
          List
        },
        data () {
          return {
            placeholder: '搜索歌单内歌曲',
            fake:false,
            isShow:true,
            searchLeave:false,
            searchEnter:false,
            scrollY: 0,
            scrollEvents: ['scroll', 'before-scroll-start'],
            pullUpLoad: true,
            pullUpLoadThreshold: 0,
            pullUpLoadMoreTxt: '加载中…………',
            pullUpLoadNoMoreTxt: '没有更多数据了~',
            tracks:[],
            messages:{},
            playlist:{},
            subs:[]
          }
        },
        computed: {
            options () {
                return {
                    pullUpLoad: this.pullUpLoadObj,
                    scrollbar: true,
                    startY:-50
                }
            },
            pullUpLoadObj: function () {
                return this.pullUpLoad ? {
                    threshold: parseInt(this.pullUpLoadThreshold),
                    txt: {
                        more: this.pullUpLoadMoreTxt,
                        noMore: this.pullUpLoadNoMoreTxt
                    }
                } : false
            }
        },
        created() {
            this.getList()
        },
        methods: {
          getList () {
            this.$api.songLists.songList().then(res => {
                console.log(res.data)
                this.playlist = res.data.playlist
                this.tracks = res.data.playlist.tracks
                this.subs = res.data.playlist.subscribers
                this.messages.avatarUrl = res.data.playlist.creator.avatarUrl
                this.messages.nickname = res.data.playlist.creator.nickname
            })
          },
          getQuery (query) {
            console.log(query)
          },
          goToSearch () {
            this.isShow = !this.isShow
            if(this.isShow) {
              this.fake = false
              this.searchEnter = true
              this.searchLeave = false
            }else {
              this.searchLeave = true
              this.searchEnter = false
              this.fake = true
            }
          },
          scrollHandler ({ y }) {
              this.scrollY = -y
              console.log(this.scrollY)
              
          },
          scrollStartHandler () {

          },
          onPullingUp () {

          }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .song-list
    background-color:rgba(128,128,128,.8) !important
    .my-header
      z-index:-2
  /*.my-search*/
    /*  position:fixed*/
    /*  z-index:9999*/
    .my-message
      margin-top:25px
      margin-bottom:15px
    .song-list-background
      position: absolute
      width: 100%
      height: 100%
      top:0
      left:0
      z-index: -1
      opacity: 0.7
      filter: blur(18px)
    .song-list-collection
      display:flex
      position:relative
      li
        height:40px
      .li-img
        margin-left: 10px
        height:30px
        width:30px
        border-radius:50%
        img
          height:30px
          width:30px
          border-radius:50%
      .collection-num
        font-size:$font-size-small
        color:gray
        position:absolute
        right:20px
        width:auto
      .collection-icon
        font-size:$font-size-large-x
        color:gray
        position:absolute
        right:5px


  .sticky-view-container
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    font-size:$font-size-medium
    .sticky-header
      flex-between()
      height:50px
      background-color:white
      position:relative
      border-top-left-radius:20px
      border-top-right-radius:20px
      .play-icon
        height:50px
        width:40px
        flex-center()
      .play-all
        font-size:$font-size-medium-x
        position:absolute
        left:40px
        .play-all-num
          color:gray
          font-size:$font-size-medium
      .play-sub
        font-size:$font-size-small
        max-width:120px
        height:35px
        border-radius:16px
        background-color:red
        color:white
        margin-right:10px
        line-height:35px
        i
          margin-left:5px
        .sub-num
          margin-right:5px
          width:auto


    /*.cube-sticky*/
      /*padding: 0 10px*/
    .scroll-ele
      -webkit-overflow-scrolling: touch //滚动回弹效果


    //磁贴后样式
    /*.cube-sticky-fixed*/
        //flex-between()
        /*margin:auto 10px*/










  .slide-fade-enter-active
    transition: all .3s ease

  .slide-fade-leave-active
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateY(-50px)
    opacity: 0


   .my-search-leave
     transform: translateY(-10px)
     transition:transform 0.3s ease

  .my-search-enter
    transform: translateY(0)
    transition:transform 0.3s ease

</style>
