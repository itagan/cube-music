<template>
  <div class="log-base">
    <div class="img">
      <img src="../../components/user/img/login1.png" alt="">
    </div>
    <div class="label">#云圈推歌大赛</div>

    <div class="content">
      <div class="title">
          许嵩这个名字大概是从我以前初中那会儿开始频繁听到的……
      </div>
      <div class="content-bottom">
        <img src="../../components/user/img/login1.png" alt="">
        <span class="nick-name">
          路路杏仁儿露
        </span>
        <span class="praise">
          4赞
        </span>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'logBase.vue'
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .log-base
    width:160px
    height:auto
    border-radius:10px
    position:relative
    background-color:white
    font-size:$font-size-medium
    margin:auto 10px
    .img
      height:auto
      width:160px
      border-top-left-radius:10px
      border-top-right-radius:10px
      img
        max-height:500px
        width:160px
        border-top-left-radius:10px
        border-top-right-radius:10px
    .label
      position:absolute
      color:white
      bottom:150px
      left:20px
    .content
      height:80px
      width:160px
      .title
        height:40px
        width:100%
        margin-right:5px
        margin-left:5px
        line-height:1.4
        multiline-ellipsis($num=2)
      .content-bottom
        height:40px
        width:100%
        color:gray
        font-size:$font-size-small
        flex-between()
        position:relative
        img
          width:15px
          height:15px
          border-radius:50%
          margin-left:5px
        .nick-name
          position:absolute
          left:25px
        .praise
          margin-right:5px
</style>
