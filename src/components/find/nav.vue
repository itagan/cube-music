<template>
  <div class="wrap">
    <router-link tab="div" class="wrapper" to="/my">
      <div class="wrapperIcon">
        <i class="iconfont iconzan1"></i>
      </div>
      <span>每日推荐</span>
    </router-link>

    <router-link tab="div" class="wrapper" to="/my">
      <div class="wrapperIcon">
        <i class="iconfont iconzu"></i>
      </div>
      <span>歌单</span>
    </router-link>

    <router-link tab="div" class="wrapper" to="/my">
      <div class="wrapperIcon">
        <i class="iconfont iconpaixingbang"></i>
      </div>
      <span>排行榜</span>
    </router-link>

    <router-link tab="div" class="wrapper" to="/my">
      <div class="wrapperIcon">
        <i class="iconfont icondiantai"></i>
      </div>
      <span>电台</span>
    </router-link>

    <router-link tab="div" class="wrapper" to="/my">
      <div class="wrapperIcon">
        <i class="iconfont iconlive"></i>
      </div>
      <span>直播</span>
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "nav.vue"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrap
    width:100%
    height: 70px
    margin-top:15px
    flex-between()
    flex-wrap: wrap
    .wrapper
      width:20%
      flex:1
      flex-center(column)
      .wrapperIcon
        width:45px
        height:45px
        border-radius:50%
        background-color:red
        display: flex
        .iconfont
          font-size:$font-size-large-x + 4px
          color:white
          margin:auto
      span
        text-align:center
        font-size:$font-size-small-s
        margin-top:5px
</style>
