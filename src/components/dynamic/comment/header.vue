<template>
  <my-header class="header">
    <div slot="left" @click="toBack" class="user-list-left">
      <i class="iconfont iconfanhui"></i>
    </div>
    <ul slot="center" class="user-list" ref="Header" v-if="isShow">
        <li class="user-list-name">
          <img src="../../user/img/login1.png" alt="" class="img">
        </li>
        <li class="user-list-name-nick">
          宝粉帮
        </li>
    </ul>
    <div class="user-list-forward" slot="center" v-if="!isShow" ref="Header">
          动态
    </div>
    <div  slot="right" class="user-img">
      <i class="iconfont icongengduo" @click="more"></i>
      <span @click="music">
        <img src="../../user/img/login1.png" alt="" class="img">
      </span>
    </div>
  </my-header>
</template>

<script>
    import MyHeader from '../../../base/navbar/navbar'
    export default {
      name: 'header.vue',
      components: {
        MyHeader
      },
      data () {
        return {
          isShow:false
        }
      },
      props: {
        profile: {
          type: Object,
          default: {}
        },
        // isShow: {
        //   type: Boolean,
        //   default: false
        // }
      },
      methods: {
        toBack () {
          this.$router.go(-1)
        },
        more () {

        },
        music () {

        },
        opacityHeader (opac) {
          this.$refs.Header.style.opacity = opac
            // this.$refs.otherHeader.style.opacity = Math.abs(1 - opac)
        },
        show () {
          this.isShow = true
        },
        _show () {
          this.isShow = false
        }
      },
      mounted() {
        this.$nextTick(() => {
          //初始化显示  "动态" 。css则为0
          this.$refs.Header.style.opacity = 1
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

  .header
    background-color:white
    font-weight:bold
    .user-list
      display:flex
      opacity:0
      height:100%
      line-height:50px
      .user-list-name
        flex-center()
        height: 50px
        .img
          width:26px
          height:26px
          border-radius:50%
      .user-list-name-nick
        margin-left:10px
        height: 50px
        flex-center()
        font-size:$font-size-medium-x
    .user-list-forward
      font-size:$font-size-medium-x
      opacity:0
      height:50px
      line-height:50px

    .user-img
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
