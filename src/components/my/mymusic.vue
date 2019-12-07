<template>
  <ul class="ul">
    <router-link to="/find" tag="li" class="li">
      <div class="li-left">
        <i class="iconfont iconyinyue-copy"></i>
        <span>本地音乐</span>
      </div>

      <div class="li-right">
        <span>11</span>
        <i class="iconfont iconleft-arrow"></i>
      </div>
    </router-link>

    <router-link to="/find" tag="li" class="li">
      <div class="li-left">
        <i class="iconfont iconzuijinbofang"></i>
        <span>最近播放</span>
      </div>

      <div class="li-right">
        <span>11</span>
        <i class="iconfont iconleft-arrow"></i>
      </div>
    </router-link>

      <router-link to="/find" tag="li" class="li">
      <div class="li-left">
        <i class="iconfont icondiantai"></i>
        <span>我的电台</span>
      </div>

      <div class="li-right">
        <span>11</span>
        <i class="iconfont iconleft-arrow"></i>
      </div>
      </router-link>

        <router-link to="/find" tag="li" class="li">
      <div class="li-left">
        <i class="iconfont iconwodeshoucang"></i>
        <span>我的收藏</span>
      </div>

      <div class="li-right">
        <span>11</span>
        <i class="iconfont iconleft-arrow"></i>
      </div>
        </router-link>
  </ul>
</template>

<script>
    export default {
      name: 'myMusic.vue'
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .ul
    background-color:white
    width:100%
    height:auto
    .li
      flex-between()
      height:50px
      border-top:.5px solid rgba(128, 128, 128, 0.5)
      width:100%
      .li-left
        font-size:$font-size-medium-x
        width:120px
        color:black
        flex-around()
        margin-left:5px
      .li-right
        font-size:$font-size-small
        width:auto
        color:gray
        margin-right:10px
        i
          margin-left:5px

</style>
