<template>
  <div class="basecomment" @click="remind">
    <div class="basecommentTop">
      <img :src="item.user.avatarUrl" @click="touser">
      <div class="basecommentTime">
        <span class="username">{{item.user.nickname}}</span>
        <span class="usertime">{{item.time}}</span>
      </div>
      <div class="userpraise">
        <span @click="liked">{{item.likedCount}}</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
    <div class="basecommentBottom">
      <span class="comment">{{item.content}}</span>
      <div v-if="item.beReplied.length" class="beReplied">
        <div class="line"></div>
        <div class="beRepliedContent">
          <span class="beRepliedName">@{{item.beReplied[0].user.nickname}}</span>
          {{item.beReplied[0].content}}
          </span>
        </div>
      </div>
      <div class="reply" @click="reply" v-if="replyshow">
        <span>5条回复</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basecomment.vue',
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
        // watch: {
        //     item() {
        //         console.log('变化了')
        //     }
        // },
    data () {
      return {
        replyshow: false
      }
    },
    methods: {
      remind () {
                // 点击评论提醒该要什么
      },
      touser () {
                // 去用户个人中心页面
      },
      liked () {
                // 点赞
      },
      reply () {
                // 回复
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .basecomment
    width:100%
    position:relative
    background-color:white
    /*padding-bottom:5px*/
    .basecommentTop
      flex-between()
      height:35px
      position:relative
      img
        height:30px
        width:30px
        border-radius:50%

        /*position:relative*/
        /*top:50%*/
      .basecommentTime
        flex-center(column)
        align-items: flex-start
        position:absolute
        left:40px
        .username
          font-size:$font-size-small-s
          color:gray
          margin-bottom:3px
        .usertime
          font-size:$font-size-small-ss
          color:#dcdcdc
      .userpraise
        font-size:$font-size-small-s
        height:100%
        color:gray
        flex-center()
        span
          margin-right:3px
    .basecommentBottom
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
        overflow-wrap:break-word
        width:100%
        display:inline-block
      .beReplied
        /*background-color: #cdcdcd*/
        color: gray
        //flex-between()
        display:flex
        /*margin:10px auto*/
        padding-bottom:10px
        margin-top:10px
        .line
          width:4px
          min-height:10px  //让旁边内容撑开高度。设置最小避免不出现
          background-color: #cdcdcd
          margin-right:5px
        .beRepliedContent
          line-height:1.5
          .beRepliedName
            color:dodgerblue
      .reply
        color:dodgerblue
        margin-top:5px
        padding-top:5px
        padding-bottom:15px
        span
          margin-right:5px

</style>
