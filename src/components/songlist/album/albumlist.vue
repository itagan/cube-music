<template>
  <div class="song-list">

    <my-header class="my-header" ref="header" :title="title"></my-header> 

    <div class="user-background" ref="bgEnlarge">
      <img width="100%" height="100%" :src="messages.blurPicUrl" alt="" ref="Enlarge">
    </div>

    
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

    <div v-if="!this.songs" class="pull-load-top">
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
          <message
            class="my-message"
            :messages="messages"
            @saveComment="saveComment"
            @share="toShare"
            @check="toCheck"
            @user="toUser"
            @comment="toComment"
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
                    (共{{songs.length}}首)
                  </span>
              </li>
              <li class="play-sub" v-if="!isSub" @click="toSubscribed">
                <i class="iconfont iconjia"></i>
                <span>收藏</span>
                (<span class="sub-num" ref="Sub">{{subCount}}</span>)
              </li>

              <li class="play-sub-ok" v-if="isSub" @click="toSubscribed">
                <i class="iconfont iconshoucangchenggong"></i>
                <span class="sub-num" ref="Sub">{{subCount}}</span>
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
            :tracks="songs"
            @more="more"
            @toAll="toAllChecked"
            :complete="complete"
            :allShow="allShow"
            ref="ToCheck"
          ></list>

        </cube-scroll>
      </cube-sticky>
    </div>

    <play-more
      v-if="isMore"
      @cancel="cancelMore"
      @share="toShare"
      @ring="setRing"
      @singer="toSinger"
      @collect="toCollected"
      :track="track"
      ref="playMore"
    ></play-more>
    <share-dialog ref="shareShow"></share-dialog>
    <set-ring ref="setRingShow"></set-ring>
    <more-singer ref="moreSingerShow" :singers="singers"></more-singer>
    <collection-to-list ref="collectedShow" @bulid="bulidlist"> </collection-to-list>
    <build-list v-if="isBuild" @cancel="cancel"></build-list>
    <my-cover :messages="messages" v-if="coverShow" @coverHide="coverHide"></my-cover>
  </div>
</template>

<script>
    import myHeader from '../header'
    import Message from './message'
    import List from './list'
    import playMore from '../playmore'
    import shareDialog from '../../common/sharedialog'
    import setRing from '../../common/setring'
    import moreSinger from '../../common/moresinger'
    import collectionToList from '../../common/collectiontolist'
    import buildList from '../../common/buildlist'
    import myCover from './cover'
    export default {
      name: 'songList.vue',
      components: {
        myHeader,
        Message,
        List,
        playMore,
        shareDialog,
        setRing,
        moreSinger,
        collectionToList,
        buildList,
        myCover
      },
      data () {
        return {
          scrollY: 0,
          scrollEvents: ['scroll'],
          pullUpLoad: true,
          track: {},
          tracks: [],
          messages: {},
          playlist: {},
          isMore: false,
          isBuild: false,
          visible: false,
          messTop: 0,
          title: '专辑',
          checked: false,
          allShow: false,
          complete: false,
          isSubscribed: false,
          id:'',
          songs:[],
          subCount:0,
          isSub:false,
          singers:[],
          coverShow:false
        }
      },
      computed: {
        options () {
          return {
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true,
            startY: 0
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
        this.getAlbums()
        this.getDyms()
      },
      methods: {
        getAlbums () {
          this.id = this.$route.params.id
          this.$api.albums.album(this.$route.params.id).then(res => {
            console.log(res.data)
            this.songs = res.data.songs
            this.messages = res.data.album
          })
        },
        getDyms () {
          this.$api.albums.albumdym(this.$route.params.id).then(res => {
            this.isSub = res.data.isSub
            this.subCount = res.data.subCount
          })
        },
        saveComment () {

        },
        scrollHandler ({ y }) {
           this.scrollY = -y
          this.messTop = this.$refs.messTop.getBoundingClientRect().top
              // 需要添加防抖节流
          if (this.messTop < 171) {
            this.title = this.messages.name
          } else {
            this.title = '专辑'
          }

          if (this.messTop > 280) {
                  // this.$refs.bgEnlarge.style.height = '100%'
            let scale = 1 + ((this.messTop - 280) / 320)
            this.$refs.Enlarge.style['transform'] = `scaleX(${scale})`
            this.$refs.bgEnlarge.style.height = 320 + this.messTop - 280 + 'px'
          } else {
            this.$refs.bgEnlarge.style.height = '320px'
                  // this.$refs.Enlarge.style['transform'].scale = 1
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
          this.track = this.songs[index]
          this.singers = this.songs[index].ar
          console.log(this.singers)
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
          if(this.allShow) return
          this.$refs.shareShow.show()
        },
        setRing () {
          this.$refs.setRingShow.show()
        },
        moreSinger () {
          this.$refs.moreSingerShow.show()
        },
            // 全选功能
        toCheck () {
          this.allShow = true
          // this.stickyTop()
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
        toUser () {
          if(this.allShow) return
          this.singers = this.messages.artists
          if(this.messages.artists.length > 1) {
            this.moreSinger()
            this.isMore = false
            return
          }

          this.$api.singers.singermusic(this.messages.artist.id).then(res => {
            if(res.data.artist.accountId) {
              this.accountId = res.data.artist.accountId
              let userId = this.accountId
              this.$router.push({
                path: `/singer/${userId}/${this.messages.artist.id}`
                })
            }else {
              let userId = 477726475
              this.$router.push({
                path: `/singer/${userId}/${this.messages.artist.id}`
                })
            }
          })
        },
        toSinger () {
          if(this.singers.length > 1) {
            this.moreSinger()
            this.isMore = false
            return
          }
          this.$api.singers.singermusic(this.track.ar[0].id).then(res => {
            if(res.data.artist.accountId) {
              this.accountId = res.data.artist.accountId
              let userId = this.accountId
              this.$router.push({
                path: `/singer/${userId}/${this.track.ar[0].id}`
                })
            }else {
              let userId = 477726475
              this.$router.push({
                path: `/singer/${userId}/${this.track.ar[0].id}`
                })
            }
          })
        },
        toComment () {
          if(this.allShow) return
          this.$router.push({
            path:`/albumcomment`,
            query: {
              album: JSON.stringify(this.messages)
            }
          })
        },
        toCollected () {
          this.isMore = false
          this.$refs.collectedShow.show()
        },
        bulidlist () {
          this.isBuild = true
          this.isMore = false
          // this.$refs.collectedShow.hide()
        },
        toCover () {
          this.coverShow = true
        },
        coverHide () {
          this.coverShow = false
        },
            // 收藏功能
        toSubscribed () {
          if (this.isSub) {
            this.$createDialog({
              type: 'confirm',
              title: '确定不再收藏该专辑？',
              zIndex:2001,
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
                this.$api.albums.subalbum(2, this.$route.params.id).then(res => {
                  if (res.status === 200) {
                    this.$createToast({
                      type: 'text',
                      time: 1000,
                      txt: '专辑已取消收藏'
                    }).show()
                    this.$refs.Sub.innerHTML--
                    this.isSub = false
                  }
                })
              }
            }).show()
          } else {
            this.$api.albums.subalbum(1, this.$route.params.id).then(res => {
              if (res.status === 200) {
                const toast = this.$createToast({
                  txt: '专辑已收藏',
                  type: 'correct',
                  time: 2000
                })
                toast.show()
                this.$refs.Sub.innerHTML++
                this.isSub = true
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
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

  .song-list
    background-color:white
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
      margin-top:30px
      margin-bottom:15px
      /*position: absolute*/
      /*top:50px*/
    .user-background
      position: absolute
      width: 100%
      height:320px
      top:0
      left:0
      z-index: 0
      opacity:1
      filter:brightness(.8) //调整背景暗度
      -webkit-filter:brightness(.8)//兼容不同浏览器
      -o-filter:brightness(.8)
      -moz-filter:brightness(.8)
      overflow: hidden //避免图片放大影响整体布局
      opacity: .9
      filter: blur(15px)
      img
        width: 100%
        height: 100% 
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
