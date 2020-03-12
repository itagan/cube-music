<template>
  <div class="user-message" ref="Message" @click="toBigimg">
    <div class="user-message-left">
      <div class="user-message-left-img" @click.stop="changeCover">
        <img :src="userMessage.profile.avatarUrl" alt="" v-if="userMessage.profile">
      </div>
      <div class="user-message-left-more">
        <div class="user-message-left-name" v-if="userMessage.profile">
          {{userMessage.profile.nickname}}
        </div>
        <ul class="user-message-left-fans" v-if="userMessage.profile">
          <li>关注
            <span>{{userMessage.profile.follows}}</span>
          </li>
          <li class="li-center"></li>
          <li>粉丝
            <span>{{userMessage.profile.followeds}}</span>
          </li>
        </ul>
        <ul class="user-message-left-lv" v-if="userMessage.profile">
           <li class="li-left" v-if="userMessage.profile.gender !== 0" :style="[userMessage.profile.gender === 1 ? {backgroundColor:'lightskyblue'} : {backgroundColor:'pink'}]">
              <i class="iconfont iconnv" v-if="userMessage.profile.gender === 2"></i>
              <i class="iconfont iconnan" v-if="userMessage.profile.gender === 1"></i>
          </li>
          <li class="li-right">
            Lv
            {{userMessage.level}}
          </li>
        </ul>
      </div>
    </div>
    <div class="user-message-right" v-if="userMessage.profile">
      <div v-if="userMessage.profile.followed" class="user-message-right-follow-text">
        <span>{{userMessage.profile.followTime}}</span>
      </div>
      <ul v-if="userMessage.profile.userId !== 477726475">
        <li class="user-message-right-follow" v-if="!userMessage.profile.followed" v-show="isFollowed" @click.stop="toFollow">
          <i class="iconfont iconjia"></i>
          关注
        </li>
        <li class="user-message-right-follow-true" v-if="userMessage.profile.followed" @click.stop="removeFollow">
          <i class="iconfont iconzhanghao"  v-if="!userMessage.profile.followMe"></i>
          <i class="iconfont iconduoren"  v-if="userMessage.profile.followMe"></i>
        </li>
        <li class="user-message-private">
          <i class="iconfont iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
          发私信
        </li>
      </ul>
      
      <ul v-if="userMessage.profile.userId === 477726475">
        <li class="user-message-edit" v-if="!userMessage.profile.followed" @click="toEdit">
          编辑
        </li>
        <li class="user-message-edit">
          更换背景
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
          man: true,
          isUser: true,
          isFollowed: true,
          followed: false,
          followTime: '',
          Message: {}
        }
      },
      props: {
        userMessage: {
          type: Object,
          default: {}
        }
      },
      methods: {
        opacityHeader (opac) {
          this.$refs.Message.style.opacity = opac
        },
        getMes () {
          this.Message = this.userMessage
          this.followed = this.userMessage.profile && this.userMessage.profile.followed
          this.followTime = this.userMessage.profile && this.userMessage.profile.followTime
        },
        toEdit () {
          this.$router.push({
            path: `/editinformation`,
            query: {
              userMessage: JSON.stringify(this.userMessage)
            }
          })
        },
        toBigimg () {
          this.$createImagePreview({
            imgs: [this.userMessage.profile.backgroundUrl],
            zIndex: 2002
          }).show()
        },
        changeCover () {
          // 头像放大
        },
        toFollow () {
          this.$api.users.toFollow(this.userMessage.profile.userId, 1).then(res => {
            console.log(res.data)
            // this.isFollowed = false
            // this.userMessage.profile.followed = true
            if (res.data.code === 200) {
              const toast = this.$createToast({
                txt: res.data.followContent,
                type: 'text',
                zIndex: 2002,
                time: 2000
              })
              toast.show()
              this.userMessage.profile.followed = true
            }
          })
        },
        removeFollow () {
          this.$api.users.toFollow(this.userMessage.profile.userId, 2).then(res => {
            console.log(res.data)
            // this.isFollowed = false
            this.userMessage.profile.followed = false
          })
        }
      },
      created () {
        // this.$nextTick(() => {
        //   this.getMes()
        // })
        this.getMes()
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
        .user-message-edit
          min-width:30px
          height:25px
          border-radius:15px
          background-color:rgba(128,128,128,.4)
          // opacity: .5
          flex-center()
          color:white
          margin-right:10px  
          padding:0 5px


</style>
