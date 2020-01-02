<template>
  <div class="base-comment" @click="remind">
    <div class="base-comment-top">
      <img v-lazy="item.user.avatarUrl" @click="toUser">
      <div class="base-comment-time">
        <span class="user-name">{{item.user.nickname}}</span>
        <span class="user-time">{{item.time}}</span>
      </div>
      <div class="user-praise">
        <span @click="liked">{{item.likedCount}}</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
    <div class="base-comment-bottom">
      <span class="comment">{{item.content}}</span>
      <div v-if="item.beReplied.length && item.beReplied[0].beRepliedCommentId !== item.parentCommentId" class="be-replied">
        <div class="line"></div>
        <div class="be-replied-content">
          <span class="be-replied-name">@{{item.beReplied[0].user.nickname}}</span>
            {{item.beReplied[0].content}}
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'replyallcomment.vue',
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {}
    },
    created() {
      // this.showReply()
    },
    computed:{
      // arr() {
      //   this.showReply() 
      // }
    },
    watch:{},
    methods: {
      remind () {
                // 点击评论提醒该要什么
      },
      toUser () {
                // 去用户个人中心页面
      },
      liked () {
                // 点赞
      },
      reply () {
        this.$router.push({
          // path:`/commentreply:${this.item}`
          path: 'commentreply', 
          name:'commentreply',
          // params: { 
          //    item:this.item
          // }
          query: { 
             item:JSON.stringify(this.ReplyArr)  //传参获取参数都使用json方法转换，避免刷新时候报错
          }
        })    
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .base-comment
    width:100%
    position:relative
    background-color:white
    /*padding-bottom:5px*/
    .base-comment-top
      flex-between()
      height:35px
      position:relative
      img
        height:30px
        width:30px
        border-radius:50%

        /*position:relative*/
        /*top:50%*/
      .base-comment-time
        flex-center(column)
        align-items: flex-start
        position:absolute
        left:40px
        .user-name
          font-size:$font-size-small-s
          color:gray
          margin-bottom:3px
        .user-time
          font-size:$font-size-small-ss
          color:#dcdcdc
      .user-praise
        font-size:$font-size-small-s
        height:100%
        color:gray
        flex-center()
        span
          margin-right:3px
    .base-comment-bottom
      /*position:relative*/
      /*left:40px*///不用定位方式避免被整体拉到左边出现水平滚动条
      font-size:$font-size-small
      margin-top:5px
      margin-left:40px //改用外边距
      padding-bottom:5px
      border-bottom:1px solid #dcdcdc
      .comment
        /*position:relative*/
        /*right:40px*/
        line-height:1.5
        white-space: normal
        width:100%
        display:inline-block
      .be-replied
        color: gray
        display:flex
        padding-bottom:10px
        margin-top:10px
        .line
          width:4px
          min-height:10px  //让旁边内容撑开高度。设置最小避免不出现
          background-color: #cdcdcd
          margin-right:5px
        .be-replied-content
          line-height:1.5
          white-space: normal
          .be-replied-name
            color:dodgerblue
      .reply
        color:dodgerblue
        height:30px
        display:flex
        line-height:30px
        span
          margin-right:5px
          display:flex
          width:auto
        i 
          font-size:$font-size-large-x
          margin-left:-7px

</style>
