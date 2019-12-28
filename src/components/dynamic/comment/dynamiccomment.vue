<template>
  <div class="forward-comment"> 
    <my-header :profile="profile" :isShow="isShow" class="my-header" ref="myHeader"></my-header>
   
    <div class="sticky-view-container">
      <cube-sticky :pos="scrollY">

        <cube-scroll
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
          :options="options"
          ref="scroll"
          class="scroll-ele"
        >
          <div class="top-content" style="height:150px">
            啦啦啦啦
          </div>

          <cube-sticky-ele>
            <ul class="sticky-header" ref="messTop">
              <li>
                <div :index="0" @click="toggles(0)" :class="[currentPage === 0 ? activeClass : '', errorClass]">
                  <span> 评论 </span>
                </div>
                <span :style="[currentPage === 0 ? {color:'red'} : {color:'gray'}]">22</span>
              </li>
            

              <li>
                <div :index="0" @click="toggles(1)" :class="[currentPage === 1 ? activeClass : '', errorClass]">
                  <span> 转发 </span>
                </div>
                <span :style="[currentPage === 1 ? {color:'red'} : {color:'gray'}]">212</span>
              </li>

               <li>
                <div :index="0" @click="toggles(2)" :class="[currentPage === 2 ? activeClass : '', errorClass]">
                  <span> 赞 </span>
                </div>
                <span :style="[currentPage === 2 ? {color:'red'} : {color:'gray'}]">220</span>
              </li>

              
            </ul>
          </cube-sticky-ele>

          <cube-slide
            :data="objs"
            :initialIndex="currentPage"
            :loop="false"
            :autoPlay="false"
            :threshold="0.1"
            :showDots = 'false'
            @change="slideChange">
            <cube-slide-item :index="0">
              <div style="height:600px">11111</div>
            </cube-slide-item>

            <cube-slide-item :index="1">
            </cube-slide-item>

             <cube-slide-item :index="2">
            </cube-slide-item>

          </cube-slide>


        </cube-scroll>
      </cube-sticky>
    </div>

  </div>
</template>

<script>
    import myHeader from "./header"
    
    export default {
        name: "user.vue",
        components: {
            myHeader,
            
        },
        data() {
            return {
                title:'',
                isShow:false,
                scrollEvents: ['scroll'],
                scrollY: 0,
                activeClass: 'nav-item-active',
                errorClass: '',
                numberColor:'nav-number',
                currentPage: 0,
                objs: [
                    {
                        text: '主页'
                    },
                    {
                        text: '动态'
                    },
                    {
                        text: '赞'
                    }
                ],
                profile:{},
                level:0,
                messTop:0

            }
        },
        created () {
         
        },
        computed: {
            options () {
                return {
                    scrollbar: true,
                    click:false, //解决触发两次点击事件的bug
                }
            }
        },
        methods: {
            
            scrollHandler ({ y }) {
                this.scrollY = -y
                this.messTop = this.$refs.messTop.getBoundingClientRect().top
                console.log(this.scrollY)

                if(this.messTop >= 180 && this.messTop <= 199) {
                this.isShow = false
                 let opac = 1 - (this.messTop - 180) * 0.05
                 this.$refs.myHeader.opacityHeader(opac)
                }else if(this.messTop > 199) {
                  this.$refs.myHeader.opacityHeader(1)
                  this.isShow = false
                }
                if(this.messTop >= 160 && this.messTop < 180) {
                 this.isShow = true
                 let opac = -(this.messTop - 180) * 0.05
                 this.$refs.myHeader.opacityHeader(opac)
                }else if(this.messTop < 160) {
                  this.isShow = true
                  this.$refs.myHeader.opacityHeader(1)
                }
                
              
            },
            toggles (index) {
                this.currentPage = index
            },
            slideChange (index) {
                this.currentPage = index
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
 .forward-comment
    overflow: hidden
    width:375px
    height:675px
  // .my-header
  //   background-color:transparent !important
  //   color:white
  

  .sticky-view-container
    position: absolute
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    z-index:1
    font-size:$font-size-medium
    .sticky-header
      display:flex
      height:50px
      background-color:white
      border-bottom:1px solid rgba(128,128,128,.4)
      li
        width:33%
        height:100%
        position:relative
        flex-center()
        div
         width:40px
         height:100%
         text-align:center
         line-height:50px
         color:none
         font-size:$font-size-medium-x
        // span 
        //  color:gray 
        //  font-size:$font-size-small





  .nav-item-active
    color: red
    border-bottom:1.5px solid red

</style>
