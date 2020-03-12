<template>
  <div class="wrapper">

     <div class="content-scroll-wrapper">
      <cube-scroll
        ref="contentScroll"
        :scroll-events="scrollEvents"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        nest-mode="native"
        >
        <ul class="container">
          <li class="anchor">
            <div class="anchor-name">主播</div>
            <div class="anchor-dsc">
              <base-auto class="my-base">
              <img :src="djRadio.dj.avatarUrl" alt="" slot="left" class="img" v-if="djRadio.picUrl"> 
              <div slot="top" class="my-base-top" v-if="djRadio.dj">
                {{djRadio.dj.nickname}}
              </div>
              <div slot="bottom" class="my-base-bottom" v-if="djRadio.dj">
                 {{djRadio.dj.signature}}
              </div>
            </base-auto>
            </div>
          </li>
          <li class="desc">
             <div class="desc-top">电台内容简介</div>
             <div class="desc-bottom">
               {{djRadio.desc}}
             </div>
          </li>
          <li class="comment" v-if="djRadio.commentDatas && djRadio.commentDatas.length">
             <div class="comment-top">精彩评论</div>
             <ul class="comment-bottom">
               <li class="comment-bottom-li" v-for="item in djRadio.commentDatas" :key="item.commentId">
                 <div class="comment-bottom-li-top">
                   <img :src="item.userProfile.avatarUrl" alt="">
                   <div>{{item.userProfile.nickname}}</div>
                 </div>
                 <div class="comment-bottom-li-bottom">
                   <div class="comment-bottom-li-content">
                     {{item.content}}
                   </div>
                   <div class="comment-bottom-li-quote">
                     ---{{item.programName}}
                   </div>
                 </div>
               </li>
             </ul>
          </li>
        </ul>
      </cube-scroll>
    </div> 
  </div>
</template>

<script>
import baseAuto from '../../../base/swiper/baseauto'

export default {
  components: {
    baseAuto
  },
  props: {
    djRadio: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      options: {
        pullUpLoad: false,
        scrollbar: false,
        click: false, // 解决点击事件被触发两次的问题
        stopPropagation: false,
        scrollX: false,
        scrollY: true
      },
      secondStop: 0,
      scrollEvents: ['scroll'],
      scrollY: 0
    }
  },
  watch: {
  },
  computed: {},
  methods: {
    onPullingUp () {
    },
    scrollHandler (pos) {
      this.scrollY = -pos.y
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .wrapper
    background-color:white
    margin-bottom:50px
    .container
      font-size:$font-size-medium
      .anchor
        .anchor-name
          height:50px
          line-height:50px
          margin-left:10px
        .anchor-dsc
          height:50px
          width:100%
          .my-base
            height:100%
            width:100%
            img 
              height:45px
              width:45px
              border-radius:50%
              margin-top:2.5px
              margin-left:2.5px
            .my-base-top
              max-width:275px
              ellipsis() 
            .my-base-bottom
              max-width:275px
              ellipsis()  
      .desc
        min-height:70px
        margin-top:10px
        .desc-top
          height:50px
          line-height:50px
          margin-left:10px
        .desc-bottom
          color:gray  
          line-height:1.4
          multiline-ellipsis($num=10)
          margin:auto 10px
      .comment
        padding-bottom:10px
        .comment-top
          height:50px
          line-height:50px
          margin-left:10px
        .comment-bottom
          height:auto
          .comment-bottom-li
            height:auto
            margin-bottom:15px
            .comment-bottom-li-top
              display:flex
              height:30px
              color:gray  
              img 
                margin:auto 10px
                height:30px
                width:30px
                border-radius:50%
              div
                line-height:30px
                max-width:275px
                ellipsis() 
            .comment-bottom-li-bottom 
              margin-left:50px
              .comment-bottom-li-content
                height:auto 
                multiline-ellipsis($num=10)
                margin-right:10px
                line-height:1.5
              .comment-bottom-li-quote
                color:gray  
                font-size:$font-size-small
                // margin-top:10px
                max-width:300px
                margin-right:10px
                ellipsis()  
                height:30px
                line-height:30px
                border-bottom:.5px solid rgba(128,128,128,.7)

            


  .content-scroll-wrapper
    position:relative
    height:607px //需要除去头部高度，避免产生页面原生滚动
    width:375px
    bottom:50px
    top:0
    background-color:white 
    .content
      height: 100%
      overflow: hidden   

 //上方加载中相关样式
  .pullloadtop
    width:100%
    height:100%
    position: absolute
    top:0
    left:0
    bottom:0
    z-index: 10000
    // flex-center()
    background-color:white
    display:flex
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

</style>