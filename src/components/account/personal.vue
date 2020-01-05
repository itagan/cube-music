<template>
  <div class="personal">
    <div class="top">
      <div class="header-img">
        <span>上传头像</span>
        <img src="" alt="">
      </div>
      <div class="my-name">
        <div class="name">
          <span v-if="personals.profile">{{personals.profile.nickname}}</span>
          <i class="iconfont iconzan1"></i>
        </div>
        <div class="grade">Lv8</div>
      </div>

      <div class="sign-in" v-show="signIn" @click="toSignIn">
        <span>已签到
        <i class="iconfont iconleft-arrow"></i>
        </span>
      </div>
      <div class="sign-in before-signin" v-show="!signIn" @click="toSignIn">
        <span>
        <i class="iconfont icon3"></i>
          签到
        </span>
      </div>
    </div>

    <ul class="center">
      <li>
        <span v-if="personals.profile">{{personals.profile.eventCount}}</span>
        <span>动态</span>
      </li>
      <li @click.stop="toFollows">
        <span v-if="personals.profile">{{personals.profile.follows}}</span>
        <span>关注</span>
      </li>
      <li @click.stop="toFolloweds">
        <span v-if="personals.profile">{{personals.profile.followeds}}</span>
        <span>粉丝</span>
      </li>
      <li>
        <i class="iconfont iconbianji"></i>
        <span>编辑资料</span>
      </li>
    </ul>


    <div class="bottom">
      <div class="vip">
        <div class="vip-left">
          <span>开通黑胶VIP</span>
          <span>
            新客仅5元
            <i class="iconfont iconzan1"></i>
          </span>
        </div>

        <div class="line"></div>

        <div class="vip-right">
          <span>会员中心</span>
          <span>
            VIP享超12项特权
            <i class="iconfont iconzan1"></i>
          </span>
        </div>

      </div>


      <ul class="other">
        <li>
          <i class="iconfont iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
          <div class="ads">
            消息
          </div>
        </li>
        <li>
          <i class="iconfont iconziyuan"></i>
          <div class="ads">
            商城
          <div>限时99秒杀</div>
          </div>
        </li>
        <li>
          <i class="iconfont iconyanchupiaowu"></i>
          <div class="ads">
            演出
          <div>梁静茹</div>
          </div>
        </li>
        <li>
          <i class="iconfont icongexingzhuangban"></i>
          <div class="ads">
            个性装扮
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
      name: 'personal.vue',
      data () {
        return {
          signIn: false,
          personals: {}
        }
      },
      created () {
        this.getPersonal()
      },
      computed: {
        ...mapGetters([
          'uid'
        ])
      },
      methods: {
            // 签到
        toSignIn () {
          this.signIn = !this.signIn
        },
            // 获取数据
        getPersonal () {
          this.$api.users.userdetail(this.uid).then(res => {
            this.personals = res.data
          })
        },
        toFollows () {
          this.$router.push({
            path:`follows`
          })
        },
        toFolloweds () {
          this.$router.push({
            path:`followeds`
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
.personal
  background-color:white
  .top
    height:90px
    margin:auto 10px
    margin-top:50px
    position:relative
    flex-between()
    .header-img
      height:65px
      width:65px
      border-radius:50%
      background-color:rgba(128,128,128,.8)
      color:white
      flex-center(column)
      span
        font-size:$font-size-large
        width:50px
        height:50px
        text-align:center
        flex-center(column)
    .my-name
      font-size:$font-size-medium-x
      color:black
      position: absolute
      left:85px
      .name
        /*width:35px*/
        height:30px
        line-height:30px
        i
          font-size:$font-size-medium
          color:rgba(128,128,128,.6)
      .grade
        marginn-top:10px
        width:35px
        height:18px
        border-radius:8px
        line-height:18px
        text-align:center
        background-color:rgba(128,128,128,.3)
        font-size:$font-size-small
    .sign-in
      width:70px
      height:22px
      border-radius:10px
      border:1px solid rgba(128,128,128,.6)
      font-size:$font-size-medium
      line-height:22px
      text-align:center
      i
        font-size:$font-size-small
        color:rgba(128,128,128,.5)
    .before-signin
      background-color:#ff4500
      color:white
      i
        color:white

  .center
    height:50px
    display:flex
    margin:auto 10px
    font-size:$font-size-medium-x
    li
      min-width:25%
      height:50px
      flex-center(column)
      span:nth-child(2)
        font-size:$font-size-small
        color:rgba(128,128,128,.8)
        margin-top:8px

  .bottom
    height:160px
    margin: auto 10px
    margin-top:10px
    .vip
      height:60px
      background-color:rgba(0,0,0,.9)
      color:#ffc1c1
      font-size:$font-size-medium-x
      display:flex
      position:relative
      border-top-left-radius:10px
      border-top-right-radius:10px
      .vip-left
        width:50%
        height:60px
        display:flex
        flex-direction:column
        justify-content: center
        margin-left:30px
        span:nth-child(2)
          font-size:$font-size-small
          color:rgba(128,128,128,.9)
          margin-top:8px
      .vip-right
        width:50%
        height:60px
        display:flex
        flex-direction:column
        justify-content: center
        margin-left:30px
        span:nth-child(2)
          font-size:$font-size-small
          color:rgba(128,128,128,.9)
          margin-top:8px
      .line
        width:1px
        height:30px
        background-color:rgba(128,128,128,.8)
        position:absolute
        left:50%
        top:15px
    .other
      height:100px
      display:flex
      font-size:$font-size-medium-x
      margin-top:20px
      li
        width:25%
        text-align:center
        i
          font-size:$font-size-large-x
          color:red
        .ads
          margin-top:10px
          text-align:center
          div
            font-size:$font-size-small
            color:rgba(128,128,128,.9)
            ellipsis()
            margin-top:5px
</style>
