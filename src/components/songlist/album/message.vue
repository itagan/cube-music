<template>
  <div class="song-list-message">
    <div class="song-message">
      <div class="song-message-left">
        <img :src="messages.picUrl" alt="">
        <div class="album-cir"></div>
      </div>
      <div class="song-message-right">
        <div class="song-title" v-if="messages.name">
          {{messages.name}}
          <span v-if="messages.alias.length" class="song-title-alia">({{messages.alias[0]}})</span>
        </div>
        <div class="song-create" @click="toUser(messages.artist.id)">
          <span style="color:#dcdcdc">歌手:</span>
          <span v-if="messages.artists">{{Artist(messages.artists)}}</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
        <div class="song-time">发行时间: {{transTime(messages.publishTime)}}</div>
        <div class="song-desc">
          <span>{{messages.description}}</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
      </div>
    </div>
    <ul class="song-opera">
      <li @click="toComment">
        <i class="iconfont iconpinglun"></i>
        <span v-if="messages.info">{{messages.info.commentCount}}</span>
      </li>
      <li @click="toShare">
        <i class="iconfont iconfenxiang"></i>
        <span v-if="messages.info">{{messages.info.shareCount}}</span>
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
        messages: {
          type: Object,
          default: {}
        },
      },
      methods: {
        toComment () {
          // this.$emit('saveComment')
          this.$router.push({
            // name: 'albumcomment',
            // params: {album: this.messages}
            path:`/albumcomment`,
            query: {
              album: JSON.stringify(this.messages)
            }
          })
        },
        toShare () {
          this.$emit('share')
        },
        chcekMore () {
          this.$emit('check')
        },
        toUser (id) {
          this.$api.singers.singermusic(id).then(res => {
            if(res.data.artist.accountId) {
              this.accountId = res.data.artist.accountId
              let userId = this.accountId
              this.$router.push({
                path: `/singer/${userId}/${id}`
                })
            }else {
              let userId = 477726475
              this.$router.push({
                path: `/singer/${userId}/${id}`
                })
            }
          })
        },
        transTime (timestamp) {
          let date = new Date(timestamp)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1) + '-'
          let D = date.getDate() 
          return Y + M + D
        },
        Artist (artist) {
          let arr = []
          artist.forEach(item => {
            arr.push(item.name)
          })
          return arr.join('/')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

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
        .album-cir
          position:absolute
          border-radius:50%
          width:135px
          height:135px
          background-color:black
          z-index:-1
          left:2.5px
          top:-25px  
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
          .song-title-alia
            color:#dcdcdc
        .song-create
          margin:10px auto
          // margin-bottom:17px
          height:30px
          font-size:$font-size-medium
          display: flex
          align-items: center
          color:gray
          span
            max-width:120px
            height:30px
            line-height:30px
            margin-left:5px
            color:white
            ellipsis()
          i
            margin-left:0
            font-size:$font-size-large-x
        .song-time
          height:20px
          line-height:20px  
          color:#dcdcdc
          margin-top:20px 
          font-size:$font-size-small
        .song-desc
          height:20px
          font-size:$font-size-small
          flex-between()
          margin-top:3px
          color:#dcdcdc
          span
            multiline-ellipsis($num=1)
            height:20px
            line-height:20px   
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
