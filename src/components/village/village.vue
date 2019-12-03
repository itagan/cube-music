<template>
  <div class="village">
    <video-wonderful class="wonderful"></video-wonderful>
  </div>
</template>

<script>
    import videoWonderful from "../common/videowonderful";
    export default {
        name: 'village.vue',
        components: {
            videoWonderful
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .village
    height:667px
    width:375px
    .wonderful
      height:100%
      width:100%

</style>
