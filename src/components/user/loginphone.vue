<template>
  <div class="login">
    <div class="top">
      <i class="iconfont iconzan1" @click="back"></i>
      <span>手机号登录</span>
    </div>
    <div class="message">未注册手机号登录后将自动创建账号</div>
    <div class="phone">
      <div>+86</div>
      <cube-input
        v-model="value"
        :clearable="clearable"
        type="number"
        :autofocus="autofocus"
        :placeholder="placeholder"
        @input="input"
        class="myinput"
      ></cube-input>
    </div>
    <cube-button class="next" :light="true" @click="next" ref="btn" >下一步</cube-button>
  </div>
</template>

<script>
    export default {
        name: "loginphone.vue",
        data() {
            return {
                value: '',
                placeholder:'输入手机号',
                autofocus:true,
                clearable: {
                    visible: true,
                    blurHidden: true
                },
                disabled:false,
                status:0
            }
        },
        methods: {
            //发送验证码
            sendCode(phonenumber) {
                this.$api.users.sendCode(phonenumber).then(res => {
                    console.log(res)
                    this.status = res.status;
                })
            },
            input(val) {
                //输入中
                if(val.length > 0) {
                    document.getElementsByClassName('next')[0].style.opacity = 1
                }else {
                    document.getElementsByClassName('next')[0].style.opacity = 0.2
                }

            },
            next() {
                if(this.value.length === 0) {
                    this.disabled = true;
                    return
                }else {
                    this.disabled = false;
                }

                //提示方法
                // const toast = msg => {
                //     this.$createToast({
                //         time: 1000,
                //         txt: msg,
                //         type: 'error',
                //     });
                // };
                const toast =this.$createToast({
                    time: 1000,
                    txt: '手机号应该是11位数字！',
                    type: 'error',
                });
                //判断手机号
                if(this.value.length === 11){
                    // toast.show();

                    //密码登录
                    this.$router.push({
                        path:`/login/cellphone/${this.value}`
                    });

                    //调用接口验证码登录
                    // this.sendCode(this.value);
                    // if(this.status === 200) {
                    //     //验证码登录
                    //     this.$router.push({
                    //         path:`/login/phone/${this.value}`
                    //     });
                    //
                    // }else {
                    //     //密码登录
                    //     this.$router.push({
                    //         path:`/login/cellphone/${this.value}`
                    //     });
                    // }

                }else {
                    toast.show();
                }
            },
            back() {
                //返回上一页
                this.$router.back();
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .login
    width:100%
    height:667px
    background-color:white
    z-index:200
    position:relative
    .top
      height:50px
      width:100%
      text-align:center
      font-weight:bold
      font-size:$font-size-medium-x
      padding-top:10px
      position:relative
      i
        position:absolute
        left:10px
    .message
      height:60px
      font-size:$font-size-small
      margin:auto 10px
      color:gray
      line-height:60px
    .phone
      font-size:$font-size-large
      border-bottom:1px solid #dcdcdc
      /*position:relative*/
      display: flex
      height:40px
      margin:auto 10px
      margin-top:20px
      div
        width:40px
        height:40px
        flex-center()
      .myinput
        flex:1
        outline:none
        -webkit-appearance: none
        -moz-appearance: none
        -o-appearance: none
        appearance: none

    .next
      margin-top:20px
      width:330px
      height:35px
      position:absolute
      top:200px
      left:50%
      margin-left:-165px
      border-radius:20px
      background-color:red
      color:white
      opacity:0.2

</style>
