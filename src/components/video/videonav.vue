<template>
  <div class="nav-scroll-list-wrap">
    <cube-scroll ref="navScroll" direction="horizontal">
      <ul class="nav-wrapper">
        <li
          v-for="(item, index) in obj"
          :key="index"
          :class="[active === index ? activeClass : '', errorClass]"
          @click.prevent="navto(item,index)"
          class="nav-item"
        >{{ item.text }}</li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
    const txts = ['推荐', 'LOOK直播', '硬币', '听BGM', '现场', '舞蹈', '翻唱', '女流', '广场', 'MV', 'ACG音乐', '游戏'];

    export default {
        data () {
            return {
                navTxts: txts,
                activeClass: 'nav-item-active',
                errorClass:'',
                active:0,
                obj:[
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
        methods: {
            navto(item,index) {
                //导航去哪
                this.active = index;
                this.$emit('toggle',item.id,index)
            }
        }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">

  .nav-scroll-list-wrap
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    position: relative
    background-color: white
    .cube-scroll-content
      display: inline-block
      width:auto
      .nav-wrapper
        white-space: nowrap
        line-height: 42px
        padding: 0 5px
        display:flex
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
