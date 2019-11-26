<template>
  <div class="mask" @click.self="cancel">
<!--    .self 只有点击当前元素的时候，才会触发处理事件-->
    <div class="build">
      <div class="build-top">
        <span @click="cancel">取消</span>
        <span class="title">新建歌单</span>
        <span class="complete" @click="complete">完成</span>
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

      <div class="build-bottom" @click="privacy">
        <i class="iconfont iconzan1"></i>
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
                isprivacy:'', //是否隐私歌单
                placeholder:'歌单标题',
                autofocus:true,
                clearable: {
                    visible: true,
                    blurHidden: true
                },
            }
        },
        methods: {
            //提交创建的歌单
            createlist() {
                this.$api.playlists.createlist(this.value,this.isprivacy).then(res => {
                    console.log(res);
                })
            },
            input(val) {
                const toast =this.$createToast({
                    time: 3000,
                    txt: '字数超过限制',
                    type: 'error',
                });
                //输入中
                if(val.length > 0) {
                    document.getElementsByClassName('complete')[0].style.color = 'black';
                }else {
                    document.getElementsByClassName('complete')[0].style.color = 'rgba(128,128,128,.5)'
                }

                if(val.length > 20) {
                    toast.show();
                    // val = val.slice(0,20)
                    val = val.slice(0,20);
                    //必须下边这样设置才能实现新替换的显示出来！！
                        this.$nextTick(() => {
                            this.value = val;
                        })
                }
            },
            cancel(e) {
                //触摸到遮罩层就取消本组件
                this.$emit('cancel');
                this.value = ''; //清空内容
            },
            complete() {
                //完成创建
                if(this.value){
                    this.createlist();
                }
            },
            privacy() {
                //设置为隐私歌单
                if(this.isprivacy) {
                    this.isprivacy = '';
                }else {
                    this.isprivacy = 10
                }
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
    ///*opacity:0.5*/ 会被子div继承从而把它也透明了
    background: rgba(0, 0, 0, 0.5)
    z-index:1000 //遮罩层需要更高
    .build
      width:100%
      height:150px
      background-color:white
      /*opacity:1*/
      border-top-left-radius:15px
      border-top-right-radius:15px
      font-size:$font-size-medium
      z-index:1001
      position:absolute
      bottom:0
      .build-top
        height:45px
        width:100%
        margin-left:10px
        flex-between()
        .title
          margin:auto
          color:black
          font-weight:bold
        .complete
          color:rgba(128,128,128,.5)
          margin-right:20px
      .build-center
        width:100%
        height:60px
        margin:auto 10px
        .myinput
          height:100%
          width:auto
          padding-right:15px
          /*margin-right:10px*/
          /*.cube-input-append*/
          /*  margin-right:20px !important*/
        .cube-input::after
          border:none !important  //取消默认样式
        .cube-input_active::after
          border:none !important  //取消默认样式
      .build-bottom
        color:gray
        font-size:$font-size-small
        text-align:left
        margin:auto 10px
        height:45px
        line-height:45px
        width:100%

      .cube-popup-content
        display: flex;
        justify-content: space-between;
        align-items: center !important
        .cube-toast-icon
          display:inline-block

</style>
