<template>
  <div class="mask" @click.self="cancel">
    <div class="build">
      <ul class="build-top" v-show="isVip">
        <li class="li-img">
          <img src="../user/img/login1.png" alt="">
        </li>
        <li class="li-content">
            <span class="li-title">苦笑</span>
            <span class="li-desc">阿感</span>
        </li>
        <li class="li-vip">
          开通vip
        </li>
      </ul>

      <div v-show="isVip">开通vip畅享千万曲库下载特权</div>

      <ul class="build-top" v-show="!isVip">
        <li class="li-img">
          <img src="../user/img/login1.png" alt="">
        </li>
        <li class="li-content">
            <span class="li-title">苦笑</span>
            <span class="li-desc">阿感</span>
        </li>
      </ul>

      <ul class="build-center">
        <li>
          <div>
            <i></i>
          </div>
          <div>
            <span></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "playMore.vue",
        props: {
            title: {
                type: String,
                default: ''
            },
            isVip : {
                type:Boolean,
                default:false
            }
        },
        methods: {
            cancel () {
                // 触摸到遮罩层就取消本组件
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .mask
    width:100%
    height:100%
    position:fixed
    top:0
    background-color:transparent
    /*opacity:0.4*/
    z-index:1 //遮罩层需要更高
    left:0
    opacity: 0.7
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
        min-height:45px
        line-height:45px
        padding-left:10px
        width:100%
        border-bottom:.5px solid rgba(128, 128, 128, 0.3)
        color:gray
        font-size:$font-size-small
        display:flex
        position:relative
        .li-img
          position:absolute
          left:10px
          img
            height:30px
            width:30px
            border-radius:3px
        .li-content
          position:absolute
          left:45px
          .li-title
            font-size:$font-size-medium
            max-width:210px
            margin-left:5px
            ellipsis()
            height:23px
          .li-desc
            font-size:$font-size-small
            color:gray
            height:22px
        .li-vip
          height:16px
          width:35px
          border-radius:5px



      .build-center
        width:100%
        margin:auto 10px
        height:200px
</style>
