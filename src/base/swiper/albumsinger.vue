<template>
  <div class="album-base">
    <div class="album-left">
      <div class="left-img">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="left-border"></div>
      <div class="left-cir"></div>
    </div>
    <div class="album-right">
      <h2 class="item-title" >{{item.name}}</h2>
      <p class="item-desc">
        {{transTime(item.publishTime)}},&nbsp
        {{item.size}}首
      </p>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'albumBase.vue',
      props: {
        item: {
          type: Object,
          default: {}
        }
      },
      methods: {
        transTime (timestamp) {
          let date = new Date(timestamp)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1) + '-'
          let D = date.getDate() 
          return Y + M + D
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .album-base
    width:100%
    display:flex
    position:relative
    height:50px
    line-height:50px
    background-color:white
    padding:10px 0
    .album-left
      position:relative
      margin-left:10px
      .left-img
        position:absolute
        width:50px
        height:50px
        z-index:100
        img
          width:100%
          height:100%
          border-radius:5px
      .left-border
        position:absolute
        border:.5px solid gray
        width:45px
        height:45px
        left:6px
        top:2px
        z-index:99
      .left-cir
        position:absolute
        border-radius:50%
        width:50px
        height:50px
        background-color:black
        z-index:98
        left:8px
    .album-right
      font-size:$font-size-medium-x
      position:absolute
      left:75px
      flex:1
      height:100%
      .item-title
        font-size:$font-size-medium
        height:20px
        line-height:1.2
        width:300px
        ellipsis()
        margin-top:10px
      .item-desc
        font-size:$font-size-small
        margin-bottom:5px
        color:gray
        line-height:1.1
</style>
