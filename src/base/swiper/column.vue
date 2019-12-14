<template>
  <div class="sub-column">
    <div class="img">
      <img src="../../components/user/img/login1.png">
    </div>

    <div class="text">
      <h2 class="item-title">每日推荐</h2>
      <p class="item-desc">
        by
        云音乐客服
        阅读1000万
      </p>
    </div>
  </div>
</template>

<script>
    import {serializeNumber} from '../../assets/js/number'
    import {durationsTransformation} from '../../assets/js/timestamp'

    export default {
        name: 'subColumn.vue',
        data () {
            return {
                // playTime:serializeNumber(this.item.playTime ),
                // durations:durationsTransformation(this.item.durationms)
            }
        },
        props: {
            // item: {
            //     type:Object,
            //     default:{}
            // }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .sub-column
    flex-between()
    height:60px
    margin:10px 0
    position:relative
    .img
      height:100%
      width:110px
      border-radius:5px
      position: relative
      background-color:gray
      margin-left:10px
      img
        height:100%
        width:100%
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
