<template>
  <ul class="wrapper">
    <li class="wrapper-li">
      <div class="li-top">
        <div class="li-top-img">
          <img src="../../user/img/login1.png" alt="">
        </div>
        <div class="li-top-right">
          <div class="li-top-right-user">宝粉帮</div>
          <div class="li-top-right-time">最近</div>
        </div>
      </div>
      <div class="li-bottom">
        <div class="li-bottom-content">
          转发测试
          api内容没找到
          静态填充测试
          ……
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  props: {},
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
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"

  .wrapper
    height:auto
    width:100%
    .wrapper-li
      height:auto
      border-bottom:.5px solid rgba(128,128,128,.2)
      .li-top
        display:flex
        height:40px
        margin:10px
        .li-top-img
          width:40px
          height:40px
          flex-center()
          img 
            height: 35px
            width:35px
            border-radius:50%
        .li-top-right
          margin-left:10px
          height:40px
          flex:1
          .li-top-right-user
            font-size:$font-size-medium - 1
            color:gray
            line-height:25px
          .li-top-right-time
            font-size:$font-size-small
            color:rgba(128,128,128,.8)
            line-height:15px
      .li-bottom
        margin:0 10px 10px 60px
        font-size:$font-size-medium
        .li-bottom-content
          height:100%
          line-height:1.4
          white-space:normal 





</style>