<template>
  <div class="my">
    <my-header ref="change" @complete="complete"></my-header>
    <my-nav class="my-nav"></my-nav>
    <my-music class="mu-music"></my-music>
    <play-list
      class="create-list"
      @build="buildlist"
      @more="more"
      @mores="mores"
      ref="hom"
    ></play-list>
    <build-list class="build-list" v-if="isbuild" @cancel="cancel"></build-list>
    <play-more
      v-if="ismore"
      @cancel="cancelmore"
      @build="morebuildlist"
      @manage="manage"
      :num="createnum"
    >
    </play-more>

    <collection-more
      v-if="iscollectionmore"
      @cancel="cancelcollectionmore"
      :nums="collectionnum"
      @manage="manage"
    ></collection-more>
  </div>
</template>

<script>
    import playlist from './playlist'
// import ModalHelper from '../../assets/js/dialog'
import myHeader from './header'
    import myNav from './mynav'
import myMusic from './mymusic'
    import playList from './playlist'
    import buildList from './buildlist'
    import playMore from './playmore'
    import collectionMore from './collectionmore'

    export default {
      name: 'my.vue',
      components: {
        myHeader,
        myNav,
        myMusic,
        playList,
        buildList,
        playMore,
        collectionMore

      },
      data () {
        return {
          isbuild: false, // 注意这些变量名不能和函数名重复避免报错
          ismore: false,
          createnum: 0,
          iscollectionmore: false,
          collectionnum: 0
        }
      },
        // created() {
        //     this.widthComputed()
        // },
      watch: {
        isbuild (val) {
          if (val) {
                    // ModalHelper.afterOpen();
            this._dialog.afterOpen()
          } else {
                    // ModalHelper.beforeClose();
            this._dialog.beforeClose()
          }
        },
        ismore (val) {
          if (val) {
                    // ModalHelper.afterOpen();
            this._dialog.afterOpen()
          } else {
                    // ModalHelper.beforeClose();
            this._dialog.beforeClose()
          }
        },
        iscollectionmore (val) {
          if (val) {
                    // ModalHelper.afterOpen();
            this._dialog.afterOpen()
          } else {
                    // ModalHelper.beforeClose();
            this._dialog.beforeClose()
          }
        }
      },
      methods: {
            // widthComputed() {
            //     this.navWidth=this.navTxts.length*520
            // }
        buildlist () {
          this.isbuild = true
        },
        morebuildlist () {
          this.ismore = false
          this.isbuild = true

            // 手动调用，解决打开更多再新建歌单产生滚动现象的bug。
          this.$nextTick(() => {
            this._dialog.afterOpen()
          })
        },
        cancel () {
          this.isbuild = false
        },
        more (num) {
                // 子组件提醒打开更多操作页面
          this.ismore = true
          this.createnum = num
        },
        cancelmore () {
          this.ismore = false
        },
        cancelcollectionmore () {
          this.iscollectionmore = false
        },
        mores (nums) {
          this.iscollectionmore = true
          this.collectionnum = nums
        },
        manage () {
                // 收到通知告诉另外子组件管理歌单
                // this.ismanage = true;
                // 调用子组件方法通知子组件
          this.$refs.hom.manage()
          console.log('收到通知')
            // 头部组件图标变 完成
          this.$refs.change.ischange()
            // 取消更多弹出层
          this.ismore = false
          this.iscollectionmore = false
            // 定义管理菜单
        },
        complete () {
          this.$refs.hom.homing()
        }

      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .my
    z-index:200  //不能太大避免影响弹框显示
    height:667px
    width:100%
    background-color:white

  /*.cube-scroll-content*/
  /*  display: inline-block !important*/

  .mu-music
    position:absolute
    top:120px
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

  .my-nav
    width:375px
    height:auto
    position:absolute
    top:50px
    font-size:$font-size-small-s
    i
      font-size:$font-size-medium-x !important
</style>
