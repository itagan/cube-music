<template>
  <my-header class="header">
    <div slot="left" @click="toBack" class="list-left">
      <i class="iconfont iconfanhui"></i>
    </div>
    <ul slot="center" class="list-center">
        <li class="list-center-title">{{profile.name}}</li>
        <li class="list-center-name" v-if="profile.artists || profile.ar">
          <span>{{Trans(profile.artists || profile.ar)}}</span>
          <i class="iconfont iconleft-arrow"></i>
        </li>
    </ul>
    <div  slot="right" class="list-right">
      <!-- <span @click="music">
        <img src="../user/img/login1.png" alt="" class="img">
      </span> -->
      <i class="iconfont iconfenxiang" @click="more"></i>
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
        }
      },
      props: {
        profile: {
          type: Object,
          default: {}
        }
      },
      methods: {
        toBack () {
          this.$emit('close')
        },
        more () {

        },
        music () {

        },
        Trans (alias) {
          let arr = []
          for (let i = 0; i < alias.length; i++) {
            arr.push(alias[i].name)
          }
          return arr.join('/')
        }
        // opacityHeader (opac) {
        //   this.$refs.Header.style.opacity = opac
        // }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .header
    background-color:transparent
    font-weight:bold
    .list-left
      i
        font-size:$font-size-large-x + 2
    .list-center
      .list-center-title
        font-size:$font-size-medium-x
        flex-vertical()
        text-align:center
      .list-center-name 
        font-size:$font-size-medium 
        flex-vertical()
        margin-top:2px 
        opacity: .8
    .list-right
      flex-vertical()
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
      i
        margin-left: 10px
        font-size:$font-size-large-x + 5  
</style>
