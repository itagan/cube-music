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
      <cube-sticky :pos="scrollY">
        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          @pulling-up="onPullingUp"
          :options="options"
          ref="contentScroll"
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
                <base-comment :item="item" class="base-comment"></base-comment>
              </li>
            </ul>
          </div>
          <cube-sticky-ele ele-key="最新评论">
            <ul class="sticky-header">
              <li class="comment-top">最新评论</li>
            </ul>
          </cube-sticky-ele>
          <ul class="new-comment">
            <li v-for="(newItem,index) in comments" :key="index">
              <base-comment :item="newItem" class="base-comment"></base-comment>
            </li>
          </ul>


          <template slot="pullup" slot-scope="props">
            <div v-if="props.pullUpLoad" class="pull-load">
              <template>
              <span v-if="props.isPullUpLoad" class="load">
                 <i class="iconfont iconyinletiaodongzhuangtai"></i>
                <span> 加载中...</span>
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
            totals:0,
            options: {
              pullUpLoad: true,
              scrollbar: true,
              click: false // 解决点击事件被触发两次的问题
            },
            secondStop: 0,
            pullDownY: 0,
            offset:0,
            hasMore:true,
            moreHot:false
          }
        },
        props: {
          id:{
            type:Number,
            default:705123491
          }
        },
        created() {
          this.getComment(705123491,this.offset)
        },
        methods: {
          getComment (id,offset) {
            this.$api.songLists.songListComment(id,offset).then(res => {
              this.hasMore = res.data.more
              this.moreHot = res.data.moreHot !== 'undefined' ? res.data.moreHot : 'undefined'
              this.total = res.data.total
              if(this.hasMore) {
                this.offset++
                this.comments = this.comments.concat(res.data.comments)
                for (let i = 0; i < this.comments.length; i++) {
                  this.comments[i].time = timestampOther(this.comments[i].time)
                }
              }else {
                this.comments = res.data.comments
              }
              if(this.moreHot === true) {
                this.hotComments = this.hotComments.concat(res.data.hotComments)
                for (let i = 0; i < this.hotComments.length; i++) {
                  this.hotComments[i].time = timestampOther(this.hotComments[i].time)
                }
              }else if(this.moreHot === false) {
                this.hotComments = res.data.hotComments !== 'undefined' ? res.data.hotComments : 'undefined'
                if(this.hotComments) {
                  for (let i = 0; i < this.hotComments.length; i++) {
                    this.hotComments[i].time = timestampOther(this.hotComments[i].time)
                  }
                }
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
            setTimeout(() => {
              this.getComment (705123491,this.offset)
              const contentScroll = this.$refs.contentScroll
              contentScroll.forceUpdate()
            }, 1000)
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
          this.$refs.contentScroll.refresh()
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
        /*padding:10px 0*/
      .comment-top
        font-size:$font-size-medium
        margin-left:10px
        /*padding:10px 0*/
    .cube-sticky
      .pull-load
        width:100%
        height:50px
        margin-top:1px
        background-color:white
        position:relative
        bottom:0
        left:50%
        margin-left:-60px
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
        .cube-scroll-list-wrapper
          .comment-message
            border-bottom:7px solid rgba(128,128,128,.1)
          .hot-comment
            margin:auto 10px
          .new-comment
            margin:auto 10px
            padding-bottom:10px
</style>
