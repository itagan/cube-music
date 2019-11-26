<template>
  <div class="mask" @click.self="cancel">
    <!--    .self 只有点击当前元素的时候，才会触发处理事件-->
    <div class="build">
      <div class="build-top" v-if="$slots.top">
        <slot name="top"></slot>
      </div>

      <ul class="build-center">
        <li v-if="$slots.main1">
         <slot name="main1"></slot>
        </li>

        <li v-if="$slots.main2">
          <slot name="main2"></slot>
        </li>

        <li v-if="$slots.main3">
          <slot name="main3"></slot>
        </li>

        <li v-if="$slots.main4">
          <slot name="main4"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "buildlist.vue",
        data() {
            return {
            }
        },
        props:{
            title:{
                type:String,
                default:''
            },

        },
        methods: {
            //提交创建的歌单
            cancel() {
                //触摸到遮罩层就取消本组件
                this.$emit('cancel');
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .mask
    width:100%
    height:100%
    position:fixed //解决错乱bug
    top:0
    background-color:gray
    background: rgba(0, 0, 0, 0.5)
    z-index:1000 //遮罩层需要更高
    .build
      width:100%
      height:auto
      background-color:white
      /*opacity:1*/
      border-top-left-radius:15px
      border-top-right-radius:15px
      font-size:$font-size-medium
      z-index:1001
      position:fixed
      bottom:0
      .build-top
        height:45px
        line-height:45px
        padding-left:10px
        width:100%
        border-bottom:.5px solid rgba(128, 128, 128, 0.3)
        color:gray
        font-size:$font-size-small
      .build-center
        width:100%
        margin:auto 10px
</style>
