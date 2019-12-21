<template>
  <div class="slide">

        <ul class="nav-wrapper">
          <li
            v-for="(item, index) in objs"
            :key="index"
            @click="toggles(item,index)"
          >
           <div :class="[currentPage === index ? activeClass : '', errorClass]">
            <span> {{ item.text }}</span>
             <span :style="[currentPage === index ? {color:'red'} : {color:'gray'}]" class="nav-number">{{ item.number }}</span>
           </div>
          </li>
        </ul>

    <div class="content">
      <cube-slide
        :data="objs"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.1"
        :showDots = 'false'
        @change="slideChange">
        <cube-slide-item :index="0">
          <album @hasNumber="hasNumber"></album>
        </cube-slide-item>

        <cube-slide-item :index="1">
          <singer @hasNum = "hasNum"></singer>
        </cube-slide-item>

        <cube-slide-item :index="2">
          <my-video @hasVideo = "hasVideo"></my-video>
        </cube-slide-item>

        <cube-slide-item :index="3">
          <my-column></my-column>
        </cube-slide-item>

        <cube-slide-item :index="4">
          <my-log></my-log>
        </cube-slide-item>
      </cube-slide>
    </div>

  </div>
</template>

<script>
    import Album from "./album"
    import Singer from './singer'
    import myVideo from './video'
    import myColumn from './specialcolumn'
    import myLog from "./mlog"
    export default {
        name: 'app',
        data () {
            return {
                activeClass: 'nav-item-active',
                errorClass: '',
                numberColor:'nav-number',
                currentPage: 0,
                objs: [
                    {
                        text: '专辑',
                        number:1
                    },
                    {
                        text: '歌手',
                        number:1
                    },
                    {
                        text: '视频',
                        number:1
                    },
                    {
                        text: '专栏',
                        number:1
                    },
                    {
                        text: 'Mlog',
                        number:1
                    }

                ]
            }
        },
        components: {
            Album,
            Singer,
            myVideo,
            myColumn,
            myLog
        },
        methods: {
            toggles (item, index) {
                this.currentPage = index
                console.log(index)
            },
            slideChange (index) {
                this.currentPage = index
            },
            hasNumber(num) {
                this.objs[0].number = num
            },
            hasNum(num) {
                this.objs[1].number = num
            },
            hasVideo (num) {
                this.objs[2].number = num
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .slide
    .content
      height: 567px
      .cube-slide
        height:567px !important

  .slide
    font-size:$font-size-medium-x
    position:relative
    margin-top:50px
    .nav-wrapper
      width:100%
      display:flex
      position:absolute
      z-index:1
      li:nth-child(1)
        margin-left:15px
      li
        width:20%
        flex:1
        div
          display:inline-block
          text-align:center
          height:25px
          .nav-number
            font-size:$font-size-small

     /*.content*/
     /*   margin-top:50px*/
  .nav-item-active
    color: red
    border-bottom:2px solid red

</style>
