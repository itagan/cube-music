<template>
  <div class="sub-video">
    <div class="img">
      <img v-lazy="item.imgurl">
      <div class="playtime">
        <i class="iconfont iconCell-PlayVolume"></i>
        <span>{{SerializeNumber(item.playCount)}}</span>
      </div>
    </div>

    <div class="text">
      <h2 class="item-title" v-html="item.name"></h2>
      <p class="item-desc">
        {{item.publishTime}}
      </p>
    </div>
  </div>
</template>

<script>
    import {serializeNumber} from '../../assets/js/number'
    import {durationsTransformation} from '../../assets/js/timestamp'

    export default {
      name: 'subVideo.vue',
      data () {
        return {
          
        }
      },
      props: {
        item: {
          type: Object,
          default: {}
        }
      },
      methods:{
        SerializeNumber (num) {
          return serializeNumber(num)
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

    .sub-video
      flex-between()
      height:60px
      margin:10px 0
      position:relative
      .img
        height:100%
        width:100px
        border-radius:5px
        position: relative
        background-color:gray
        margin-left:10px
        img
          height:100%
          width:100%
        .playtime
          position:absolute
          top:5px
          right:5px
          font-size:$font-size-small
          color:white
      .text
        flex:1
        height:100%
        margin-left:15px
        .item-title
          font-size:$font-size-medium
          word-break:wrap
          height:40px
          line-height:1.2
          multiline-ellipsis($num=2)
        .item-desc
          font-size:$font-size-small
          color:gray
</style>
