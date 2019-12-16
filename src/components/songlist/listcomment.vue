<template>
  <div class="list-comment">
    <my-header class="header">
      <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
      <div slot="center" class="song-list">评论({{total}})</div>
      <div  slot="right" class="song-img">
        <i class="iconfont iconfenxiang" @click="share"></i>
        <span @click="music">
        <img src="../user/img/login1.png" alt="" class="img">
      </span>
      </div>
    </my-header>

    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY" @diff-change="diffChange">
        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          ref="scrollCube"
        >
          <ul class="comment-message">
            <li>
              <song-list-comment></song-list-comment>
            </li>
          </ul>
          <cube-sticky-ele ele-key="精彩评论">
            <ul class="sticky-header">
              <li class="hot-comment-top">精彩评论</li>
            </ul>
          </cube-sticky-ele>
<!--          <ul style="height: 300px" class="hot-comment" ref="stickyHeight">-->
          <div ref="stickyHeight">
            <ul class="hot-comment" ref="ulHeight">
              <li v-for="item in hotComments" :key="item.commentId">
                <base-comment :item="item"></base-comment>
              </li>
            </ul>
          </div>
          <cube-sticky-ele ele-key="最新评论">
            <ul class="sticky-header">
              <li class="comment-top">最新评论</li>
            </ul>
          </cube-sticky-ele>
          <ul class="new-comment">
            <li v-for="newItem in comments" :key="newItem.commentId">
              <base-comment :item="newItem"></base-comment>
            </li>
          </ul>
        </cube-scroll>
        <template slot="fixed" slot-scope="props">
          <ul class="sticky-header">
            <li>{{props.current}}</li>
          </ul>
        </template>
      </cube-sticky>
    </div>

    <div class="comment">
      <input type="text" placeholder="这一次也许就是你上热评了">
      <div class="comment-icon">
        <i class="iconfont iconfanhuidingbu"></i>
        <i class="iconfont iconpinglun"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    import songListComment from "../../base/swiper/songlistcomment"
    import baseComment from "../../base/basecomment/basecomment"
    import {timestampOther} from '../../assets/js/timestamp'

    export default {
        name: "listComment.vue",
        components: {
          MyHeader,
          songListComment,
          baseComment
        },
        data () {
          return {
              total:0,
              comments:[],
              hotComments:[],
              scrollY: 0,
              scrollEvents: ['scroll'],
              pullUpLoad: true,
              pullUpLoadThreshold: 0,
              pullUpLoadMoreTxt: '加载中…………',
              pullUpLoadNoMoreTxt: '没有更多数据了~',
              totals:0
          }
        },
        props: {
          id:{
            type:Number,
            default:2410346874
          }
        },
        created() {
            this.getComment()
            this.getHeight()
        },
        computed: {
          options () {
              return {
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: true,
                startY:0
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
        methods: {
          getComment () {
              this.$api.songLists.songListComment().then(res => {
                  console.log(res.data)
                  this.total = res.data.total
                  this.comments = res.data.comments
                  this.hotComments = res.data.hotComments
                  for (let i = 0; i < this.comments.length; i++) {
                      this.comments[i].time = timestampOther(this.comments[i].time)
                  }
                  this.totals = res.data.hotComments.length
                  // console.log(this.totals)
                  for (let i = 0; i < this.hotComments.length; i++) {
                      this.hotComments[i].time = timestampOther(this.hotComments[i].time)

                  }
              })
          },
          toBack () {
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

          },
          diffChange () {

          },
          getHeight () {
              console.log(this.totals)
          }
        },
        beforeMount() {
            this.$nextTick(() => {
                // let hei = document.getElementsByClassName('hot-comment')[0]
                // let myColor= getComputedStyle(hei).height
                // this.$refs.stickyHeight.style.height = myColor +'px'
                // this.$refs.scrollCube.refresh()

                this.$refs.stickyHeight.style.height = 300 + 'px'
                // console.log(this.totals)
                this.$refs.scrollCube.refresh()
            })
        },
        mounted() {
            // this.$nextTick(() => {
            //     this.getHeight ()
            // })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
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
      width:60px
      display:flex
      font-size:$font-size-large-x
      i
        width:100%
        height:100%
        margin-top:13px
        margin-right:10px






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


  .sticky-view-container
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    .sticky-header
      font-size:$font-size-medium
      margin:10px auto
      height:25px
      .hot-comment-top
        font-size:$font-size-medium
        margin-left:10px
        /*padding:10px 0*/
      .comment-top
        font-size:$font-size-medium
        margin-left:10px
        /*padding:10px 0*/
    .cube-sticky
      .comment-message
        border-bottom:7px solid rgba(128,128,128,.1)
      .cube-scroll-wrapper
        background-color: #fff
        .hot-comment
          margin:auto 10px
        .new-comment
          margin:auto 10px
    .cube-sticky-fixed
      .sticky-header
        margin: 0 10px
        font-size:$font-size-medium
        background-color:white
        height:25px

</style>
