<template>
  <div class="collection">
    <my-header></my-header>
<!--    <album></album>-->
    <singer></singer>
  </div>
</template>

<script>
    import myHeader from './header'
    import Album from "./album"
    import Singer from './singer'
    export default {
        name: "myCollectionList.vue",
        components: {
            myHeader,
            Album,
            Singer
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .collection
    position: relative
    width:375px

</style>
