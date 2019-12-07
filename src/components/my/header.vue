<template>
  <my-header class="header">
    <i class="iconfont iconlive" slot="left" @click="cloud"></i>
    <div slot="center" class="music">我的音乐</div>
    <i class="iconfont iconyinletiaodongzhuangtai" slot="right" @click="music" v-show="isComplete"></i>
    <span @click="complete" v-show="!isComplete" slot="right">完成</span>
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
      methods: {
        cloud () {

        },
        music () {

        },
        ischange () {
          this.isComplete = false
        },
        complete () {
              // 点击完成，其他归位
          this.isComplete = true
          this.$emit('complete')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
    .music
      font-size:$font-size-medium-x
    span
      color:gray
      font-size:$font-size-medium-x
</style>
