<template>
  <div class="song-base">
    <div class="num" v-show="!checkbox">
      <span v-show="!playing">{{index + +1}}</span>
      <i class="iconfont iconlaba" v-show="playing"></i>
    </div>
    <div class="num" v-show="checkbox">
      <i class="iconfont iconshoucangchenggong"></i>
    </div>
    <div class="song-base-content">
      <div class="title" :class="[playing ? 'activeColor' : '']">
        <span class="title-left">{{item.name}}</span>
        <span class="title-right" v-if="item.tns && item.tns.length">({{item.tns[0]}})</span>
      </div>
      <div class="desc">
        <img src="" alt="" class="sq">
        <span class="nickname">{{item.ar[0].name}}</span>

        <span class="name">{{item.al.name}}</span>
      </div>
    </div>

    <div class="playing" v-show="!checkbox">
      <i class="iconfont iconbofang5"></i>
    </div>
    <div class="more" v-show="!checkbox">
      <i class="iconfont icongengduo"></i>
    </div>

    <div v-show="checkbox" class="checkbox">
      <i class="iconfont icontuozhuai"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "songBase.vue",
        data () {
            return {
                playing:false,
                checkbox:false,
                activeColor:'activeColor'
            }
        },
        props: {
            item: {
                type:Object,
                default:{}
            },
            index: {
                type:Number,
                default: 0
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .song-base
    display:flex
    width:100%
    height:50px
    position:relative
    .num
      width: 40px
      height:50px
      flex-center()
      color:gray
    .song-base-content
      height:50px
      position:absolute
      left:40px
      max-width:250px
      .title
        font-size:$font-size-medium-x
        ellipsis()
        max-width:250px
        height:28px
        line-height:28px
        margin-left:3px
        .title-right
          color:gray
      .desc
        font-size:$font-size-small
        color:gray
        ellipsis()
        max-width:250px
        /*height:22px*/
        /*line-height:22px*/
    .playing
      width: 40px
      height:50px
      flex-center()
      position:absolute
      right:30px
      color:gray
    .more
      width: 40px
      height:50px
      flex-center()
      position:absolute
      right:0
      color:gray

  .activeColor
    color:red !important
</style>
