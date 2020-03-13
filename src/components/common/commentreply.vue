<template>
  <div class="wrapper">
     <my-header class="header">
      <div slot="left" class="header-left">
        <i class="iconfont iconfanhui" @click="toBack"></i>
        <span>回复</span>
        <span>({{this.items.length}})</span>
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
            <div class="reply-container" @click="_Reply" ref="replyContainer">
              <reply-content :item="_item" :key="_item.commentId" class="reply-content"></reply-content>
            </div>

            <cube-sticky-ele>
              <ul class="sticky-header">
                <li class="hot-comment-top">全部回复</li>
              </ul>
            </cube-sticky-ele>
            <ul class="reply-all">
              <li v-for="(item, index) in items" :key="item.commentId" @click="Reply(index)" ref="liOffset">
                <reply-all :item="item"></reply-all>
              </li>
            </ul>

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

    <reply-dialog ref="showDia" @reply="replyComment"></reply-dialog>
  </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
import replyContent from '../../base/basecomment/replycontent'
import replyAll from '../../base/basecomment/replyallcomment'
import replyDialog from './replydialog'

export default {
  components: {
    MyHeader,
    replyContent,
    replyAll,
    replyDialog
  },
  props: {},
  data () {
    return {
      placeholder: '发表评论',
      value: '',
      scrollY: 0,
      scrollEvents: ['scroll'],
      totals: 0,
      options: {
        pullUpLoad: true,
        scrollbar: true,
        click: false // 解决点击事件被触发两次的问题
      },
      _item: {},
      items: [],
      user: '',
      commentId: -1,
      threadId: ''
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
      this.items = JSON.parse(this.$route.query.item).reverse() // 传参获取参数都使用json方法转换，避免刷新时候报错
      this._item = JSON.parse(this.$route.query._item)
      this.threadId = this.$route.query.threadId || '0'
      console.log(this.threadId)
    },
    showDialog (liTop, user, commentId, threadId) {
      this.$refs.showDia.show()
      if (liTop === null) {
        this.$refs.showDia.diaTopChange()
      }
      if (liTop < 144) {
        this.$refs.showDia.diaTopChange()
      } else {
        this.$refs.showDia._diaTopChange()
      }
      this.user = user
      this.threadId = threadId
      this.commentId = commentId
    },
    replyComment () {
      this.value = ''
      this.placeholder = '回复' + this.user + ':'
      this.Input()
    },
    Input () {
      this.$refs.Input.focus()
    },
    replyUser (threadId, commentId, content) {
      this.$api.commentFeature.dynamicReply(threadId, commentId, content).then(res => {
        console.log(res)
      })
    },
    input () {
      console.log(this.value.length)
    },
    _Reply () {
      let proup = document.getElementsByClassName('cube-popup-content')[0]
      let Top = this.$refs.replyContainer.getBoundingClientRect().top
      let Hei = this.$refs.replyContainer.offsetHeight
      this.$refs.showDia.show()
      this.$refs.showDia.diaTopChange()
      proup.style.top = -(667 - Hei - Top - 20) + 'px'
      this.user = this._item.user.nickname
      this.commentId = this._item.commentId
    },
    Reply (index) {
      let proup = document.getElementsByClassName('cube-popup-content')[0]
      let liTop = this.$refs.liOffset[index].getBoundingClientRect().top
      let Hei = this.$refs.liOffset[index].offsetHeight
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
      this.user = this.items[index].user.nickname
      this.commentId = this.items[index].commentId
      console.log(this.threadId, this.commentId)
    }
  },
  created () {
    this.getParams()
  },
  mounted () {}
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
      .reply-all
        margin:10px auto  
        li
         margin:auto 10px

</style>