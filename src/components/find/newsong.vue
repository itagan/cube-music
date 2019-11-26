<template>
  <div class="newsongs">
    <div class="newsongsTop">
      <div class="newsongsLeft">
        <span class="newLeft" @click="newLeft()">新碟</span>
        <span class="newCenter"></span>
        <span class="newRight" @click="newRight()">新歌</span>
      </div>
      <router-link tab="div" class="newsongsRight" to="/my" v-if="isshow">更多新碟</router-link>
      <router-link tab="div" class="newsongsRight" to="/my" v-if="show">新歌推荐</router-link>
    </div>

    <div class="nav-flex" v-if="isshow">
      <router-link tab="div" class="nav-item" v-for="item in result" :key="item.id" v-if="result.length" to="/my">
        <div class="nav-div">
          <img :src="item.picUrl" class="nav-img">
        </div>
        <div class="nav-title">{{item.name}}</div>
      </router-link>
    </div>

    <div class="nav-flex" v-if="show">
      <div class="nav-item" v-for="item in result" :key="item.id" v-if="result.length">
        <div class="nav-div">
          <img :src="item.picUrl" class="nav-img">
          <div class="nav-imgdiv" @click="player()"></div>
        </div>
        <div class="nav-title">{{item.name}}</div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'newsong.vue',
      data () {
        return {
          isshow: true,
          show: false,
          result: []
        }
      },
      created () {
        this.getResults()
      },
      methods: {
        getResults () {
          this.$api.find.recommend().then((res) => {
            this.result = res.data.result
          })
        },
        newLeft () {
          this.isshow = true
          this.show = false
        },
        newRight () {
          this.isshow = false
          this.show = true
        },
        player () {
                // 播放歌曲但不打开播放页面，阻止事件冒泡
                // e.preventDefault()
                // event.stopPropagation()
                // this.$router.push({path:`/my`})
          console.log('播放')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .newsongs
    margin:0 10px
    margin-top:20px
    .newsongsTop
      height:20px
      flex-between()
      .newsongsLeft
        font-weight:bold
        font-size:$font-size-large
        flex-between()
        .newLeft
          /*float:left*/
        .newCenter
          display:flex
          height:15px
          width:1px
          background-color:#dcdcdc
          margin:auto 5px
        .newRight
          /*float:right*/
      .newsongsRight
        color:black
        font-size:$font-size-small
        line-height:20px
        height:20px
        width:60px
        text-align:center
        border-radius: 8px
        border:1px solid gray

  .nav-flex
    display:flex
    flex-wrap:wrap
    margin-top:15px
    flex-between()
    .nav-item
      width:30%
      height:130px
      flex:1
      max-width:30%
      min-width:30%
      margin-bottom:20px
      .nav-div
        position:relative
        width:110px
        height:110px
        .nav-img
          width:100%
          margin-bottom:100%
        .nav-imgdiv
          position:absolute
          bottom:3px
          right:3px
          color:white
          font-size:8px
          height:25px
          width:25px
          border-radius:50%
          background-color:#dcdcdc
          opacity:0.8
          display: flex
        .nav-imgdiv:after
          position: absolute
          left:9px
          top:9px
          margin-top:-3.5px
          content: ''
          width: 0
          height: 0
          border-left: 7px solid red
          border-right: 7px solid transparent
          border-bottom: 7px solid transparent
          border-top:7px solid transparent
      .nav-title
        color:gray
        font-size:$font-size-small
        multiline-ellipsis($num=2)
        width:110px
        wrap:break-words
        height:auto
        margin-top:5px
        line-height:1.2
</style>
