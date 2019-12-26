<template>
  <ul class="wrapper">
    <li v-for="(item,index) in jsons" :key="index">
      <my-dynamic :item="item" :events="events" :index="index"></my-dynamic>
    </li>
  </ul>
</template>

<script>
import myDynamic from "../common/dynamic"
export default {
  components: {
    myDynamic
  },
  props: {},
  data() {
    return {
      events:[],
      jsons:[]
    }
  },
  watch: {},
  computed: {},
  methods: {
    getDynamic () {
      this.$api.users.getDynamic(477726475,30,-1).then(res => {
        this.jsons = res.data.events.map(item => {
          return eval('(' + item.json + ')')
        })
        this.events = res.data.events
        
        console.log(this.jsons)
      })
    }
  },
  created() {
    this.getDynamic()
  },
  mounted() {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
.wrapper
  height:auto
  background-color:white
  // margin-bottom:50px
  li
   height:auto
   width:100%
   border-bottom:.5px solid rgba(128,128,128,.7)
</style>