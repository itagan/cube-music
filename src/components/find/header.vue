<template>
  <my-header>
    <i class="iconfont icondiantai" slot="left"></i>
    <div>aaa</div>
    <i class="iconfont iconyinletiaodongzhuangtai" slot="right"></i>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    export default {
        name: "header.vue",
        components:{
            MyHeader
        }
    }
</script>

<style scoped>

</style>
