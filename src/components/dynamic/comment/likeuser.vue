<template>
  <ul class="wrapper">
    <li v-for="(user,index) in users" :key="index">
      <div  class="wrapper-left">
        <img :src="user.avatarUrl" alt="">
      </div>
      <div class="wrapper-right">
        {{user.nickname}}
      </div>  
    </li>  
    <li class="no-user"  v-if="!users.length">还没有赞</li>  
  </ul>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: {}
    },
    isadd: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      users: []
    }
  },
  watch: {
    item (val) {
      if (val) {
        this.getUsers(val)
      }
    },
    isadd () {
      this.checkUser()
    }
    // isadd: {把属性定义为变数组对象，更方便监控，避免这里初始化执行
    //   handler:"checkUser",
		// 	immediate:true
    // }
  },
  computed: {},
  methods: {
    getUser (uid) {
      this.$api.users.userdetail(uid).then(res => {
        this.users.unshift(res.data.profile)
        console.log(this.users)
      })
    },
    getUsers (item) {
      this.users = []
      if (item.info.commentThread.latestLikedUsers) {
        let len = item.info.commentThread.latestLikedUsers.length
        for (let i = 0; i < len; i++) {
          this.getUser(item.info.commentThread.latestLikedUsers[i].s)
        }
      }
    },
    checkUser () {
      let ind = this.users.findIndex(item => {
        return item.nickname === '宝粉帮'
      })
      if (ind !== -1) {
        this.users.splice(ind, 1)
      }
      if (ind === -1) {
        this.getUser(477726475)
      }
    }
  },
  created () {
    this.getUsers(this.item)
  },
  mounted () {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .wrapper
    height:auto
    width:100%
    li
      height:40px
      width:100%
      border-bottom:.5px solid rgba(128,128,128,.2)
      display:flex
      .wrapper-left
        height:40px
        width:40px
        margin-left:10px
        flex-center()
        img 
          height:25px
          width:25px
          border-radius:50%
      .wrapper-right
        flex:1
        height:40px
        line-height:40px
        margin:auto 10px
        font-size:$font-size-medium  
    .no-user
      text-align:center
      margin-top:50px
      color:gray  
      display:block  
      border-bottom:none

</style>