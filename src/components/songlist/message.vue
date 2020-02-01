<template>
  <div class="song-list-message">
    <div class="song-message">
      <div class="song-message-left" @click="toCover">
        <img :src="playlist.coverImgUrl" alt="">
        <span>
            <i class="iconfont iconCell-PlayVolume"></i>
            {{playlist.playCount}}
          </span>
      </div>
      <div class="song-message-right">
        <div class="song-title">
          {{playlist.name}}
        </div>
        <div class="song-create" @click.stop="toUser(playlist.userId)" v-if="playlist.creator">
          <img :src="playlist.creator.avatarUrl" alt="">
          <span>{{playlist.creator.nickname}}</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
        <div class="song-desc" @click="toCover" v-if="playlist.description">
          <span>{{playlist.description}}</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
        <div class="song-desc" v-else @click="toEdit">
          <span>编辑简介</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
      </div>
    </div>
    <ul class="song-opera">
      <li @click="toComment">
        <i class="iconfont iconpinglun"></i>
        <span>{{playlist.commentCount}}</span>
      </li>
      <li @click="toShare">
        <i class="iconfont iconfenxiang"></i>
        <span>{{playlist.shareCount}}</span>
      </li>
      <li>
        <i class="iconfont iconxiazaigequ"></i>
        <span>下载</span>
      </li>
      <li @click="chcekMore">
        <i class="iconfont iconhuaban"></i>
        <span>多选</span>
      </li>
    </ul>

  </div>
</template>

<script>
    export default {
      name: 'songMessage.vue',
      props: {
        playlist: {
          type: Object,
          default: {}
        },
        allShow: {
          type:Boolean,
          default:false
        }
      },
      methods: {
        toComment () {
          if(this.allShow) return
          this.$emit('comment')
        },
        toShare () {
          if(this.allShow) return
          this.$emit('share')
        },
        chcekMore () {
          if(this.allShow) return
          this.$emit('check')
        },
        toUser (userId) {
          if(this.allShow) return
          if(this.playlist.creator.userType === 2 || this.playlist.creator.userType === 4) {
            this.$api.users.userdetail(userId).then(res => {
              let id = res.data.profile.artistId
              this.$router.push({
                path: `/singer/${userId}/${id}`
              })
            })
            }else {
              this.$router.push({
              path: `/user/${userId}`
            })
          }
        },
        toCover () {
          if(this.allShow) return
          this.$emit('cover')
        },
        toEdit () {
          if(this.allShow) return
          if(this.playlist.creator.userId === 477726475) {
            this.$router.push({
            path:'/editlist',
            query: {
              playlist: JSON.stringify(this.playlist)
              }
            })
          }else {
            this.toCover()
          }
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .song-list-message
    background-color:none
    .song-message
      display:flex
      height:140px
      .song-message-left
        width:140px
        height:140px
        position:relative
        margin-left:10px
        img
          width:140px
          height:140px
          border-radius:5px
        span
          position:absolute
          top:5px
          right:10px
          font-size:$font-size-small
          color:white
      .song-message-right
        height:140px
        flex:1
        margin:auto 10px
        .song-title
          height:40px
          line-height:1.3
          multiline-ellipsis($num=2)
          font-size:$font-size-medium-x
          color:white
        .song-create
          margin-top:8px
          margin-bottom:17px
          height:40px
          font-size:$font-size-medium
          display: flex
          align-items: center
          color:gray
          img
            width:30px
            height:30px
            border-radius:50%
          span
            max-width:120px
            height:30px
            line-height:30px
            margin-left:5px
            color:white
            ellipsis()
          i
            margin-left:10px
            font-size:$font-size-large-x
        .song-desc
          height:40px
          font-size:$font-size-small
          display:flex
          margin-top:10px
          color:#dcdcdc
          span
            multiline-ellipsis($num=2)
            height:40px
            line-height:1.6
          i
            font-size:$font-size-large-x
    .song-opera
      display:flex
      height:40px
      width:100%
      margin-top:20px
      color:white
      li
        width:25%
        flex:1
        flex-center(column)
        i
          font-size:$font-size-large-x
        span
          font-size:$font-size-small
          margin-top:5px


</style>
