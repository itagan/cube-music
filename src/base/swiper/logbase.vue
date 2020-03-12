<template>
  <div class="log-base">
    <div class="img" v-if="item.resource.mlogBaseData.coverUrl">
      <img :src="item.resource.mlogBaseData.coverUrl" alt="">
      <i class="iconfont iconbofang1" v-if="item.resource.mlogBaseData.type === 2"></i>
    </div>
    <div class="label" v-if="item.resource.mlogBaseData.talk">#{{item.resource.mlogBaseData.talk.talkName}}</div>

    <div class="content">
      <div class="title">
          {{item.resource.mlogBaseData.text}}
      </div>
      <div class="content-bottom" v-if="item.resource.userProfile">
        <img :src="item.resource.userProfile.avatarUrl" alt="">
        <span class="nick-name">
           {{item.resource.userProfile.nickname}}
        </span>
        <span class="praise" v-if="item.resource.mlogExtVO.likedCount">
          {{item.resource.mlogExtVO.likedCount}}赞
        </span>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'logBase.vue',
      props: {
        item: {
          type: Object,
          default: {}
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .log-base
    width:160px
    height:auto
    border-radius:10px
    position:relative
    background-color:white
    font-size:$font-size-medium
    margin:auto 10px
    box-shadow:0 0.5px 1.5px 1.5px rgba(0,0,0,.1) 
    // border:1px solid white
    .img
      height:auto
      width:160px
      border-top-left-radius:10px
      border-top-right-radius:10px
      position:relative
      img
        // max-height:500px
        height:160px
        width:160px
        border-top-left-radius:10px
        border-top-right-radius:10px
      i 
       position:absolute
       top:8px  
       right:8px
       color:white
    .label
      position:absolute
      color:white
      bottom:95px
      left:10px
      background-color:rgba(0,0,0,.4)
      height:15px
      line-height:15px
      width:125px
      ellipsis()
      font-size:$font-size-small
      padding:5px 10px
      border-radius:8px
    .content
      height:80px
      width:160px
      .title
        height:40px
        // width:100%
        margin:0 5px
        line-height:1.4
        multiline-ellipsis($num=2)
      .content-bottom
        height:40px
        width:100%
        color:gray
        font-size:$font-size-small
        flex-between()
        position:relative
        img
          width:15px
          height:15px
          border-radius:50%
          margin-left:5px
        .nick-name
          position:absolute
          left:25px
        .praise
          margin-right:5px
</style>
