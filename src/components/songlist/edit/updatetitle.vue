<template>
<transition name="fade-forward" v-show="visible">
  <div class="wrapper" v-show="visible">
    <my-header class="header">
      <span slot="left" @click="cancel">取消</span>
      <div slot="center">
        <span>歌单标题</span>
      </div>
      <span @click="complete" slot="right">完成</span>
    </my-header>

    <cube-input
      v-model="value"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :clearable="clearable"
      :maxlength="maxlength	"
      @input="input"
      class="my-input"
    ></cube-input>
   </div>
  </transition>
</template>

<script>
import MyHeader from '../../../base/navbar/navbar'
export default {
  components: {
    MyHeader
  },
  props: {
    playlist: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      visible: false,
      hackReset: true,
      value: '',
      placeholder: '歌单标题',
      autofocus: true,
      maxlength: 6,
      clearable: {
        visible: true,
        blurHidden: true
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    cancel () {
      this.hackReset = false // 刷新重新传值
      // this.value = this.playlist.tags.slice(0)
      this.$nextTick(() => {
        this.visible = false
        this.hackReset = true
      })
    },
    complete () {
      this.visible = false
      this.$api.songLists.updatename(this.playlist.id, this.value).then(res => {
        console.log(res.data)
      })
      this.playlist.name = this.value
    },
    show () {
      this.visible = true
    },
    input (val) {
            // 输入中
      if (val.length > 5) {
        this.value = val.slice(0, 5)
        const toast = this.$createToast({
          zIndex: 2003,
          txt: '超出字数限制',
          type: 'error'
        })
        toast.show()
      }
    }

  },
  created () {
    this.value = this.playlist.name
    this.autofocus = true
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .wrapper
    height:667px
    width:375px
    position: absolute
    top: 0
    bottom: 0
    left: 0
    z-index:2002
    background-color:white
    .header
      font-size:$font-size-medium-x
    .my-input >>>
      margin-top:60px
      height:50px
      outline:none
      border:none
      background-color:white
      .cube-input-field 
        border:0;/*去掉未选中状态边框*/
        outline:none;/*去掉选中状态边框*/
        background-color:rgba(0,0,0,0)/*透明背景*/
      input 
        outline:none
        resize:none  


    .cube-input_active::after
      border-color:rgba(0,0,0,0)


    /*动画效果*/
  .fade-forward-enter-active,
  .fade-forward-leave-active
    transition: transform .3s ease-in

  .fade-forward-enter,
  .fade-forward-leave-to
    transform: translateY(667px)  

</style>