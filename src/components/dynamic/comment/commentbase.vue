<template>
    <ul class="comment">
      <li v-for="item in comments" :key="item.commentId">
        <base-comment :item="item" class="base-comment"></base-comment>
      </li>
    </ul>
</template>

<script>
import baseComment from '../../../base/basecomment/basecomment'
export default {
  components: {
    baseComment
  },
  props: {},
  data () {
    return {
      comments: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    getComment () {
      this.$api.users.dynamicComment('A_EV_2_6559519868_32953014').then(res => {
        this.comments = res.data.comments
        console.log(this.comments)
      })
    }
  },
  created () {
    this.getComment()
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .comment
    width:375px
    height:auto
    li
     height:auto
     margin:auto 10px
</style>