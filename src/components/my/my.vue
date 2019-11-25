<template>
  <div class="my">
    <my-header></my-header>

    <div class="nav-scroll-list-wrap">
      <cube-scroll
        ref="navScroll"
        direction="horizontal"
        :options="options"
        class="horizontal-scroll-list-wrap"
      >
        <ul class="nav-wrapper">
          <li v-for="(item, index) in navTxts" :key="index" class="nav-item">
            <router-link to="/find" tab="div">
              <div class="item-top">
                <i></i>
              </div>
              <div class="item-bottom">
                {{ item }}
              </div>
            </router-link>
          </li>
        </ul>
      </cube-scroll>
    </div>

<!--    <div class="content-scroll-wrapper">-->
<!--      <div class="content-scroll-list-wrap" ref="scrollWrapper">-->
<!--        <cube-scroll-->
<!--          ref="contentScroll"-->
<!--          :data="content"-->
<!--          :options="options"-->
<!--          >-->
<!--        </cube-scroll>-->
<!--      </div>-->
<!--    </div>-->

    <my-music class="mu-music"></my-music>
    <play-list class="create-list" @build="buildlist"></play-list>
    <build-list class="build-list" v-if="isbuild" @cancel="cancel"></build-list>

  </div>
</template>

<script>
    import playlist from "./playlist";
    // import ModalHelper from '../../assets/js/dialog'

    const txts = ['爵士电台', '最嗨电音', 'ACG专区', '古典专区', '爵士电台', '最嗨电音', 'ACG专区', '古典专区',  '爵士电台', '最嗨电音', 'ACG专区', '古典专区','cube-ui666']

    import myHeader from './header'
    import myMusic from "./mymusic"
    import playList from "./playlist"
    import buildList from "./buildlist";

    export default {
        name: "my.vue",
        components: {
            myHeader,
            myMusic,
            playList,
            buildList
        },
        data() {
            return {
                // content: imgs.slice(),
                options: {
                    // click: true,
                    // // probeType: 1,
                    // scrollbar: true,
                },
                navTxts: txts,
                isbuild:false, //注意这些变量名不能和函数名重复避免报错
            }
        },
        // created() {
        //     this.widthComputed()
        // },
        watch: {
            isbuild:function(val) {
                if (!!val){
                    // ModalHelper.afterOpen();
                    this._dialog.afterOpen();
                } else {
                    // ModalHelper.beforeClose();
                    this._dialog.beforeClose();

                }
            }
        },
        methods: {
            // widthComputed() {
            //     this.navWidth=this.navTxts.length*520
            // }
            buildlist() {
                this.isbuild = true;
            },
            cancel() {
                this.isbuild = false;
            }

        },

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .my
    z-index:200  //不能太大避免影响弹框显示
    height:667px
    width:100%
    .nav-scroll-list-wrap
      position:relative
      top:60px
      height:70px
      overflow: hidden;
      transform: rotate(0deg)
      width:375px
      .cube-scroll-content
        display: inline-block
        .nav-wrapper
          display: inline-block
          white-space: nowrap
          padding: 0 10px
          line-height: 70px
          .nav-item
            padding: 0 5px
            display: inline-block
            .item-top
              /*display: inline-block*/
              width:35px
              height:35px
              border-radius:50%
              background-color:red
              i
                color:white
                font-size:$font-size-medium-x
            .item-bottom
              /*display: inline-block*/
              heigth:15px
              width:60px
              text-align:center
              line-height:20px
              font-size:$font-size-small-s

  .cube-scroll-content
    display: inline-block !important

  .mu-music
    position:absolute
    top:130px
  .create-list
    position:absolute
    top:330px
    margin-top:10px
  .collection-list
    position:absolute
    top:750px
    margin-top:20px
  .build-list
    position:fixed
    top:0
    bottom:0
    left:0
    right:0
</style>
