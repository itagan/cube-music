<template>
  <div class="search-box-wrapper">
    <i class="iconfont iconsearch" v-if="fake"></i>
    <!--    这个是虚假的输入框，根据要求，点击输入框会跳进搜索页面才是真正的input-->
    <div v-if="!fake" class="search-box"><i class="iconfont iconsearch"></i>{{placeholder}}</div>
    <label>
      <input
        type="text"
        class="my-input"
        :placeholder="placeholder"
        ref="input"
        v-model="query"
        v-if="fake"
      >
    </label>
    <i class="iconfont icondel2" v-show="query" @click="reset"></i>
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
       }),
       fake (isShow) {
         if (isShow) {
           this.$nextTick(() => {
             this.focus()
           })
         }
       }
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
      background-color: rgba(238,238,238,.9)
      border-radius: 15px
      font-size: $font-size-medium
      position:relative
      /*border:1px solid green*/
      .iconfont
        font-size: $font-size-medium
      .search-box
        flex: none
        background: none
        border: none
        margin: 0 6px
        color: #666
        line-height: 30px
        text-align:center
        font-size:$font-size-medium
        width:100%
        height:100%
      .icon-search
        font-size:$font-size-medium
        margin-right:3px
      .icondel2
        font-size:$font-size-large
        position:absolute
        right:5px
        background-color:#dcdcdc
        border-radius:50%
        color:white


    label
      width:100%
      .my-input
        flex: 1
        margin:0 6px
        height:30px
        width:100%
        background-color:rgba(238,238,238,.9)
        border:0
        outline: none
        border-top-right-radius:15px
        border-bottom-right-radius:15px


</style>
