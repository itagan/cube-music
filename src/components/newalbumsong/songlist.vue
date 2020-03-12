<template>
  <div class="song-list">

    <!-- <div class="song-list-background">
      <img width="100%" height="300px" src="">
    </div> -->


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
          <div class="song-list-background" ref="bgEnlarge">
            <img width="100%" height="100%" src="./img/news.jpeg" ref="Enlarge">
          </div>

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
              <li class="play-select">
                <i class="iconfont icontuozhuai"></i>
                <span>多选</span>
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

        </cube-scroll>
      </cube-sticky>
    </div>

    <!-- <play-more
      v-if="isMore"
      @cancel="cancelMore"
      @build="moreBuildList"
      @share="toShare"
      @ring="setRing"
      :track="track"
      ref="playMore"
    ></play-more>
    <share-dialog ref="shareShow"></share-dialog>
    <set-ring ref="setRingShow"></set-ring> -->
  </div>
</template>

<script>
    import List from './list'
    // import playMore from './playmore'
    // import shareDialog from '../common/sharedialog'
    // import setRing from '../common/setring'
    export default {
      name: 'songList.vue',
      components: {
        List
        // playMore,
        // shareDialog,
        // setRing
      },
      props: {
        type: {
          type: Number,
          default: 0
        }
      },
      data () {
        return {
          scrollY: 0,
          scrollEvents: ['scroll'],
          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          pullUpLoadMoreTxt: '加载中…………',
          pullUpLoadNoMoreTxt: '没有更多数据了~',
          track: {},
          tracks: [],
          messTop: 0,
          checked: false,
          allShow: false,
          complete: false
        }
      },
      computed: {
        options () {
          return {
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true,
            startY: -40
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
        this.getList(this.type)
      },
      methods: {
        getList (type) {
          this.$api.musics.newmusic(type).then(res => {
            // console.log(res.data)
            this.tracks = res.data.data
          })
        },
        saveComment () {

        },
        scrollHandler ({ y }) {
          this.scrollY = -y
          this.messTop = this.$refs.messTop.getBoundingClientRect().top
            // console.log(this.messTop)
          if (this.messTop > 204 && this.messTop < 244) {
            let scale = 1 + ((this.messTop - 204) / 200)
            this.$refs.Enlarge.style['transform'] = `scaleX(${scale})`
          }
          this.$refs.bgEnlarge.style.height = '200px'
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
    background-color:white
    height:567px  //必须设置高度，否则遮罩弹出层异常
    width:375px
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
    position: relative
    top: 30px
    bottom: 0
    left: 0
    width: 375px
    height:567px
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
      margin-top:-15px
      width:375px
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
      .play-select
        font-size:$font-size-small
        display:flex
        height:35px
        margin-right:15px
        line-height:35px
      .complete
        height:100%
        width:50px
        line-height:50px
        color:red

    /*.cube-sticky*/
      /*padding: 0 10px*/
    .scroll-ele
      -webkit-overflow-scrolling: touch //滚动回弹效果


  .sticky-view-container
    .song-list-background
      width: 375px
      height:180px
      opacity:1
      filter:brightness(.6) //调整背景暗度
      -webkit-filter:brightness(.6)//兼容不同浏览器
      -o-filter:brightness(.6)
      -moz-filter:brightness(.6)
      overflow: hidden //避免图片放大影响整体布局
      img
        width: 100%
        height: 100%

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



</style>
