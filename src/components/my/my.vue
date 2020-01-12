<template>
  <div class="my">
    <my-header ref="change" @complete="complete"></my-header>

<!--    <div class="scroll-list-wrap">-->
<!--      <cube-scroll-->
<!--        ref="scroll"-->
<!--        :scroll-events="scrollEvents"-->
<!--        :options="options"-->
<!--        :direction="direction"-->
<!--      >-->
        <my-nav class="my-nav"></my-nav>
        <my-music class="mu-music"></my-music>
        <play-list
          class="create-list"
          @build="buildList"
          @more="more"
          @mores="mores"
          ref="hom"
        ></play-list>

<!--      </cube-scroll>-->
<!--    </div>-->

    <build-list v-if="isBuild" @cancel="cancel"></build-list>

    <play-more
      v-if="isMore"
      @cancel="cancelMore"
      @build="moreBuildList"
      @manage="manage"
      :num="createNum"
    >
    </play-more>

    <collection-more
      v-if="isCollectionMore"
      @cancel="cancelCollectionMore"
      :nums="collectionNum"
      @manage="manage"
    ></collection-more>

  </div>
</template>

<script>
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
          isBuild: false, // 注意这些变量名不能和函数名重复避免报错
          isMore: false,
          createNum: 0,
          isCollectionMore: false,
          collectionNum: 0,
          options: {
            probeType: 3,
            click: true,
            scrollbar: true
          },
          scrollEvents: ['scroll'],
          direction: 'vertical'
        }
      },
      watch: {
        isBuild (val) {
          if (val) {
            this._dialog.afterOpen()
          } else {
            this._dialog.beforeClose()
          }
        },
        isMore (val) {
          if (val) {
            this._dialog.afterOpen()
          } else {
            this._dialog.beforeClose()
          }
        },
        isCollectionMore (val) {
          if (val) {
            this._dialog.afterOpen()
          } else {
            this._dialog.beforeClose()
          }
        }
      },
      methods: {
        buildList () {
          this.isBuild = true
        },
        moreBuildList () {
          this.isMore = false
          this.isBuild = true
            // 手动调用，解决打开更多再新建歌单产生滚动现象的bug。
          this.$nextTick(() => {
            this._dialog.afterOpen()
          })
        },
        cancel () {
          this.isBuild = false
        },
        more (num) {
                // 子组件提醒打开更多操作页面
          this.isMore = true
          this.createNum = num
        },
        cancelMore () {
          this.isMore = false
        },
        cancelCollectionMore () {
          this.isCollectionMore = false
        },
        mores (nums) {
          this.isCollectionMore = true
          this.collectionNum = nums
        },
        manage () {
          this.$refs.hom.manage()
            // 头部组件图标变 完成
          this.$refs.change.ischange()
            // 取消更多弹出层
          this.isMore = false
          this.isCollectionMore = false
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
    z-index:200//不能太大避免影响弹框显示
    height:667px
    width:100%
    background-color:white

  .scroll-list-wrap
    height: 617px
    width:375px
    margin-bottom:50px

  .cube-scroll-wrapper
    height: 617px
    width:375px

  .cube-scroll-content
    height:auto
    overflow:hidden


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

  .my-nav
    width:375px
    height:auto
    position:absolute
    top:50px
    font-size:$font-size-small-s
    i
      font-size:$font-size-medium-x !important
</style>
