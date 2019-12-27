<template>
  <my-header class="header">
    <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
    <div slot="center" class="song-list">{{title}}</div>
    <div  slot="right" class="song-img">
      <i class="iconfont icongengduo" @click="more"></i>
      <span @click="music">
        <img src="../user/img/login1.png" alt="" class="img">
      </span>
    </div>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    export default {
        name: 'header.vue',
        components: {
            MyHeader
        },
        data () {
            return {
                isComplete: true
            }
        },
        props: {
            title:{
                type:String,
                default:''
            }
        },
        methods: {
            toBack () {
                this.$router.go(-1)
            },
            more () {

            },
            music () {

            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .header
    font-size:$font-size-large
    background-color:transparent
    font-weight:bold
    .song-list
      overflow:hidden
    .song-img
      flex-center()
      i
        margin-right:20px
        font-size:$font-size-large-x
      span
        width:30px
        height:30px
        background-color:gray
        flex-center()
        border-radius:50%
        .img
          width:26px
          height:26px
          border-radius:50%
</style>
