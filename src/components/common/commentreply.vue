<template>
  <div class="wrapper">
     <my-header class="header">
      <div slot="left" @click="toBack" class="user-list-left">
        <i class="iconfont iconfanhui"></i>
      </div>
      
      <div class="user-list-forward" slot="center">
            回复
            <span>11</span>
      </div>
      <div  slot="right">
        <i class="iconfont iconbofangzhuangtaizanting" @click="music"></i>
      </div>
  </my-header>
  </div>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
export default {
  components: {},
  props: {},
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .wrapper
</style>