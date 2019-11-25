<template>
  <div class="mask" @click="cancel">
    <div class="build">
      <div class="build-top">
        <span @click="cancel">取消</span>
        <span class="title">新建歌单</span>
        <span class="complete">完成</span>
      </div>

      <div class="build-center">
        <cube-input
          v-model="value"
          :clearable="clearable"
          :autofocus="autofocus"
          :placeholder="placeholder"
          @input="input"
          class="myinput"
        ></cube-input>
      </div>

      <div class="build-bottom">
        <i></i>
        <span>设置为隐私歌单</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "buildlist.vue",
        data() {
            return {
                value: '',
                placeholder:'歌单标题',
                autofocus:true,
                clearable: {
                    visible: true,
                    blurHidden: true
                },
            }
        },
        methods: {
            input(val) {
                //输入中
                if(val.length > 0) {
                    document.getElementsByClassName('next')[0].style.opacity = 1
                }else {
                    document.getElementsByClassName('next')[0].style.opacity = 0.2
                }
            },
            cancel() {
                //触摸到遮罩层就取消本组件
                this.$emit('cancel');
                this.value = ''; //清空内容
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .mask
    width:100%
    height:100%
    background-color:gray
    opacity:0.5
    z-index:1000 //遮罩层需要更高
    .build
      width:100%
      height:auto
      background-color:white
      opacity:1
      border-top-left-radius:15px
      border-top-right-radius:15px
      font-size:$font-size-medium
      z-index:1001
      position:fixed
      bottom:0
      .build-top
        height:30px
        width:100%
        margin:auto 10px
        flex-between()
        .title
          margin:auto
          color:black
          font-weight:bold
        .complete
          color:rgba(128,128,128,.5)
      .build-center
        width:100%
        height:auto
        margin:auto 10px
        .myinput
          height:30px
          width:100%
      .build-bottom
        color:gray
        font-size:$font-size-small
        text-align:left
        margin:auto 10px

</style>
