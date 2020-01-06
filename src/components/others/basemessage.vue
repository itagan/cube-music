<template>
  <div class="base-message">
    <my-header class="header">
      <div slot="left" @click="toBack" class="user-list-left">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div slot="center" class="user-list-center">
        基本信息
      </div>
      <div  slot="right" class="user-img" @click="music">
        <img src="../user/img/login1.png" alt="" class="img">
      </div>
    </my-header>

    <div class="message">
      <div v-if="profile.allAuthTypes" class="message-authentication">
        <div>认证信息</div>
        <ul>
          <li v-for="(item, index) in profile.allAuthTypes" :key="index">
            <i class="iconfont iconQQkongjian"></i>
            <span>
              {{item.desc}}
            </span>
          </li>
        </ul>
      </div>
      <ul class="message-detail">
        <li class="message-detail-user">个人信息</li>
        <li class="message-detail-user-lv">
          等级：
          <span>Lv
          {{level}}
          </span>
        </li>
        <li>
          性别: 
          <span v-if="profile.gender === 0"></span>
          <span v-if="profile.gender === 1">男</span>
          <span v-if="profile.gender === 2">女</span>
        </li>
        <li>
          年龄：<span>{{profile.birthday}}</span>
        </li>
        <li>
          地区：<span>{{profile.city}}</span>
        </li>
        <li>
          大学：<span>北大</span>
        </li>
      </ul>
      <div class="message-brief">
        <div class="message-brief-user">个人简介</div>
        <div class="message-brief-detail" v-if="profile.signature">
          <!-- <pre>
          {{profile.signature}}
          </pre> -->
          {{profile.signature}}
        </div>
        <div class="message-brief-detail" v-if="!profile.signature">还没有填写个人介绍</div>
      </div>
    </div>
  </div>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    export default {
      name: 'baseMessage.vue',
      components: {
        MyHeader
      },
      data () {
        return {
          authentication: false,
          level: 0,
          profile: {}
        }
      },
      created () {
        this.getUser()
      },
      methods: {
        getUser () {
          this.profile = JSON.parse(this.$route.query.profile)
          this.level = this.$route.query.level
        },
        toBack () {
          this.$router.go(-1)
        },
        music () {

        }
      },
      watch: {
        'router':'getUser'
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .base-message
    background-color:white
    height:auto
    width:100%
    overflow-y:hidden
    .header
      background-color:white
      .user-list-center
        font-size:$font-size-medium-x
        color:black
      .user-img
        .img
          width:26px
          height:26px
          border-radius:50%

    .message
      margin:50px 10px 10px
      font-size:$font-size-small
      color:gray
      .message-authentication
        margin-top:50px
        div
          height:30px
          line-height:30px
          font-size:$font-size-medium
          color:black
        ul
          height:auto
          li
            height:25px
            line-height:25px
            i
              color:orange
      .message-detail
        margin-top:20px
        height:auto
        li
          height:25px
          line-height:25px
        .message-detail-user
          font-size:$font-size-medium
          color:black
        .message-detail-user-lv
          span
            height:15px
            width:40px
            text-align:center
            line-height:15px
            border:1px solid gray
            border-radius:8px
            font-size:$font-size-small

      .message-brief
        margin-top:20px
       .message-brief-user
         font-size:$font-size-medium
         color:black
         height:25px
         line-height:25px
       .message-brief-detail
         height:auto
         overflow:hidden
         /*padding-bottom:100% *///占满剩下空间



</style>
