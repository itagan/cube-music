<template>
  <div class="song-list-message">
    <div class="song-message">
      <div class="song-message-left">
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
        <div class="song-create">
          <img :src="messages.avatarUrl" alt="">
          <span>{{messages.nickname}}</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
        <div class="song-desc">
          <span>{{playlist.description}}</span>
          <i class="iconfont iconiconfontyoujiantou"></i>
        </div>
      </div>
    </div>
    <ul class="song-opera">
      <li @click="toComment">
        <i class="iconfont iconpinglun"></i>
        <span>{{playlist.commentCount}}</span>
      </li>
      <li >
        <i class="iconfont iconfenxiang"></i>
        <span>{{playlist.shareCount}}</span>
      </li>
      <li>
        <i class="iconfont iconxiazaigequ"></i>
        <span>下载</span>
      </li>
      <li>
        <i class="iconfont iconhuaban"></i>
        <span>多选</span>
      </li>
    </ul>

  </div>
</template>

<script>

    export default {
        name: "songMessage.vue",
        props: {
            messages: {
                type:Object,
                default:{}
            },
            playlist: {
                type:Object,
                default:{}
            }
        },
        methods: {
            toComment () {
                this.$emit('saveComment')
                this.$router.push({
                    path:'songlistcomment'
                })
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
          flex-between()
          margin-top:10px
          color:gray
          span
            multiline-ellipsis($num=2)
            height:40px
            line-height:1.5
          i
            font-size:$font-size-large-x
            color:gray
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
