<template>
  <div class="wrapper">
    <my-header class="header">
     <i class="iconfont iconfanhui" slot="left" @click="toBack"></i>
      <div slot="center" class="music">我的资料</div>
      <i class="iconfont iconyinletiaodongzhuangtai" slot="right" @click="music"></i>
    </my-header>
    
    <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">
          
          <div class="container">
            <ul class="content content-bottom">
            <li class="content-tips">
              上传头像并完善个人信息，即可获得积分
            </li>
            <li class="content-flex content-flex-coverImg" @click="toUpdateCover">
              <span>头像</span>
              <div class="content-flex-center content-flex-cover">
                <img :src="userMessage.profile.avatarUrl" alt="">
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex" @click="toUpdateName"> 
              <span>昵称</span>
              <div class="content-flex-center">
                {{userMessage.profile.nickname}}
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex" @click="toUpdateGener">
              <span>性别</span>
              <div class="content-flex-center">
                {{gender}}
              </div>
              <!-- <div class="content-flex-center" v-if="userMessage.profile.gender === 1">
                男
              </div>
              <div class="content-flex-center" v-if="userMessage.profile.gender === 2">
                女
              </div>
              <div class="content-flex-center" v-if="userMessage.profile.gender === 0">
                
              </div> -->

              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex" @click="toUpdateImg"> 
              <span>二维码</span>
              <div class="content-flex-center">
               
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>

          <ul class="content">
            <li class="content-flex" @click="toUpdateBir"> 
              <span>生日</span>
              <div class="content-flex-center">
                {{birDay}}
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex" @click="toUpdateRegion"> 
              <span>地区</span>
              <div class="content-flex-center">
                {{area}}
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>
             
             <li class="content-flex" @click="toUpdateUn"> 
              <span>大学</span>
              <div class="content-flex-center">
              </div>
              <i class="iconfont iconleft-arrow"></i>
            </li>
            <li class="content-privacy">
              此三项可以在「消息和隐私设置」中设为隐私
            </li>
          </ul>

          <ul class="content content-bottom">
            <li class="content-desc">
              <div class="content-desc-top">介绍</div>
              <div class="content-desc-bottom">
                <textarea :placeholder="placeholder" v-model="value"  @input="descInput" :maxlength="maxlength"> </textarea>
              </div>
              <div class="content-desc-bottom-num">{{surplus}}</div>
            </li>
          </ul>

          <ul class="content content-top">
            <li class="content-flex "> 
              <span>账号和绑定设置</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>

            <li class="content-flex"> 
              <span>个人主页展示设置</span>
              <i class="iconfont iconleft-arrow"></i>
            </li>
          </ul>
          </div>
      </cube-scroll>
    </div>

    <update-name ref="Name" :nickname="userMessage.profile.nickname" ></update-name>
  </div>
</template>

<script>
import MyHeader from '../../../base/navbar/navbar'
import UpdateName from './updatename'
import { provinceList, cityList } from '../../../assets/js/area'

const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
})

export default {
  components: {
    MyHeader,
    UpdateName
  },
  props: { },
  data () {
    return {
      options: {
        scrollbar: true
      },
      value: '',
      placeholder: '请输入个人介绍...',
      surplus: 300,
      maxlength: 300,
      userMessage: {},
      gender: '',
      birDay: '',
      area: ''
    }
  },
  watch: {
    value (val) {
      if (val.length >= 1000) {
        this.value = val.substring(0, 1000)
        this.surplus = 0
      }
    }
  },
  computed: {
    // gender () {
    //   this.gender = userMessage.profile.gender === 1 ? '男' : '女'
    // }
  },
  methods: {
    getDesc () {
      this.userMessage = JSON.parse(this.$route.query.userMessage)
      console.log(this.userMessage)
      switch (this.userMessage.profile.gender) {
        case 1:
          this.gender = '男'
          break
        case 2:
          this.gender = '女'
          break
        default:
          this.gender = '保密'
      }
      this.birDay = this.Timestamp(this.userMessage.profile.birthday)
      this.CitySure(this.userMessage.profile.province, this.userMessage.profile.city)
    },
    toBack () {
      // this.$api.songLists.updatedesc(this.userMessage.id, this.value).then(res => {
      //   console.log(res.data)
      // })

      this.$router.go(-1)
    },
    updateUser (gender, signature, city, nickname, birthday, province) {
      this.$api.users.userUpdate(gender, signature, city, nickname, birthday, province).then(res => {
        console.log(res.data)
      })
    },
    music () {},
    descInput () {
      let val = this.value.length
      this.surplus = 300 - val
    },
    Timestamp (timestamp) {
      let date = new Date(timestamp)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + M + D
    },
    CitySure (province, city) {
      let arr = cityList[province].filter(item => {
        return item.value === city.toString()
      })
      this.area = arr[0].province + arr[0].text
    },
    toUpdateCover () {
    },
    toUpdateName () {
      this.$refs.Name.show()
    },
    toUpdateGener () {
      if (!this.aliasPicker) {
        this.aliasPicker = this.$createPicker({
          zIndex: 2002,
          title: '',
          data: [[{ id: 1, name: '男' }, { id: 2, name: '女' }]],
          alias: {
            value: 'id',
            text: 'name'
          },
          confirmTxt: '完成',
          onSelect: this.GenerSelectHandle,
          onCancel: this.GenerCancelHandle
        })
      }
      this.aliasPicker.show()
    },
    GenerSelectHandle (selectedVal, selectedIndex, selectedText) {
      console.log(`${selectedText.join(' ')}`)
      this.gender = `${selectedText.join(' ')}`
    },
    GenerCancelHandle () {
    },
    BirSelectHandle (selectedVal, selectedIndex, selectedText) {
      this.birDay = `${selectedText.join('-')}`
    },
    BirCancelHandle () {
    },
    toUpdateImg () {},
    toUpdateBir () {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          zIndex: 2002,
          title: '',
          confirmTxt: '完成',
          min: new Date(1900, 1, 1),
          max: new Date(2100, 1, 1),
          value: new Date(),
          onSelect: this.BirSelectHandle,
          onCancel: this.BirCancelHandle
        })
      }

      this.datePicker.show()
    },
    toUpdateRegion () {
      this.addressPicker.show()
    },
    toUpdateUn () {},
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.area = `${selectedText.join(' ')}`
    },
    cancelHandle () {

    }
  },
  created () {
    this.getDesc()
  },
  mounted () {
    this.addressPicker = this.$createCascadePicker({
      title: '',
      data: addressData,
      confirmTxt: '完成',
      zIndex: 2002,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  
  .wrapper
    width: 100%
    height: 100%
    font-size:$font-size-medium
    .header
      background-color:transparent
      z-index:2001
      
    .scroll-list-wrap
      height:567px  
      position:relative
      top:50px
      .container
        height:auto
        .content
          height:auto
          li
            background-color:white
            padding:0 10px
            height:50px
            margin:1px auto
          .content-flex
            flex-between()
            position: relative
            i 
              color:gray 
            .content-flex-center
              position:absolute
              right:30px
              color:gray
              font-size:$font-size-medium - 1
          .content-flex-coverImg
             height:60px 
             line-height:60px
            .content-flex-cover
              height:50px
              width:50px
              flex-center()
              img
                height:50px
                width:50px
                border-radius:50%


        .content
          .content-tips
            height:30px
            flex-center()
            background-color:#99ccff
            margin:5px auto
          .content-privacy
            height:30px  
            background-color:transparent
            line-height:30px
            font-size:$font-size-small
          .content-desc
            height:auto
            line-height:1.5 
            position: relative
            white-space: normal
            // margin-bottom:5px
            .content-desc-top
              height:40px
              line-height:40px
              border-bottom:1px solid rgba(128,128,128,.1)
            .content-desc-bottom
              height:150px
              line-height:1.5 
              textarea
                width:100%
                height:100%
                outline:none
                resize:none
            .content-desc-bottom-num
              position:absolute
              bottom:10px  
              right:10px
              color:gray 
        .content-bottom
          margin-bottom:8px  
        .content-top
          margin-top:13px       
</style>