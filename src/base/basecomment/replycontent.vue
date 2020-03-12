<template>
  <div class="base-comment">
    <div class="base-comment-top">
      <img v-if="item.user.avatarUrl" v-lazy="item.user.avatarUrl" @click="toUser">
      <div class="base-comment-time">
        <div class="base-comment-name">
          <div class="user-name">{{item.user.nickname}}</div>
          <div class="user-author" v-if="this.author[0].userId === item.user.userId"><span class="user-author-name">作者</span></div>
        </div>
         <span class="user-time">{{timestamp(item.time)}}</span>
      </div>
      <div class="user-praise">
        <span @click="liked">{{item.likedCount}}</span>
        <i class="iconfont iconzan1"></i>
      </div>
    </div>
    <div class="base-comment-bottom">
      <span class="comment">{{item.content}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {timestampOther} from '../../assets/js/timestamp'
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
  created () {},
  computed: {
    ...mapGetters([
      'author'
    ])
  },
  watch: {},
  methods: {
    toUser () {
                // 去用户个人中心页面
    },
    liked () {
                // 点赞
    },
    timestamp (time) {
      return timestampOther(time)
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
        .base-comment-name
          display:flex
          .user-name
            font-size:$font-size-small
            color:gray
            margin-bottom:3px
            margin-right:5px
          .user-author
            width:25px
            background-color:#ff6eb4
            color:#ffc1c1
            border-radius:3px
            height:10px
            flex-center()
            padding-left:3px
            .user-author-name  
              flex-center()
              width:100%
              height:100%
              text-align:center
              font-size:$font-size-small 
              -webkit-transform-origin-x: 0
              -webkit-transform: scale(0.80)
              transform: scale(0.80)
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
