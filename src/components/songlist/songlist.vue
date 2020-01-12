<template>
  <div class="song-list">

    <div class="song-list-background">
      <img width="100%" height="100%" :src="playlist.coverImgUrl" alt="">
    </div>

    <div class="song-list-white" :style="{height:whiteHeight + 'px'}"></div>
    <ul class="check-footer" v-show="allShow">
      <li>
        <div class="check-footer-icon"><i class="iconfont iconbofang"></i></div>
        <div class="check-footer-text">下一首播放</div>
      </li>
      <li>
        <div class="check-footer-icon"><i class="iconfont iconwodeshoucang"></i></div>
        <div class="check-footer-text">收藏到歌单</div>
      </li>
      <li>
        <div class="check-footer-icon"><i class="iconfont iconxiazaigequ"></i></div>
        <div class="check-footer-text">下载</div>
      </li>
      <li>
        <div class="check-footer-icon"><i class="iconfont iconquxiao"></i></div>
        <div class="check-footer-text">删除下载</div>
      </li>
    </ul>
    <transition name="slide-fade">
      <my-header class="my-header" ref="header" v-show="isShow" :title="title"></my-header>
    </transition>

    <div v-if="!this.tracks" class="pull-load-top">
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
          <message
            class="my-message"
            :playlist="playlist"
            @saveComment="saveComment"
            @share="toShare"
            @check="toCheck"
            @cover="toCover"
          ></message>

          <cube-sticky-ele>
            <ul class="sticky-header" ref="messTop" v-show="!allShow">
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
              <li class="play-sub" v-if="!this.isSubscribed" @click="toSubscribed">
                <i class="iconfont iconjia"></i>
                <span>收藏</span>
                (<span class="sub-num" ref="Sub">{{playlist.subscribedCount}}</span>)
              </li>

              <li class="play-sub-ok" v-if="this.isSubscribed" @click="toSubscribed">
                <i class="iconfont iconshoucangchenggong"></i>
                <span class="sub-num" ref="Sub">{{playlist.subscribedCount}}</span>
              </li>
            </ul>

            <ul class="sticky-header" v-show="allShow" @click.self="allCheck">
              <li @click="allCheck">
                <cube-checkbox v-model="checked">
                  全选
                </cube-checkbox>
              </li>
              <li class="complete" @click.self="toComplete">完成</li>
            </ul>

          </cube-sticky-ele>
          <list
            class="my-list"
            :tracks="tracks"
            @more="more"
            @toAll="toAllChecked"
            :complete="complete"
            :allShow="allShow"
            ref="ToCheck"
          ></list>
          <ul class="song-list-collection" ref="subTop">
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

    <play-more
      v-if="isMore"
      @cancel="cancelMore"
      @build="moreBuildList"
      @share="toShare"
      @ring="setRing"
      :track="track"
      ref="playMore"
    ></play-more>
    <share-dialog ref="shareShow"></share-dialog>
    <set-ring ref="setRingShow"></set-ring>
    <my-cover :playlist="playlist" v-if="coverShow" @coverHide="coverHide"></my-cover>
  </div>
</template>

<script>
    import myHeader from './header'
    import mySearch from '../../base/search/searchcancel'
    import Message from './message'
    import List from './list'
    import playMore from './playmore'
    import shareDialog from '../common/sharedialog'
    import setRing from '../common/setring'
    import myCover from '../common/cover'
    export default {
      name: 'songList.vue',
      components: {
        myHeader,
        mySearch,
        Message,
        List,
        playMore,
        shareDialog,
        setRing,
        myCover
      },
      data () {
        return {
          placeholder: '搜索歌单内歌曲',
          fake: false,
          isShow: true,
          searchLeave: false,
          searchEnter: false,
          scrollY: 0,
          scrollEvents: ['scroll'],
          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          pullUpLoadMoreTxt: '加载中…………',
          pullUpLoadNoMoreTxt: '没有更多数据了~',
          track: {},
          tracks: [],
          messages: {},
          playlist: {},
          subs: [],
          whiteHeight: 200,
          isMore: false,
          isBuild: false,
          visible: false,
          messTop: 0,
          title: '歌单',
          checked: false,
          allShow: false,
          complete: false,
          isSubscribed: false,
          id:'',
          coverShow:false
        }
      },
      computed: {
        options () {
          return {
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true,
            startY: -50
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
      created () {
        this.getList()
      },
      methods: {
        getList () {
          // this.id = this.$route.params.id
          this.$api.songLists.songList(this.$route.params.id).then(res => {
            console.log(res.data)
            this.playlist = res.data.playlist
            this.isSubscribed = this.playlist.subscribed
              // this.tracks = res.data.playlist.tracks
            this.tracks = res.data.playlist.tracks.length > 100 ? res.data.playlist.tracks.slice(0, 10) : res.data.playlist.tracks
            this.subs = res.data.playlist.subscribers.length > 5 ? res.data.playlist.subscribers.slice(0, 4) : res.data.playlist.subscribers
            this.messages.avatarUrl = res.data.playlist.creator.avatarUrl
            this.messages.nickname = res.data.playlist.creator.nickname
          })
        },
        getQuery (query) {
          console.log(query)
        },
        goToSearch () {
          this.isShow = !this.isShow
          if (this.isShow) {
            this.fake = false
            this.searchEnter = true
            this.searchLeave = false
          } else {
            this.searchLeave = true
            this.searchEnter = false
            this.fake = true
          }
        },
        saveComment () {

        },
        scrollHandler ({ y }) {
          this.scrollY = -y
          this.whiteHeight = 610 - this.$refs.subTop.getBoundingClientRect().bottom + 100
          this.messTop = this.$refs.messTop.getBoundingClientRect().top
              // 需要添加防抖节流
          if (this.messTop < 171) {
            this.title = this.playlist.name
          } else {
            this.title = '歌单'
          }
        },
        onPullingUp () {

        },
        cancel () {
          this.isBuild = false
        },
        more (index) {
            // 子组件提醒打开更多操作页面
          this.isMore = true
            // this.visible = true
          this.$nextTick(() => {
            this.$refs.playMore.show()
          })
          this.track = this.tracks[index]
        },

        moreBuildList () {
          this.isMore = false
          this.isBuild = true
            // 手动调用，解决打开更多再新建歌单产生滚动现象的bug。
          this.$nextTick(() => {
            this._dialog.afterOpen()
          })
        },
        cancelMore () {
          this.$refs.playMore.hide()

            // this.isMore = false
            // this.$nextTick(() => {
            //     this.$refs.playMore.hide()
            // })
          setTimeout(() => {
            this.isMore = false
          }, 500)
        },
        toShare () {
          this.$refs.shareShow.show()
        },
        setRing () {
          this.$refs.setRingShow.show()
        },
            // 全选功能
        toCheck () {
          this.allShow = true
          this.stickyTop()
        },
        stickyTop () {
          this.$nextTick(() => {
            // this.$refs.scroll.scrollToElement('.toTop', 250, 0, -50)
            this.$refs.scroll.scrollTo(0, -280, 250)
          })
        },
        toComplete () {
          this.allShow = false
          this.checked = false
          this.$refs.ToCheck.allToCheckNo()
        },
        allCheck () {
          this.checked = !this.checked
          if (this.checked) {
            this.$refs.ToCheck.allToChecked()
          } else {
            this.$refs.ToCheck.allToCheckNo()
          }
        },
        toAllChecked (val) {
          if (val === 1) {
            this.checked = true
          } else if (val === 0) {
            this.checked = false
          }
        },
        toCover () {
          this.coverShow = true
        },
        coverHide () {
          this.coverShow = false
        },
            // 收藏功能
        toSubscribed () {
          if (this.isSubscribed) {
            this.$createDialog({
              type: 'confirm',
              title: '确定不再收藏该歌单？',
              confirmBtn: {
                text: '确定',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '取消',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onConfirm: () => {
                this.$api.songLists.subscribe(2, this.playlist.id).then(res => {
                  console.log(res)
                  if (res.status === 200) {
                    this.$createToast({
                      type: 'text',
                      time: 1000,
                      txt: '歌单已取消收藏'
                    }).show()
                    this.$refs.Sub.innerHTML--
                    this.isSubscribed = false
                  }
                })
              }
            }).show()
          } else {
            this.$api.songLists.subscribe(1, this.playlist.id).then(res => {
              console.log(res)
              if (res.status === 200) {
                const toast = this.$createToast({
                  txt: '歌单已收藏',
                  type: 'correct',
                  time: 2000
                })
                toast.show()
                this.$refs.Sub.innerHTML++
                this.isSubscribed = true
              }
            })
          }
        }
      },
      watch: {
        isBuild (val) {
          if (val) {
            this._dialog.afterOpen()
          } else {
            this._dialog.beforeClose()
          }
        },
        isMore (val) {
          if (val) {
            this._dialog.afterOpen()
          } else {
            this._dialog.beforeClose()
          }
        }
      },
      mounted () {

      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .song-list
    background-color:rgba(128,128,128,.8) !important
    height:667px  //必须设置高度，否则遮罩弹出层异常
    width:100%
    .my-header
      background-color:transparent
      color:white
    .my-search
      position:absolute
      z-index 1000
      top:0
    .my-message
      margin-top:50px
      margin-bottom:15px
      /*position: absolute*/
      /*top:50px*/
    .song-list-background
      position: absolute
      width: 100%
      height: 100%
      top:0
      left:0
      z-index: 0
      opacity: 0.7
      filter: blur(18px)
    .song-list-white
      position: absolute
      width: 100%
      height:40%
      left:0
      bottom:0
      z-index: 0
      background-color:white
    .check-footer
      position:fixed
      bottom:0
      z-index:2001
      height:50px
      width:100%
      display:flex
      font-size:$font-size-small
      color:dimgray
      li
        width:25%
        flex:1
        background-color:#dcdcdc
        height:50px
        text-align:center
        .check-footer-icon
          height:30px
          line-height:30px
          i
            font-size:$font-size-large-x
        .check-footer-text
          height:20px
          line-height:1.5


    .song-list-collection
      display:flex
      position:relative
      background-color:white
      padding:10px auto
      li
        height:25px
        line-height:25px
      .li-img
        margin-left: 10px
        height:25px
        width:25px
        border-radius:50%
        img
          height:25px
          width:25px
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
    z-index:1
    font-size:$font-size-medium
    border-top-left-radius:20px
    border-top-right-radius:20px
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
        padding-right:5px
        i
          margin-left:5px
        .sub-num
          /*margin-right:5px*/
          width:auto
      .play-sub-ok
        font-size:$font-size-small
        color:gray
        margin-right:10px
      .complete
        height:100%
        width:50px
        line-height:50px
        color:red

    /*.cube-sticky*/
      /*padding: 0 10px*/
    .scroll-ele
      -webkit-overflow-scrolling: touch //滚动回弹效果



    //磁贴后样式
    .cube-sticky-fixed
      border-top-left-radius:20px !important
      border-top-right-radius:20px !important
      .cube-sticky-content
        border-top-left-radius:20px
        border-top-right-radius:20pxs



    //磁贴后样式
    .cube-sticky-fixed
      border-top-left-radius:20px !important
      border-top-right-radius:20px !important
      .sticky-header
        border-top-left-radius:20px !important
        border-top-right-radius:20px !important



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

  /*深度选择器*/
  .cube-checkbox_checked >>>
  .cube-checkbox-ui
    i
      color:red !important

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
