<template>
  <my-header class="header">
    <i class="iconfont iconlive" slot="left" @click="cloud"></i>
    <div slot="center" class="music">我的音乐</div>
    <i class="iconfont iconyinletiaodongzhuangtai" slot="right" @click="music"></i>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    export default {
        name: "header.vue",
        components:{
            MyHeader,

        },
        data(){
            return {

            }
        },
        methods: {
            cloud() {

            },
            music() {

            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

    .music
      font-size:$font-size-medium-x

</style>
