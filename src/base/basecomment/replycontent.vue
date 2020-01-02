<template>
  <div class="base-comment">
    <div class="base-comment-top">
      <img v-if="item.user.avatarUrl" v-lazy="item.user.avatarUrl" @click="toUser">
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
      <span class="comment">{{item.content}}
        的方法可忽视地方合适烤番薯看到分红收快递费黑科技的风口是东方航空大家发水电费海口市大富科技多少分红的康师傅
        的方法可忽视地方合适烤番薯看到分红收快递费黑科技的风口是东方航空大家发水电费海口市大富科技多少分红的康师傅
        的方法可忽视地方合适烤番薯看到分红收快递费黑科技的风口是东方航空大家发水电费海口市大富科技多少分红的康师傅
        的方法可忽视地方合适烤番薯看到分红收快递费黑科技的风口是东方航空大家发水电费海口市大富科技多少分红的康师傅
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'baseComment.vue',
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
    computed:{},
    watch:{},
    methods: {
      toUser () {
                // 去用户个人中心页面
      },
      liked () {
                // 点赞
      }
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
    .base-comment-top
      flex-between()
      height:35px
      position:relative
      img
        height:30px
        width:30px
        border-radius:50%
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
      font-size:$font-size-small
      margin-top:5px
      margin-left:40px //改用外边距
      padding-bottom:5px
      .comment
        line-height:1.5
        white-space: normal
        width:100%
        display:inline-block
</style>
