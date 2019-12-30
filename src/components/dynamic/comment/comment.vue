<template>
  <div class="list-comment">
   
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">
        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          
          :options="options"
          ref="contentScroll"
        >
         
          <cube-sticky-ele ele-key="精彩评论">
            <ul class="sticky-header">
              <li class="hot-comment-top">精彩评论</li>
            </ul>
          </cube-sticky-ele>
          <comment-base style="height:600px"></comment-base>

          <cube-sticky-ele ele-key="最新评论">
            <ul class="sticky-header">
              <li class="comment-top">最新评论</li>
            </ul>
          </cube-sticky-ele>
         
          <comment-base></comment-base>

          <!-- <template slot="pullup" slot-scope="props">
            <div v-if="props.pullUpLoad" class="pull-load">
              <template>
              <span v-if="props.isPullUpLoad" class="load">
                 <i class="iconfont iconyinletiaodongzhuangtai"></i>
                <span> 加载中...</span>
              </span>
              </template>
            </div>
          </template> -->

        </cube-scroll>
        <template slot="fixed" slot-scope="props">
          <ul class="sticky-header">
            <li>{{props.current}}</li>
          </ul>
        </template>

      </cube-sticky>
    </div>

    <!-- <div class="comment-bottom">
      <input type="text" placeholder="这一次也许就是你上热评了">
      <div class="comment-icon">
        <i class="iconfont iconfanhuidingbu"></i>
        <i class="iconfont iconpinglun"></i>
      </div>
    </div> -->
  </div>
</template>

<script>
    import commentBase from './commentbase'
    
    export default {
      name: 'listComment.vue',
      components: {
        commentBase
      },
      data () {
        return {
          scrollY: 0,
          scrollEvents: ['scroll'],
          totals: 0,
          options: {
            pullUpLoad: true,
            scrollbar: false,
            click: false // 解决点击事件被触发两次的问题
          },
          secondStop: 0,
          pullDownY: 0
    
        }
      },
      props: {
          // id:{
          //   type:Number,
          //   default:705123491
          // }
      },
      created () {
      },
      methods: {
        scrollHandler ({ y }) {
          this.scrollY = -y
        }
          // onPullingUp () {
          //   setTimeout(() => {
          //     this.getComment (705123491,this.offset)
          //     const contentScroll = this.$refs.contentScroll
          //     contentScroll.forceUpdate()
          //   }, 1000)
          // }
      },
        // beforeMount() {
        //   this.$nextTick(() => {
        //   // let hei = document.getElementsByClassName('hot-comment')[0]
        //   // let myColor= getComputedStyle(hei).height
        //   // this.$refs.stickyHeight.style.height = myColor +'px'
        //   // this.$refs.scrollCube.refresh()

        //   this.$refs.stickyHeight.style.height = 300 + 'px'
        //   // console.log(this.totals)
        //   this.$refs.contentScroll.refresh()
        //   })
        // },
      mounted () {
          // this.$nextTick(() => {
        //     this.getHeight ()
          // })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
.list-comment
  height:667px
  width:375px
 
  .comment-bottom
    position:fixed
    bottom:0
    height:40px
    width:100%
    background-color:white
    z-index:2020
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
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 375px
    height:567px
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
          .hot-comment
            margin:auto 10px
          .new-comment
            margin:auto 10px
            padding-bottom:10px
</style>
