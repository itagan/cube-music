<template>
  <div class="nav-flex">
<!--    注意，下边的to一定要有，不然报错。-->
    <router-link tab="div" class="nav-item" v-for="item in result" :key="item.id" v-if="result.length" to="/my">
      <div class="nav-div">
        <img :src="item.picUrl" class="nav-img">
        <div class="nav-img-div">
          <i class="iconfont iconzan1"></i>
          <span class="nav-num">{{item.playCount}}</span>
        </div>
      </div>
      <div class="nav-title">{{item.name}}</div>
    </router-link>
  </div>
</template>

<script>
  import {serializeNumber} from '../../assets/js/number'
  export default {
    name: 'nav.vue',
    props: {
      result: {
        type: Array,
        default: [],
        required: true
      }
    },
    watch: {
      result (val) {
        for (let i = 0; i < val.length; i++) {
          val[i].playCount = serializeNumber(val[i].playCount)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
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
        .nav-img-div
          position:absolute
          top:5px
          right:5px
          color:white
          font-size:8px
          height:10px
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
