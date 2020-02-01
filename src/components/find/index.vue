<template>
  <div class="wrapper">
     <find-header></find-header>
     <router-view></router-view>
  </div>
</template>

<script>
 import FindHeader from './header'
export default {
  components: {
     FindHeader,
  },
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
     height:auto
</style>