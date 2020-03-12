<template>
  <div class="list-comment">
    <my-header class="header">
      <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
      <div slot="center" class="song-list">评论({{total}})</div>
      <div  slot="right" class="song-img">
        <i class="iconfont iconfenxiang" @click="share"></i>
        <span @click="music">
        <img src="../../user/img/login1.png" alt="" class="img">
      </span>
      </div>
    </my-header>


    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">
        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          @pulling-up="onPullingUp"
          :options="options"
          ref="contentScroll"
        >

          <div class="comment-message" @click.stop="toPlayDj">
            <follow-base>
              <div slot="left" class="comment-message-left">
                <img :src="information.radio.picUrl" alt="">
                <div class="playing"></div>
              </div>
              <div slot="top" class="comment-message-top">{{information.name}}</div>
              <div slot="bottom" class="comment-message-bottom">
                <div class="tag">{{information.radio.category}}</div>
                <div class="author" @click.stop="toDj(information.radio.id)">{{information.radio.name}}</div>
              </div>
              <i slot="rightShare" class="iconfont iconleft-arrow"></i>
            </follow-base>
          </div>

          <div class="pullloadtop" v-if="isLoading">
            <div>
                <span class="load">
                <i class="iconfont iconyinletiaodongzhuangtai"></i>
                <span> 正在加载...</span>
              </span>
            </div>
          </div>

          <div v-if="isLoadingText" class="pullload-top-text">还没有评论</div>

          <cube-sticky-ele ele-key="精彩评论" v-if="hotComments.length">
            <ul class="sticky-header">
              <li class="hot-comment-top">精彩评论</li>
            </ul>
          </cube-sticky-ele>
          
          <div ref="stickyHeight" v-if="hotComments.length">
            <ul class="hot-comment">
              <li v-for="(item,index) in hotComments" :key="item.commentId" ref="_liOffset" @click="_Reply(index)">
                <base-comment :item="item" class="base-comment" :hasReplyArr="ReplyArr"></base-comment>
              </li>
            </ul>
            <!-- <hot-comment :hotComments="hotComments"></hot-comment> -->
          </div>
          <cube-sticky-ele ele-key="最新评论">
            <ul class="sticky-header">
              <li class="comment-top">最新评论
                <span style="color:gray">{{comments.length}}</span>
              </li>
            </ul>
          </cube-sticky-ele>
          <ul class="new-comment">
            <li v-for="(newItem,index) in comments" :key="newItem.commentId" ref="liOffset" @click="Reply(index)">
              <base-comment :item="newItem" class="base-comment" :hasReplyArr="hasReplyArr"></base-comment>
            </li>
          </ul>

          <template slot="pullup" slot-scope="props">
            <div v-if="props.pullUpLoad" class="pull-load">
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

        <template slot="fixed" slot-scope="props">
          <ul class="sticky-header">
            <li>{{props.current}}</li>
          </ul>
        </template>

      </cube-sticky>
    </div>
    <div class="comment">
      <input type="text" :placeholder="placeholder" ref="Input" v-model="value">
      <div class="comment-icon">
        <i class="iconfont iconfanhuidingbu"></i>
        <i class="iconfont iconpinglun"></i>
      </div>
    </div>

    <reply-dialog ref="showDia" @reply="replyComment" @share="toShare"></reply-dialog>
    <radio-toast :item="information" :toasttype="mytype" ref="showToast"></radio-toast>
    <share-dialog ref="shareShow"></share-dialog>

  </div>
</template>

<script>
    import MyHeader from '../../../base/navbar/navbar'
    import followBase from '../../../base/swiper/followbase'
    import baseComment from '../../../base/basecomment/basecomment'
    import replyDialog from '../../common/replydialog'
    import radioToast from '../../common/toast'
    import shareDialog from '../../common/sharedialog'

    export default {
      name: 'djcomment.vue',
      components: {
        MyHeader,
        baseComment,
        replyDialog,
        followBase,
        radioToast,
        shareDialog
      },
      data () {
        return {
          total: 0,
          comments: [],
          hotComments: [],
          scrollY: 0,
          scrollEvents: ['scroll'],
          totals: 0,
          offset: 0,
          hasMore: true,
          moreHot: false,
          hasReplyArr: [],
          ReplyArr: [],
          placeholder: '千头万绪，落笔汇成评论一句',
          value: '',
          user: '',
          commentId: -1,
          threadId: '',
          information: {},
          isLoading: true,
          isLoadingText: false,
          mytype: 'dj'
        }
      },
      props: {},
      created () {
        this.getComment(JSON.parse(this.$route.query.dj).id, this.offset, 20)
        this.Album()
        // this.Loading()
      },
      computed: {
        options () {
          if (this.comments.length) {
            return {
              pullUpLoad: true,
              scrollbar: true,
              click: false // 解决触发两次点击事件的bug
            }
          } else {
            return {
              pullUpLoad: false,
              scrollbar: true,
              click: false // 解决触发两次点击事件的bug
            }
          }
        }
      },
      methods: {
        getComment (id, offset, limit) {
          this.$api.radios.comments(id, offset, limit).then(res => {
            this.hasMore = res.data.more
            this.moreHot = res.data.moreHot !== 'undefined' ? res.data.moreHot : 'undefined'
            this.total = res.data.total
            if (this.hasMore) {
              this.offset += 20
              this.comments = this.comments.concat(res.data.comments)
              this.hasReplyArr = this.comments.slice().filter(item => {
                return item.parentCommentId !== 0
              })
            } else {
              this.comments = res.data.comments
              this.hasReplyArr = this.comments.filter(item => {
                return item.parentCommentId !== 0
              })
            }
            if (this.moreHot === true) {
              this.hotComments = this.hotComments.concat(res.data.hotComments)
    
              this.ReplyArr = this.hotComments.filter(item => {
                return item.parentCommentId !== 0
              })
            } else if (this.moreHot === false) {
              this.hotComments = res.data.hotComments !== 'undefined' ? res.data.hotComments : 'undefined'
              if (this.hotComments) {
                this.ReplyArr = this.hotComments.slice().filter(item => {
                  return item.parentCommentId !== 0
                })
              }
            }

            if (res.data.comments.length >= 1) {
              setTimeout(() => {
                this.isLoading = false
                this.isLoadingText = false
              }, 1000)
            } else {
              setTimeout(() => {
                this.isLoading = false
                this.isLoadingText = true
                this.Input()
              }, 1000)
            }
          })
        },
        toBack () {
        //   this.$router.beforeEach((to, from, next) => {
        //     from.meta.keepAlive = true
        //     next()
        //  })
          this.$router.go(-1)
        },
        share () {

        },
        music () {

        },
        scrollHandler ({ y }) {
          this.scrollY = -y
        },
        onPullingUp () {
          if (!this.hasMore) return
          setTimeout(() => {
            this.getComment(JSON.parse(this.$route.query.dj).id, this.offset, 20)
            const contentScroll = this.$refs.contentScroll
            contentScroll.forceUpdate()
          }, 1000)
        },
        toPlayDj () {
          this.$refs.showToast.show()
        },
        toDj (id) {
          this.$router.push({
            path: `/radiolist/${id}`
          })
        },
        Album () {
          this.information = JSON.parse(this.$route.query.dj)
          console.log(this.information)
        },
        Reply (index) {
          let proup = document.getElementsByClassName('cube-popup-content')[0],
            liTop = this.$refs.liOffset[index].getBoundingClientRect().top,
            Hei = this.$refs.liOffset[index].offsetHeight
          if (liTop < 144) {
            let _liTop = liTop + Hei
            proup.style.top = -(667 - _liTop - 30) + 'px'
          } else {
            proup.style.top = -(667 - liTop + 30) + 'px'
          }

          this.$refs.showDia.show()
          if (liTop < 144) {
            this.$refs.showDia.diaTopChange()
          } else {
            this.$refs.showDia._diaTopChange()
          }
          this.user = this.comments[index].user.nickname
          this.commentId = this.comments[index].commentId
          console.log(this.threadId, this.commentId)
        },
        _Reply (index) {
          let proup = document.getElementsByClassName('cube-popup-content')[0],
            liTop = this.$refs._liOffset[index].getBoundingClientRect().top,
            Hei = this.$refs._liOffset[index].offsetHeight
          if (liTop < 144) {
            let _liTop = liTop + Hei
            proup.style.top = -(667 - _liTop - 30) + 'px'
          } else {
            proup.style.top = -(667 - liTop + 30) + 'px'
          }

          this.$refs.showDia.show()
          if (liTop < 144) {
            this.$refs.showDia.diaTopChange()
          } else {
            this.$refs.showDia._diaTopChange()
          }
          this.user = this.hotComments[index].user.nickname
          this.commentId = this.hotComments[index].commentId
          console.log(this.threadId, this.commentId)
        },
        replyComment () {
          this.value = ''
          this.placeholder = '回复' + this.user + ':'
          this.Input()
        },
        Input () {
          this.$refs.Input.focus()
        },
        replyUser () {
          this.$api.commentFeature.dynamicReply(this.threadId, this.commentId, content).then(res => {
            console.log(res)
          })
        },
        input () {
          console.log(this.value.length)
        },
        toShare () {
          this.$refs.shareShow.show()
        }
      },
      beforeMount () {
        this.$nextTick(() => {
          // let hei = document.getElementsByClassName('hot-comment')[0]
          // let myColor= getComputedStyle(hei).height
          // this.$refs.stickyHeight.style.height = myColor +'px'
          // this.$refs.scrollCube.refresh()

          // this.$refs.stickyHeight.style.height = 300 + 'px'
          // // console.log(this.totals)
          // this.$refs.contentScroll.refresh()
        })
      },
      mounted () {
          // this.$nextTick(() => {
        //     this.getHeight ()
          // })
      }
      // beforeRouteLeave(to,from,next){
      //   if(to.name == 'radiolist'){
      //       to.meta.keepAlive = true
      //       console.log('缓存本组件')
      //   }else{
      //       to.meta.keepAlive = false
      //   }
      //   next()
      // }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
.list-comment
  height:667px
  width:375px
  .header
    font-size:$font-size-large
    background-color:white
    font-weight:bold
    .song-list
      overflow:hidden
    .song-img
      flex-center()
      i
        margin-right:20px
        font-size:$font-size-large-x
      span
        width:30px
        height:30px
        background-color:gray
        flex-center()
        border-radius:50%
        .img
          width:26px
          height:26px
          border-radius:50%

  .comment
    position:fixed
    bottom:0
    height:42px
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
      width:60px
      display:flex
      font-size:$font-size-large-x
      i
        width:100%
        height:100%
        margin-top:13px
        margin-right:10px





  .sticky-view-container
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    .sticky-header
      font-size:$font-size-medium
      /*margin:10px auto*/
      padding-left:10px
      height:25px
      background-color:white
      .hot-comment-top
        font-size:$font-size-medium
        margin-left:10px
        margin-top:15px
        /*padding:10px 0*/
      .comment-top
        font-size:$font-size-medium
        margin-left:10px
        padding:10px 0
    .cube-sticky
       width:100%
      .pull-load
        width:100%
        height:50px
        margin-top:1px
        background-color:white
        position:relative
        bottom:0
        flex-center()
      .load
        font-size:$font-size-medium
        i
          color:red
        span
          color:gray

        .cube-scroll-wrapper
          background-color: #fff

    .cube-sticky-fixed
      .sticky-header
        /*margin: 0 10px*/
        font-size:$font-size-medium
        background-color:white
        height:25px

    .cube-sticky
      .cube-scroll-wrapper
        background-color: #fff
        width:375px
        .cube-scroll-list-wrapper
          .comment-message
            border-bottom:7px solid rgba(128,128,128,.1)
            .comment-message-left
              position:relative
              height:65px
              width:65px
              img
                height:65px
                width:65px
                border-radius:5px
                position:absolute
                top:0
                left:0
              .playing
                position:absolute
                right:5px
                bottom:5px
                height:18px
                width:18px
                border-radius:50%
                background-color:rgba(255,255,255,.7) 
              .playing:after
                position:absolute
                left:7px
                top:3px
                content: '';
                width: 0;
                height: 0;
                opacity: 0.8;
                border-left: 6px solid red
                border-right: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-top: 6px solid transparent;
          .comment-message-top
            max-width:230px
            ellipsis() 
          .comment-message-bottom
            display:flex
            .tag
              height:10px
              width:auto
              padding:2px
              border:1px solid red
              border-radius:2px
              color:red
              flex-center()
              margin-top:4px
              margin-right:5px
            .author
              max-width:180px
              ellipsis() 
              color:rgb(31,113,192) 


          .hot-comment
            margin:auto 10px
          .new-comment
            margin:15px 10px
            padding-bottom:10px

  //上方加载中相关样式
  .pullloadtop
    width:100%
    height:100%
    position: absolute
    top:90px
    left:0
    bottom:0
    z-index: 10000
    // flex-center()
    background-color:white
    display:flex
    margin-top:-10px
    div
      position:absolute
      top:100px
      left:150px
      .load
        font-size:$font-size-medium-x 
        i
          color:red
        span
          color:gray  

  .pullload-top-text
    width:100%
    height:50px
    text-align:center
    font-size:$font-size-medium
    color:gray
    position: absolute
    top:180px
    z-index: 10000

</style>
