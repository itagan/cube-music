<template>
  <div class="search-box-wrapper">
    <div v-if="!fake" class="search-box"><i class="iconfont iconsearch"></i>{{placeholder}}</div>

    <div class="search-input" v-if="fake">
      <div class="search-icon"><i class="iconfont iconsearch"></i></div>
      <label>
        <input
          type="text"
          class="my-input"
          :placeholder="placeholder"
          ref="input"
          v-model="query"
        >
      </label>
      <div class="cancel" @click="cancel">取消</div>
    </div>
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
        },
        cancel () {
          // this.fake = false
          this.clear()
          this.$emit('cancel')
        },
        hide () {
          this.fake = false
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
    width: 100%
    font-size: $font-size-medium
    .search-box
      color: #666
      line-height: 30px
      text-align:center
      font-size:$font-size-medium
      width:100%
      height:100%
      background-color: rgba(238,238,238,.1)
      border-radius: 15px
      .icon-search
        margin-right:3px

    .search-input
      display:flex
      align-items: center
      width:100%
      height:100%
      .search-icon
        height:30px
        font-size:$font-size-medium-x
        width:30px
        line-height:30px
        text-align:center
        /*position:absolute*/
        /*left:20px*/
      label
        color: #666
        line-height: 30px
        height:30px
        flex:1
        /*margin: 0 6px*/
        /*position:relative*/
        .my-input
          width:100%
          color: #666
          line-height: 30px
          border-radius: 15px
          border:0
          outline: none
          background-color: rgba(238,238,238,.9)
      .cancel
        width:40px
        height:30px
        flex-center()
        font-size:$font-size-medium-x



  .iconfont
    font-size: $font-size-medium

</style>
