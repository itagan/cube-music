<template>
  <div class="wraps">
    <base-player :detail="detail" :videoUrl="videoUrl" ref="video"></base-player>
    <transition name="fade-video" class="fadeVideo">

      <div v-if="!this.detail.videoGroup" class="pullloadtop">
       <span class="load">
          <i class="iconfont iconyinletiaodongzhuangtai"></i>
          <span> 正在加载...</span>
       </span>
      </div>

      <div class="sticky-view-container" v-show="allshow" v-else>
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
            <div class="title" ref="titleHeight">
              <div class="titleTop">
                <span>{{detail.title}}</span>
                <i class="iconfont" :class="icon" @click.stop="toggle()"></i>
              </div>

              <div class="titleCenter" ref="setHeight">
                <span class="numbers">{{detail.playTime}}次观看</span>

                <span class="label" v-for="item in detail.videoGroup" :key="detail.videoGroup.id">{{item.name}}</span>

              </div>

              <div class="titleTime" v-if="descshow">
                <span>发布：{{detail.publishTime}}</span>
                <span class="titledesc">{{detail.description}}</span>
              </div>
              <ul class="titleBottom">
                <li @click.stop="praisedCount(detail)" ref="praise" :class="colorToggle">
                  <i class="iconfont iconzan1"></i>
                  <span ref="Count">{{detail.praisedCount}}</span>
                </li>
                <li @click.stop="toSubscribed(detail)" ref="sub">
                  <i class="iconfont" :class="iconSubscribed"></i>
                  <span ref="Sub">{{detail.subscribeCount}}</span>
                </li>
                <li>
                  <i class="iconfont iconpinglun" @click="toComment"></i>
                  <span>{{detail.commentCount}}</span>
                </li>
                <li>
                  <i class="iconfont iconfenxiang"></i>
                  <span>{{detail.shareCount}}</span>
                </li>
              </ul>
            </div>

            <cube-sticky-ele>
              <ul class="sticky-header">
                <li>
                  <img :src="detail.avatarUrl" class="imgHeader">
                  <span>
                    {{detail.creator.nickname}}
                  </span>
                </li>

                <li class="follow">
                  <i class="iconfont iconjia"></i>
                  关注
                </li>
              </ul>
            </cube-sticky-ele>


            <recommend-swiper @select="recommendvideo" :detail="detail" @swipeNum="swipeNum" ref="getNum"></recommend-swiper>
            <comment :detail="detail" @allHot="allhotshow" ref="tohere" class="here" @showDialog="showDialog"></comment>
            <new-comment :detail="detail" @Limits="newlimits" :limits="limits" @showDialog="showDialog"></new-comment>

            <template slot="pullup" slot-scope="props">
              <div v-if="props.pullUpLoad" class="pullload">
                <template v-if="loadisshow">
                <span v-if="props.isPullUpLoad" class="load">
                   <i class="iconfont iconyinletiaodongzhuangtai"></i>
                  <span> 加载中...</span>
                </span>
                  <span v-else>更新成功</span>
                </template>
              </div>
            </template>

          </cube-scroll>
        </cube-sticky>
      </div>
    </transition>

    <hot-comment :detail="detail" ref="allhotcomment" @pageshow="isshow" @showDialog="showDialog"></hot-comment>

    <div class="comment" v-if="commit">
       <input type="text" :placeholder="placeholder" ref="Input" v-model="value" @input="input">
      <div @click="tagBacktop">
        <i class="iconfont iconfanhuidingbu" v-if="totop"></i>
        <span v-else class="liuyan">
          <i class="iconfont iconpinglun"></i>
          <span>{{detail.commentCount}}</span>
        </span>
      </div>
    </div>

     <reply-dialog ref="showDia" @reply="replyComment"></reply-dialog>
  </div>
</template>


<script type="text/ecmascript-6">
    import { deleteCollectVideo, saveOperation, deleteOperation, loadOperation } from '../../common/js/goodstorage'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {serializeNumber} from '../../assets/js/number'
    import {timestamp, durationsTransformation} from '../../assets/js/timestamp'
    import basePlayer from '../../base/video/baseplayer'
    import recommendSwiper from '../../base/swiper/recommendSwiper'
    import Comment from './comment'
    import newComment from './newcomment'
    import hotComment from './hotcomment'
    import replyDialog from '../common/replydialog'

export default {
      inject: ['reload'],
      data () {
        return {
          scrollY: 0,
          detail: {},
          videoUrl: '',
          show: true,
          descshow: false, // 是否显示描述
          allshow: true, // 是否显示全部精彩评论
          commit: true, // 是否显示底部评论功能
          totop: false, // 右下角回到顶部功能
          scrollEvents: ['scroll', 'before-scroll-start'],
          pullUpLoad: true,
          pullUpLoadThreshold: 0,
          pullUpLoadMoreTxt: '加载中…………',
          pullUpLoadNoMoreTxt: '没有更多数据了~',
          loadisshow: false, // 上拉加载是否显示,数据全部加载完则不显示了
          limits: 20, // 传给子组件需要显示的评论数量
          swipeHeight: 0, // 子组件recommentswiper的高度
          titleHeight: 35, // 标题高度
          timerOne: null,
          timerTwo: null,
          timerThree: null,
          isSubscribed: false,
          isPraised: false,
          redColor: 'redColor',
          praisedCounts: 0,
          placeholder: '发表评论',
          user: '',
          commentId: -1,
          threadId: '',
          value: ''
        }
      },
      components: {
        recommendSwiper,
        Comment,
        newComment,
        hotComment,
        basePlayer,
        replyDialog
      },
      computed: {
        icon () {
          return this.show ? 'iconshixinxiasanjiao' : 'iconshangsanjiao'
        },
        iconSubscribed () {
          return this.isSubscribed ? 'iconshoucangchenggong' : 'iconshoucang'
        },
        colorToggle () {
          return this.isPraised === true ? 'redColor' : ''
        },
        ...mapGetters([
          'limit',
          'back',
          'currentVideo',
          'operation'
        ]),
        Operation () {
          return this.operation
        },
        CurrentVideo () {
          return this.currentVideo
        },
        Back () {
          return this.back
        },
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

      created () {
        this.getVideoUrl()
        this.getVideo()
        this.defaultOperation()
      },
      watch: {
        CurrentVideo () {
          this.getVideoUrl()
          this.getVideo()
          // this.defaultOperation()
        },
        Back (newBack) {
          this.$nextTick(() => {
            if (newBack) {
              this.commentTop()
            } else {
              this.backtop()
            }
          })
        },
        Operation (newOperation) {
            // this.defaultOperation()

          if (newOperation[0].id === this.currentVideo[0].vid) {
            if (newOperation[0].isPraised) {
              this.$refs.praise.classList.add('redColor')
              this.$refs.Count.innerHTML++
              console.log('详情加')
            } else {
              this.$refs.praise.classList.remove('redColor')
              this.$refs.Count.innerHTML--
              console.log('详情减')
            }
          }
        }
      },
      methods: {
        scrollHandler ({ y }) {
          this.scrollY = -y
          let heights = this.titleHeight + this.swipeHeight + 45 - 328
          this.totop = this.scrollY > heights
        },
        scrollStartHandler () {
          this.getHeight()
        },
        onPullingUp () {
                // 滚动上拉加载的时候派发事件给子组件：告知limit新数据
          this.limits = this.limit + +10
        },
        newlimits (has) {
          if (has) {
            this.loadisshow = true
            this.$refs.scroll.forceUpdate()
                // 再把新数据设置到vuex
            this.setLimit(this.limits)
          } else {
            this.$refs.scroll.forceUpdate()
                // 决定上拉加载效果是否显示出来
            this.loadisshow = false
          }
        },
        getVideo () {
          this.$api.video.video(this.currentVideo[0].vid).then(res => {
            this.detail = res.data.data
            this.detail.playTime = serializeNumber(res.data.data.playTime)
            this.detail.publishTime = timestamp(this.detail.publishTime)
            this.detail.durationms = durationsTransformation(this.detail.durationms)
          })
        },
            // 获取播放地址
        getVideoUrl () {
          this.$api.video.videourl(this.currentVideo[0].vid).then(res => {
            this.videoUrl = res.data.urls[0].url
          })
        },
        // 加载页面时判断是否操作过如点赞
        defaultOperation () {
          this.isSubscribed = this.currentVideo[0].subscribed
          if (this.operation.length && this.operation[0].id === this.currentVideo[0].vid) {
            this.isPraised = this.operation[0].isPraised
          } else {
            this.isPraised = this.currentVideo[0].praised
            console.log('该我了')
          }
          // this.isPraised = this.operation[0].isPraised
        },
            // 展开还是隐藏视频描述等
        toggle () {
          if (this.show) {
            this.show = false
            this.descshow = true
            this.$refs.setHeight.style.height = 'auto'
          } else {
            this.show = true
            this.descshow = false
            this.$refs.setHeight.style.height = '35px'
          }
        },
        recommendvideo (vid) {
          this.getVideo()
          this.getVideoUrl()
          this.reload() // 刷新本页面
            // this.$nextTick( this.getVideo())
            // 把vuex的数据还原
          this.setLimit(20)
          this.limits = 20
          this.setCommentBack(false)
            // 刷新后重置
          this.show = true
          this.descshow = false
          this.$refs.setHeight.style.height = '35px'
        },
            // 显示全部精彩评论
        allhotshow () {
          this.$refs.allhotcomment.show()
          setTimeout(() => {
            this.$refs.allhotcomment.getHotComment()
            this.commit = false
            this.allshow = false
          }, 300)
        },
            // 子组件提醒父组件
        isshow () {
          this.commit = true
          this.allshow = true
        },
          // 点击评论图标
        toComment () {
          this.commentTop()
        },
            // 评论返回顶部
        backtop () {
          this.$refs.scroll.scrollTo(0, 0, 200)
            // this.$refs.scroll.scrollToElement('.title', 200);其它方式，除了css还可以ref引用this.$refs.tohere
        },
            // 评论区上升
        commentTop () {
          this.$nextTick(() => {
            this.$refs.scroll.scrollToElement('.here', 200, 0, -50)
              // this.$refs.video.currentTime = this.currentVideo[0]._currentTime
              // this.$refs.video.currentTime.play()
          })
        },
        tagBacktop () {
          let heights = this.titleHeight + this.swipeHeight + 45 - 323
          if (this.scrollY > heights) {
            this.backtop()
                    // this.commentTop()
          } else {
            this.commentTop()
          }
        },
            // 子组件通知父组件swipe数量并得出该组件高度
        swipeNum (num) {
          this.swipeHeight = 15 + num * 60 + num * 10
        },
            // 获取高度
        getHeight () {
          this.$refs.getNum.getLength()
          this.titleHeight = this.$refs.titleHeight.offsetHeight // 标题class.title高度
        },
            // 某些时候打开本页面需要评论区提前展示
        commentBack () {
                // 从vuex拿数据决定是否提前展示
          if (this.back) {
            this.commentTop()
          }
        },
        updateTime (e) {
          this.currentTime = e.target.currentTime
        },
        praisedCount (detail) {
          if (this.operation.length && this.operation[0].id === detail.vid) {
            this.isPraised = this.operation[0].isPraised
          } else {
            this.isPraised = this.currentVideo[0].praised
            console.log('还不存在')
          }
          // this.isPraised = this.operation[0].isPraised

          let obj = {}
          obj.id = detail.vid
          obj.isSubscribed = detail.subscribed
          obj.followed = detail.creator.followed

          if (this.isPraised) {
            this.$api.likes.isLike(0, 5, detail.vid).then(res => {
              if (res.data.code === 200) {
                      // this.$refs.praise.classList.remove('redColor')
                      // this.$refs.Count.innerHTML--
                obj.isPraised = false
                      // saveOperation(obj)
                this.saveOperationList(obj)
                this.isPraised = false
              }
            })
          } else {
            this.$api.likes.isLike(1, 5, detail.vid).then(res => {
              if (res.data.code === 200) {
                      // this.$refs.praise.classList.add('redColor')
                      // this.$refs.Count.innerHTML++
                obj.isPraised = true
                      // saveOperation(obj)
                this.saveOperationList(obj)
                this.isPraised = true
              }
            })
          }
        },
        toSubscribed (detail) {
          if (this.isSubscribed) {
            this.$createDialog({
              type: 'confirm',
              title: '确定不再收藏该视频？',
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
                this.$api.subs.isVideoSub(0, detail.vid).then(res => {
                  if (res.status === 200) {
                    this.$createToast({
                      type: 'text',
                      time: 1000,
                      txt: '视频已取消收藏'
                    }).show()
                    this.$refs.Sub.innerHTML--
                    this.isSubscribed = false
                    this.deleteVideoCollectionsList(detail)
                  }
                })
              }
            }).show()
          } else {
            this.$api.subs.isVideoSub(1, detail.vid).then(res => {
              if (res.status === 200) {
                const toast = this.$createToast({
                  txt: '视频已收藏',
                  type: 'correct',
                  time: 2000
                })
                toast.show()
                this.$refs.Sub.innerHTML++
                this.isSubscribed = true
                this.saveVideoCollectionsList(detail)
              }
            })
          }
        },
        showDialog (liTop, user, commentId, threadId) {
          this.$refs.showDia.show()
          if (liTop < 350) {
            this.$refs.showDia.diaTopChange()
          } else {
            this.$refs.showDia._diaTopChange()
          }
          this.user = user
          this.threadId = threadId
          this.commentId = commentId
          // console.log(user,commentId,threadId)
        },
        replyComment () {
          this.placeholder = '回复' + this.user + ':'
          this.Input()
        },
        Input () {
          this.$refs.Input.focus()
        },
        replyUser () {
          this.$api.commentFeature.dynamicReply(threadId, commentId, content).then(res => {
            console.log(res)
          })
        },
        input () {
          console.log(this.value.length)
        },
        ...mapMutations({
          setLimit: 'SET_LIMIT',
          setCommentBack: 'SET_BACK'
        }),
        ...mapActions([
          'saveOperationList',
          'saveVideoCollectionsList',
          'deleteVideoCollectionsList'
        ])
      },
      mounted () {
            // 确保DOM结构渲染完成才能滚动。延时确保滚动结构距离正常
        this.$nextTick(() => {
          setTimeout(() => {
            this.commentBack()
              // this.$refs.Count.innerHTML =  this.currentVideo[0].praisedCount

            this.$refs.video.currentTime = this.currentVideo[0]._currentTime
          }, 1000)
        })
      },
      destroyed () {
            // 销毁本页面时候，把vuex的一些重置
        this.setCommentBack(false)
        // this.deleteCollectVideo()
        // this.deleteOperationList()
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

    .sticky-view-container
      position: absolute
      top: 218px
      bottom: 0
      left: 0
      width: 100%
      font-size:$font-size-medium
      .sticky-header
        flex-between()
        height:45px
        background-color:white
        position:relative
        .imgHeader
          height:30px
          width:30px
          border-radius:50%
          margin-top:-15px
          position:absolute
          top:50%
        span
          height:45px
          line-height:45px
          margin-left:35px
          font-size:$font-size-small
        .follow
          width:65px
          height:25px
          background-color:red
          border-radius:15px
          line-height:25px
          text-align:center
          color:white
          font-size:$font-size-small
      .cube-sticky
        padding: 0 10px
      .scroll-ele
        /*height: 100%*/
        /*overflow: auto*/
        -webkit-overflow-scrolling: touch //滚动回弹效果
        .title
          margin: auto
          background-color:white
          padding-bottom:3px
          margin-bottom:1px
          .titleTop
            padding-top:10px
            flex-between()
            span
              font-size:$font-size-medium-x
              word-break:wrap
              margin-right:10px
              line-height:1.2
            i
              position:relative
              top:-5px
          .titleCenter
            font-size:$font-size-small-s
            margin-top:5px
            /*flex-between()*/
            display:flex
            flex-wrap:wrap
            height:35px
            overflow:hidden
            /*position:relative*/
            .numbers
              color:#a9a9a9
              margin-right:10px
              margin-top:10px
              padding:3px
            .label
              height:12px
              border-radius:5px
              background-color:#dcdcdc
              color:#696969
              padding:3px 5px
              margin-left:10px
              position:relative  //解决margin-lft的影响
              left:-10px //结合相对定位，这里相对自身
              margin-top:10px
              min-width:5px
          .titleTime
            font-size:$font-size-small-s
            display: flex
            justify-content: center
            flex-direction: column
            margin-top:15px
            /*position:relative*/
            .labels
              //flex-between()
              display:flex
              flex-wrap:wrap
              margin:15px 0
              font-size:$font-size-small-s
              position:relative
              left:-10px
              .label
                height:12px
                border-radius:5px
                background-color:#dcdcdc
                color:#696969
                padding:3px
                margin: 5px 0
                margin-left:10px
            .titledesc
              display:block
              line-height:1.2
              padding-right:10px
              margin-top:8px

          .titleBottom
            flex-between()
            margin:5px
            li
              flex-center(column)
              color:#696969
              i
                font-size:$font-size-large-x
              span
                margin-top:3px
                font-size:$font-size-small-s

      //磁贴后样式
      .cube-sticky-fixed
        .sticky-header
          //flex-between()
          margin:auto 10px

    .comment
      position:fixed
      bottom:0
      height:40px
      width:100%
      background-color:white
      z-index:2002
      border-top:1px solid #dcdcdc
      font-size:$font-size-medium
      flex-between()
      input
        height 100%
        flex:1
        margin-left:10px
        border: 0
        outline: none
        background-color: rgba(0, 0, 0, 0)
      div
        height: 100%
        width:40px
        flex-center()
        font-size:$font-size-large-x
        .liuyan
          position:relative
          i
            flex-center()
            width:100%
            height:100%
          span
            position:absolute
            bottom:15px
            right:-0px
            font-size:$font-size-small-ss


    //上拉加载中相关样式
    .pullload
      width:100%
      height:50px
      margin-top:1px
      background-color:white
      position:relative
      bottom:50px
      flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray

    //上方加载中相关样式
    .pullloadtop
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
  .redColor
    color: red !important
</style>


