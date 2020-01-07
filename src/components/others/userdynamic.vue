<template>
  <ul class="wrapper">
    <li v-for="(item,index) in jsons" :key="index">
      <my-dynamic :item="item" :events="events" :index="index"></my-dynamic>
    </li>
  </ul>
</template>

<script>
import myDynamic from '../dynamic/dynamic'
export default {
  components: {
    myDynamic
  },
  props: {
    profile: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      events: [],
      jsons: [],
      lasttime:-1,
      hasMore:true
    }
  },
  watch: {
    profile () {
      this.getDynamic(this.profile.userId, 10, -1)
    }
  },
  computed: {},
  methods: {
    getDynamic (userId, limit, lasttime) {
      this.$api.users.getDynamic(userId, limit, lasttime).then(res => {
        // this.lasttime = res.data.lasttime
        // this.hasMore = res.data.more
        if (this.hasMore) {
          this.hasMore = res.data.more
          this.lasttime = res.data.lasttime
          this.$emit('Lasttime',this.lasttime, this.hasMore)
        }
         this.events = this.events.concat(res.data.events) 
         this.jsons = this.events.map(item => {
          return JSON.parse(item.json)
        })
        // this.jsons = res.data.events.map(item => {
        //   // return eval('(' + item.json + ')')
        //   return JSON.parse(item.json)
        // })
        // this.events = res.data.events
        
        // console.log(this.jsons)
        // console.log(this.events)
      })
    }
  },
  created () {},
  mounted () {}
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