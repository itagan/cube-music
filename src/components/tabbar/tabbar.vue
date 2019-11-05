<template>
  <div class="tabbar">
    <router-link class="tabbar-item" to="/find">
      <i class="iconfont iconnetease"></i>
      <span>发现</span>
    </router-link>
    <router-link class="tabbar-item" to="/video">
      <i class="iconfont iconvideo"></i>
      <span>视频</span>
    </router-link>
    <router-link class="tabbar-item" to="/my">
      <i class="iconfont iconyinyue"></i>
      <span>我的</span>
    </router-link>
    <router-link class="tabbar-item" to="/village">
      <i class="iconfont iconduoren"></i>
      <span>云村</span>
    </router-link>
    <router-link class="tabbar-item" to="/account">
      <i class="iconfont iconzhanghao"></i>
      <span>账号</span>
    </router-link>
  </div>
</template>

<script>
    export default {
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .tabbar
    position:absolute
    bottom:0
    left:0
    font-size: $font-size-small
    display: flex
    width: 100%
    height:50px
    background-color:rgb(255,255,255)
    &-item
        flex:1
        flex-wrap:nowrap
        display: flex
        flex-center(column)
        width:20%
  .router-link-active
    color:red
    .iconfont
      color: white
      background-color: red
  .iconfont
    font-size: $font-size-large-x
    border-radius 50%
    width:30px
    height:30px
    flex-center(column)
    flex-center(row)
  span
    padding-top:1px
</style>
