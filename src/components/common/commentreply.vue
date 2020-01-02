<template>
  <div class="wrapper">
     <my-header class="header">
      <div slot="left" class="header-left">
        <i class="iconfont iconfanhui" @click="toBack"></i>
        <span>回复</span>
        <span>(11)</span>
      </div>
        <div  slot="right" class="header-right">
          <i class="iconfont iconbofangzhuangtaizanting" @click="music"></i>
        </div>
      </my-header>
  
    <div class="sticky-view-container">
        <cube-sticky :pos="scrollY">
          <cube-scroll
            :scroll-events="scrollEvents"
            @scroll="scrollHandler"
            :options="options"
            ref="contentScroll"
          >
            <div class="reply-container">
              <reply-content :item="item" class="reply-content"></reply-content>
            </div>

            <cube-sticky-ele>
              <ul class="sticky-header">
                <li class="hot-comment-top">全部回复</li>
              </ul>
            </cube-sticky-ele>
            <div ref="stickyHeight" style="height:600px">

              <!-- <ul class="hot-comment">
                <li v-for="item in hotComments" :key="item.commentId">
                  <base-comment :item="item" class="base-comment"></base-comment>
                </li>
              </ul> -->
            </div>

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
        </cube-sticky>
      </div>

    <div class="comment-bottom">
        <input type="text" :placeholder="placeholder" ref="Input" v-model="value">
        <div class="comment-icon">
          <i class="iconfont iconzan1"></i>
          <i class="iconfont iconpinglun"></i>
        </div>
      </div>
    </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
import baseComment from '../../base/basecomment/basecomment'
import replyContent from '../../base/basecomment/replycontent'
export default {
  components: {
    MyHeader,
    replyContent
  },
  props: {},
  data() {
    return {
      placeholder:"发表评论",
      value:'',
      scrollY: 0,
      scrollEvents: ['scroll'],
      totals: 0,
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false // 解决点击事件被触发两次的问题
      },
      item:{}
    }
  },
  watch: {
    // '$route': 'getParams',
  },
  computed: {},
  methods: {
    toBack () {
      this.$router.go(-1)
    },
    music () {
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    getParams () {
      // this.item = this.$route.params.item  //刷新后不能获取参数。该方法需要改造或者采用查询参数形式
      this.item = JSON.parse(this.$route.query.item) //传参获取参数都使用json方法转换，避免刷新时候报错
      console.log(this.item)
    }
  },
  created() {
    this.getParams()
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .wrapper
    height:auto
    background-color:white !important
    .header
      font-size:$font-size-medium-x
      position:relative
      background-color:white
      .header-left
        line-height:50px
        i
          font-size:$font-size-large-x 
        .header-center-reply
            display:flex
            width:auto 
            height:50px
            line-height:50px
      .header-right
        i 
          font-size:$font-size-large-x + 10   

    .comment-bottom
      position:fixed
      bottom:0
      height:45px
      width:100%
      background-color:white
      z-index:2001
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

  .wrapper
    .sticky-view-container
      position: absolute
      top: 50px
      bottom: 0
      left: 0
      width: 100%
      background-color:white
      .sticky-header
        font-size:$font-size-medium
        padding-left:10px
        height:25px
        background-color:white
        padding:auto 10px
        line-height:35px
      .reply-container
        background-color:white
        border-bottom:7px solid rgba(128,128,128,.1)
        margin:auto 10px

</style>