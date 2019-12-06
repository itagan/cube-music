<template>
  <div>
    <ul class="ul-one">
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">口袋彩铃</span>
        <i class="iconfont iconzan1"></i>
      </li>

      <li class="li last-li">
        <i class="iconfont iconzan1"></i>
        <span class="text">我的订单</span>
        <i class="iconfont iconzan1"></i>
      </li>
    </ul>

    <ul class="ul-two">
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">创作者中心</span>
        <i class="iconfont iconzan1"></i>
      </li>
    </ul>

    <ul class="ul-tree">
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">设置</span>
        <i class="iconfont iconzan1"></i>
      </li>
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">夜间模式</span>
<!--        <i class="iconfont iconzan1"></i>-->
      </li>
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">定时关闭</span>
        <i class="iconfont iconzan1"></i>
      </li>
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">音乐闹钟</span>
        <i class="iconfont iconzan1"></i>
      </li>
    </ul>

    <ul class="ul-four">
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">在线听歌免流量</span>
        <i class="iconfont iconzan1"></i>
      </li>
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">优惠券</span>
        <i class="iconfont iconzan1"></i>
      </li>
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">青少年模式</span>
        <span class="open">未开启</span>
        <i class="iconfont iconzan1"></i>
      </li>
    </ul>

    <ul class="ul-five">
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">分享网易云音乐</span>
        <i class="iconfont iconzan1"></i>
      </li>
      <li class="li">
        <i class="iconfont iconzan1"></i>
        <span class="text">关于</span>
        <i class="iconfont iconzan1"></i>
      </li>
    </ul>

  </div>
</template>

<script>
    export default {
      name: 'feature.vue'
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  ul
    /*padding:auto 20px*/
    li
      flex-between()
      padding-right:10px
      padding-left:10px
      background-color:white
      height:40px
      font-size:$font-size-medium
      position:relative
      border-bottom:.5px solid rgba(128,128,128,.2)
      .text
        position: absolute
        left:40px
    .last-li
      border:none

  .ul-one
    margin-top:5px
  .ul-two
    margin-top:5px
  .ul-tree
    margin-top:5px
  .ul-four
    margin-top:5px
    .open
      position:absolute
      right:40px
      color:gray



</style>
