<template>
  <div class="search-box-wrapper">
    <i class="iconfont iconsearch" v-if="!fake"></i>
    <!--    这个是虚假的输入框，根据要求，点击输入框会跳进搜索页面才是真正的input-->
    <div v-if="fake" class="search-box"><i class="iconfont iconsearch"></i>{{placeholder}}</div>
    <label>
      <input
        type="text"
        class="search-box"
        :placeholder="placeholder"
        ref="input"
        v-model="query"
        v-if="!fake"
      >
    </label>
    <i class="iconfont iconsearch" v-show="query" @click="reset"></i>
  </div>
</template>

<script>
   import {debounce} from '../../assets/js/debounce'
   export default {
     name: 'search.vue',
     data () {
       return {
                // 双向数据绑定：输入框input的value发生变化，v-model中query相应发生变化；反之也是；
         query: ''
       }
     },
     props: {
       placeholder: {
         type: String,
         default: '请输入需要搜索的歌曲'
       },
       fake: {
         type: Boolean,
         default: false
       }
     },
     methods: {
       focus () {
         this.$refs.input && this.$refs.input.focus()
       },
       clear () {
         this.query = ''
       },
       reset () {
         this.clear()
         this.focus()
       }
     },
     watch: {
       query: debounce(function () {
         this.$emit('query', this.query)
       })
     }
   }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
    .search-box-wrapper
      height: 30px
      display: flex
      align-items: center
      flex:1
      padding: 0 7px
      width: 100%
      background-color: rgb(245,245,245)
      border-radius: 15px
      border:1px solid green
      .iconfont
        font-size: $font-size-medium
      .search-box
        flex: 1
        background: none
        border: none
        margin: 0 6px
        color: #666
        line-height: 1.5
        text-align:center
        font-size:$font-size-medium
      .icon-search
        font-size:$font-size-medium
        margin-right:3px
</style>
