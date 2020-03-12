<template>
  <div class="user-message" ref="Message">
    <div class="user-message-left">
      <div class="user-message-left-img">
        <img :src="profile.avatarUrl" alt="">
      </div>
      <div class="user-message-left-more">
        <div class="user-message-left-name">
          {{profile.nickname}}
        </div>
        <ul class="user-message-left-fans">
          <li>关注
            <span>{{profile.follows}}</span>
          </li>
          <li class="li-center"></li>
          <li>粉丝
            <span>{{profile.followeds}}</span>
          </li>
        </ul>
        <ul class="user-message-left-lv">
           <li class="li-left" v-if="profile.gender !== 0" :style="[profile.gender === 1 ? {backgroundColor:'lightskyblue'} : {backgroundColor:'pink'}]">
              <i class="iconfont iconnv" v-if="profile.gender === 2"></i>
              <i class="iconfont iconnan" v-if="profile.gender === 1"></i>
          </li>
          <li class="li-right">
            Lv
            {{level}}
          </li>
        </ul>
      </div>
    </div>
    <div class="user-message-right">
      <div v-if="profile.followed" class="user-message-right-follow-text">
        <span>{{profile.followTime}}</span>
      </div>
      <ul>
        <li class="user-message-right-follow" v-if="!profile.followed">
          <i class="iconfont iconjia"></i>
          关注
        </li>
        <li class="user-message-right-follow-true" v-if="profile.followTime">
          <i class="iconfont iconzhanghao"  v-if="!profile.followMe"></i>
          <i class="iconfont iconduoren"  v-if="profile.followMe"></i>
        </li>
        <li class="user-message-private">
          <i class="iconfont iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
          发私信
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'userMessage.vue',
      data () {
        return {
          man: true
        }
      },
      props: {
        profile: {
          type: Object,
          default: {}
        },
        level: {
          type: Number,
          default: 0
        }
      },
      methods: {
        opacityHeader (opac) {
          this.$refs.Message.style.opacity = opac
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .user-message
    background-color:none
    display:flex
    height:230px
    color:white
    font-size:$font-size-medium
    opacity:1
    .user-message-left
      height:100%
      flex:1
      margin-left:10px
      .user-message-left-img
        width:80px
        height:80px
        position:relative
        margin-left:10px
        margin-top:50px
        img
          width:80px
          height:80px
          border-radius:50%
      .user-message-left-more
        margin-left:10px
        .user-message-left-name
          height:35px
          line-height:35px
          font-size:$font-size-large
        .user-message-left-fans
          display:flex
          height:20px
          line-height:20px
          font-size:$font-size-small
          color:silver
          .li-center
            width:.5px
            height:12px
            margin:4px 10px
            background-color:silver
        .user-message-left-lv
          display:flex
          margin-top:10px
          li
            margin-right:5px
          .li-left
            width:25px
            height:15px
            border-radius:5px
            flex-center()
            i
              font-size:10px
          .li-right
            width:30px
            height:15px
            border-radius:5px
            background-color:silver
            opacity: .5
            flex-center()
            font-size:10px
    .user-message-right
      height:100%
      width:150px
      position:relative
      margin-right:10px
      .user-message-right-follow-text
        position:absolute
        bottom:50px
        text-align:right
        width:100%
        height:20px
        span 
           margin-right:10px
           opacity:.7
      ul
        flex-between()
        position:absolute
        bottom:20px
        font-size:$font-size-small
        color:white
        width:100%
        .user-message-right-follow
          width:65px
          height:25px
          border-radius:15px
          background-color:red
          flex-center()
          margin-right:10px
        .user-message-right-follow-true
          width:25px
          height:25px
          border-radius:50%
          background-color:silver
          flex-center()
          margin-left:30px  
          i  
            font-size:$font-size-small
        .user-message-private
          width:75px
          height:25px
          border-radius:15px
          background-color:silver
          opacity: .5
          flex-center()
          color:white
          margin-right:10px


</style>
