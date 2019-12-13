<template>
  <div class="collection">
    <my-header></my-header>
    <album></album>
  </div>
</template>

<script>
    import myHeader from './header'
    import Album from "./album";
    export default {
        name: "myCollectionList.vue",
        components: {
            myHeader,
            Album
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
