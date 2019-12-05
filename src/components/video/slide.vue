<template>
  <div class="slide">
    <div class="nav-scroll-list-wrap">
      <cube-scroll ref="navScroll" direction="horizontal">
        <ul class="nav-wrapper" style="font-size: 14px">
          <li
            v-for="(item, index) in objs"
            :key="index"
            :class="[currentPage === index ? activeClass : '', errorClass]"
            @click="toggles(item,index)"
            class="nav-item"
          >{{ item.text }}</li>
        </ul>
      </cube-scroll>
    </div>

    <div class="content">
      <cube-slide
        :data="objs"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.1"
        @change="slideChange">
        <cube-slide-item v-for="(item, index) in objs" :key="index">
          <div class="match-list-wrapper">
            <video-two :type="index" :groupid="videogroupid"></video-two>
          </div>
        </cube-slide-item>
        <div slot="dots"></div>
      </cube-slide>
    </div>

  </div>
</template>

<script>
  import videoTwo from "./videotwo";
  import videoNav from "./videonav";
    export default {
        name: 'app',
        data () {
            return {
                activeClass: 'nav-item-active',
                errorClass:'',
                currentPage:0,
                videogroupid:9102,
                objs:[
                    {
                        text:'推荐',
                        id:9102
                    },
                    {
                        text:'影视',
                        id:3100
                    },
                    {
                        text:'生活',
                        id:2100
                    },
                    {
                        text:'听BGM',
                        id:58101
                    },
                    {
                        text:'现场',
                        id:58100
                    },
                    {
                        text:'舞蹈',
                        id:1101
                    },
                    {
                        text:'翻唱',
                        id:60100
                    },
                    {
                        text:'萌宠',
                        id:1103
                    },
                    {
                        text:'音乐',
                        id:5100
                    },
                    {
                        text:'MV',
                        id:1000
                    },
                    {
                        text:'ACG音乐',
                        id:57104
                    },
                    {
                        text:'游戏',
                        id:2103
                    }
                ]
            }
        },
        components: {
            videoTwo,
            videoNav
        },
        methods: {
            toggles (item,index) {
                this.currentPage = index;
                // this.$emit('toggle',item.id)
                this.videogroupid = item.id;

            },
            slideChange (index) {
                this.currentPage = index;
                // this.$emit('toggle',this.objs[index].id);
                this.videogroupid = this.objs[index].id;
            },
        }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .slide
    .content
      height: 567px
      .cube-slide
        height:567px !important

  .slide
    font-size:$font-size-medium-x
    .nav-scroll-list-wrap
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      position: relative
      background-color: white
      padding: 15px 0
      top:30px
      font-size:$font-size-medium-x
      .cube-scroll-content
        display: inline-block
        width:auto
        .nav-wrapper
          white-space: nowrap
          line-height: 42px
          padding: 0 5px
          display:flex
          /*width:auto !important*/
          .nav-item
            display: inline-block
            padding: 0 5px
            min-width:30px
            height:40px
            line-height: 40px
            margin-right:10px
            text-align:center
            font-weight:bold
            &:nth-child(2)
              margin-right:25px
            &:nth-last-child(2)
              margin-right:25px

      .cube-scroll-wrapper
        width:375px

      .nav-item-active
        color: red
        border-bottom:2px solid red
</style>
