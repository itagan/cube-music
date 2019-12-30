<template>
  <transition name="fade-forward" v-show="visible">
    <div class="wrapper">
      <my-header class="my-header">
        <span slot="left" @click="cancel">取消</span>
        <span slot="center" @click="cancel">转发</span>
        <span @click="send" slot="right">发送</span>
      </my-header>
      <cube-input
        v-model="value"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :clearable="clearable"
        @input="input"
        class="my-input"
      ></cube-input>
    </div>
  </transition>
</template>

<script>
import MyHeader from '../../base/navbar/navbar'
export default {
  components: {
    MyHeader
  },
  props: {},
  data () {
    return {
      visible: false,
      value: '',
      placeholder: '一起聊聊吧',
      autofocus: true,
      clearable: {
        visible: true,
        blurHidden: true
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    forWardDynamic () {
      this.uid = this.$route.params.uid
      this.evId = this.$route.params.evId
      this.$api.users.forWardDynamic(this.evId, this.uid, this.value).then(res => {
        console.log(res)
        if (res.data && res.data.code === 200) {
          this.value = ''
          this.cancel()
          const toast = this.$createToast({
            txt: '转发成功',
            type: 'correct',
            zIndex: 2002
          })
          toast.show()
        }
      })
    },
    cancel () {
      this.visible = false
      this.$router.back()
    },
    send () {
      this.forWardDynamic()
    },
    input (val) {
            // 输入中
      if (val.length > 140) {
        const toast = this.$createToast({
          zIndex: 2002,
          txt: '超出字数限制',
          type: 'error'
        })
        toast.show()
      }
    }
  },
  created () {
    this.visible = true
  },
  mounted () {}
}
</script>
<<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .wrapper
    height:667px
    width:375px
    position: absolute
    top: 0
    bottom: 0
    left: 0
    z-index:2001
    background-color:white
    .my-header
      font-size:$font-size-medium-x
    .my-input >>>
      margin-top:50px
      height:auto
      outline:none
      border:none
      .cube-input-field 
        border:0;/*去掉未选中状态边框*/

        outline:none;/*去掉选中状态边框*/

        background-color:rgba(0,0,0,0);/*透明背景*/

 /*动画效果*/
  .fade-forward-enter-active,
  .fade-forward-leave-active
    transition: transform .4s ease-in

  .fade-forward-enter,
  .fade-forward-leave-to
    transform: translateY(667px)   
</style>