<template>
  <div class="nav-scroll-list-wrap">
    <cube-scroll ref="navScroll" direction="horizontal">
      <ul class="nav-wrapper">
        <li v-for="(item, index) in navTxts" :key="index" class="nav-item">
          <router-link to="/find" tab="div" class="nav-link">
            <div class="item-top">
              <i class="iconfont iconzan1" style="font-size:22px"></i>
            </div>
            <div class="item-bottom">
              {{ item }}
            </div>
          </router-link>

          <li class="nav-item-last nav-item" @click="edit">
            <div class="top">
              <i class="iconfont iconzan1" style="font-size:22px"></i>
            </div>
            <div class="bottom">
             编辑
            </div>
          </li>

        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">

    const txts = ['爵士电台', '最嗨电音', 'ACG专区', '古典专区', '爵士电台', '最嗨电音', 'ACG专区', '古典专区',  '爵士电台', '最嗨电音', 'ACG专区', '古典专区','cube-ui666']

    export default {
        data() {
            return {
                navTxts: txts,
            }
        },
        methods: {
            edit() {
                //打开编辑页面
            },
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
        /*display: inline-block*/
        white-space: nowrap
        line-height: 70px
        padding: 0 5px
        display:flex
        .nav-item
          display: inline-block
          padding: 0 5px
          width:70px
          height:70px
          line-height: 70px
          .nav-link
            width:70px
            height:70px
            display: inline-block
            font-size:$font-size-small-s //无效，改用父组件写样式
            line-height: 70px
            .item-top
              width:35px
              height:35px
              line-height:35px
              border-radius:50%
              background-color:red
              margin:auto
              margin-top:10px
              text-align:center
              i
                display: inline-block
                width:40px
                height:40px
                color:white
                font-size:$font-size-medium //无效，改用内联样式
            .item-bottom
              heigth:20px
              width:60px
              text-align:center
              line-height:20px
              color:gray
              margin:auto
        .nav-item-last
          width:70px
          height:70px
          color:gray
          .top
            width:35px
            height:35px
            line-height:35px
            border-radius:50%
            background-color:rgba(128, 128, 128, 0.5)
            margin:auto
            margin-top:10px
            text-align:center
          .bottom
            heigth:20px
            width:60px
            text-align:center
            line-height:20px
            margin:auto

    .cube-scroll-wrapper
      width:375px
</style>
