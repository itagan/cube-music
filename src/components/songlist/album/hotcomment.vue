<template>
  <ul class="hot-comment">
    <li v-for="(item,index) in hotComments" :key="item.commentId" ref="_liOffset" @click="_Reply(index)">
      <base-comment :item="item" class="base-comment" :hasReplyArr="ReplyArr"></base-comment>
    </li>
  </ul>
</template>

<script>
import baseComment from '../../../base/basecomment/basecomment'
export default {
  components: {
    baseComment
  },
  props: {
    hotComments: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  height: auto
</style>