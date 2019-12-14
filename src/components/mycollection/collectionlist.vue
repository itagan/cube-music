<template>
  <div class="collection">
    <my-header></my-header>
    <slider></slider>
  </div>
</template>

<script>
    import myHeader from './header'
    import Slider from './slider'
    export default {
        name: "myCollectionList.vue",
        components: {
            myHeader,
            Slider
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .collection
    position: relative
    width:375px
    /*.slide*/
    /*  margin-top:50px*/
</style>
