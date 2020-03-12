<template>
  <ul @click="toAlbum(album.id)">
    <li class="img">
      <img :src="album.picUrl" alt="">
      <div class="album-crl"></div>
    </li>

    <li class="content">
      <div class="content-top">
        <span class="title">{{album.name}}</span>
      </div>
      <div class="content-bottom" @click.stop="toUser(album.artist.id)">
        <span class="nickname">{{album.artist.name}}
          {{album.artist.alias[0]}}
          </span>
      </div>
    </li>

    <li class="go"><i class="iconfont iconleft-arrow"></i></li>
  </ul>
</template>

<script>
    export default {
      name: 'albumCommentTop.vue',
      props: {
        album: {
          type: Object,
          default: {}
        }
      },
      methods: {
        Artists (artists) {
          let arr = []
          artists.forEach(ele => {
            ele
          })
        },
        toAlbum (id) {
          this.$router.push({
            path: `/albumlist/${id}`
          })
        },
        toUser (id) {
          this.$api.singers.singermusic(id).then(res => {
            if (res.data.artist.accountId) {
              this.accountId = res.data.artist.accountId
              let userId = this.accountId
              this.$router.push({
                path: `/singer/${userId}/${id}`
              })
            } else {
              let userId = 477726475
              this.$router.push({
                path: `/singer/${userId}/${id}`
              })
            }
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  ul
    height:90px
    width:100%
    background-color:white
    flex-between()
    position:relative
    li
      height:90px
    .img
      height:80px
      width:80px
      margin-left:10px
      position: relative
      img
        height:80px
        width:80px
        border-radius:5px
        z-index:2
        position:absolute
      .album-crl
        position:absolute
        border-radius:50%
        width:75px
        height:75px
        background-color:black
        z-index:1
        left:18px
        top:2.5px
        
    .content
      width:auto
      height:90px
      position:absolute
      left:110px
      z-index:1
      .content-top
        padding-top:10px
        display:flex
        height:45px
        width:auto
        align-items: center
        .list
          color:lightpink
          border:1px solid lightpink
          border-radius:1px
          height:14px
          width:28px
          font-size:$font-size-small
          flex-center()
        .title
          font-size:$font-size-medium
          max-width:220px
          margin-left:5px
          ellipsis()
      .content-bottom
        display:flex
        height:45px
        width:auto
        .nickname
          font-size:$font-size-small
          color:lightskyblue
          margin-left:5px
          max-width:240px
          ellipsis()
    .go
      color:gray
      flex-center()
      i
        font-size:$font-size-large-x

</style>
