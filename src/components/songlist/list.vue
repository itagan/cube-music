<template>
  <ul class="ul-list">
    <li v-for="(item, index) in tracks" :key="item.id">
      <song-base :item="item" :index="index"></song-base>
    </li>
  </ul>
</template>

<script>
    import songBase from "../../base/song/songbase";
    export default {
        name: "list.vue",
        components: {
            songBase
        },
        props: {
            tracks: {
                type:Array,
                default:[]
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .ul-list
    height:auto
    width:375px
    background-color:white

</style>
