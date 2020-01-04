<template>
    <div class="my-log">
      <div class="log-title">
        赞过的Mlog
        <span>3</span>
        </div>
      <log-base></log-base>
    </div>
</template>

<script>
    import logBase from '../../base/swiper/logbase'
export default {
      name: 'mLog.vue',
      components: {
        logBase
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .my-log
    margin-top:80px
    .log-title
      font-size:$font-size-medium-x
      font-weight:bold
      margin:10px
      span
        font-size:$font-size-medium
        color:gray

</style>
