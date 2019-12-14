<template>
  <div class="song-list">
<!--      <transition name="slide-fade">-->
<!--        <my-header class="my-header" ref="header" v-show="isShow"></my-header>-->
<!--      </transition>-->
<!--      <my-search-->
<!--        :placeholder="placeholder"-->
<!--        :fake="fake"-->
<!--        @query="getQuery"-->
<!--        @click.native="goToSearch"-->
<!--        :class="{'my-search-leave': this.searchLeave ,'my-search-enter' : this.searchEnter}"-->
<!--        class="my-search"-->
<!--      >-->
<!--      </my-search>-->
<!--      <message class="my-message"></message>-->
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
          <message class="my-message" :messages="messages"></message>

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
                    (共222首)
                  </span>
              </li>

              <li class="play-sub">
                <i class="iconfont iconjia"></i>
                <span>收藏</span>
                <span>21212</span>
              </li>
            </ul>
          </cube-sticky-ele>

          <list :tracks="tracks"></list>

<!--          <template slot="pullup" slot-scope="props">-->
<!--            <div v-if="props.pullUpLoad" class="pullload">-->
<!--              <template v-if="loadisshow">-->
<!--                <span v-if="props.isPullUpLoad" class="load">-->
<!--                   <i class="iconfont iconyinletiaodongzhuangtai"></i>-->
<!--                  <span> 加载中...</span>-->
<!--                </span>-->
<!--                <span v-else>更新成功</span>-->
<!--              </template>-->
<!--            </div>-->
<!--          </template>-->

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
            messages:{}
          }
        },
        computed: {
            options () {
                return {
                    pullUpLoad: this.pullUpLoadObj,
                    scrollbar: true
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
                this.tracks = res.data.playlist.tracks
                this.messages.playCount = res.data.playlist.playCount
                this.messages.coverImgUrl = res.data.playlist.coverImgUrl
                this.messages.name = res.data.playlist.name
                this.messages.description = res.data.playlist.description
                this.messages.shareCount = res.data.playlist.shareCount
                this.messages.commentCount = res.data.playlist.commentCount
                this.messages.tags = res.data.playlist.tags
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

    .my-message
      margin:15px auto



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
        width:110px
        height:35px
        border-radius:16px
        background-color:red
        color:white
        margin-right:10px
        flex-center()

    /*.cube-sticky*/
      /*padding: 0 10px*/
    .scroll-ele
      /*height: 100%*/
      /*overflow: auto*/
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
     transform: translateY(-50px)
     transition:transform 0.3s ease

  .my-search-enter
    transform: translateY(0)
    transition:transform 0.3s ease

</style>
