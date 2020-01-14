<template>
  <my-header class="header">
    <div slot="left" @click="toBack" class="user-list-left">
      <i class="iconfont iconfanhui"></i>
    </div>
    <ul slot="center" class="user-list" v-show="isShow" ref="Header" v-if="!profile.followTime && profile.userId !== 477726475">
        <li class="user-list-name"> 
          <div class="user-list-name-nick">{{profile.nickname}}</div>
          <div class="user-list-name-fan">
            <span>{{profile.followeds}}</span>
            粉丝
          </div>
        </li>
        <li class="user-list-follow">
          + 关注
        </li>
    </ul>
    <div v-if="profile.followTime && profile.userId !== 477726475" class="user-list-only-name" slot="center" v-show="isShow" ref="Header">
      <span>
         {{profile.nickname}}
      </span>
    </div>

    <div v-if="profile.userId === 477726475" class="user-list-only-name" slot="center" v-show="isShow" ref="Header">
      <span>
         {{profile.nickname}}
      </span>
    </div>
    
    <div  slot="right" class="user-img">
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
        profile: {
          type: Object,
          default: {}
        },
        isShow: {
          type: Boolean,
          default: false
        }
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
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .header
    /*background-color:transparent*/
    font-weight:bold
    .user-list
      flex-between()
      margin-right:60px
      width:250px
      opacity:0
      .user-list-name
        height:100%
        width:170px
        font-size:$font-size-medium
        .user-list-name-nick
          height:30px
          line-height:3
          width:170px
          ellipsis()
        .user-list-name-fan
          font-size:$font-size-small
          color:silver
          height:20px
          width:150px
          ellipsis()
      .user-list-follow
        width:65px
        height:25px
        border-radius:15px
        flex-center()
        font-size:$font-size-medium
        color:white
        background-color:red
    .user-list-only-name
      font-size:$font-size-medium-x
      opacity:0
    
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
