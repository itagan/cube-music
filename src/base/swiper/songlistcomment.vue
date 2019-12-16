<template>
  <ul>
    <li class="img"><img src="../../components/user/img/login1.png" alt=""></li>

    <li class="content">
      <div class="content-top">
        <span class="list">歌单</span>
        <span class="title">肖战翻唱歌录f代发理发师理发了sdas</span>
      </div>
      <div class="content-bottom">
        <span class="by">by</span>
        <span class="nickname">肖战</span>
      </div>
    </li>

    <li class="go"><i class="iconfont iconleft-arrow"></i></li>
  </ul>
</template>

<script>
    export default {
        name: "songListComment.vue",
        props: {

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
      img
        height:80px
        width:80px
        border-radius:5px
    .content
      width:auto
      height:90px
      position:absolute
      left:100px
      .content-top
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
          max-width:210px
          margin-left:5px
          ellipsis()
      .content-bottom
        display:flex
        height:45px
        width:auto
        .by
          font-size:$font-size-small
          color:gray
        .nickname
          font-size:$font-size-medium
          color:lightskyblue
          margin-left:5px
    .go
      color:gray
      flex-center()
      i
        font-size:$font-size-large-x

</style>
