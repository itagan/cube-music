<template>
  <div class="create">
    <div class="create-top" @click="showlist">
      <div class="create-left">
        <i class="iconfont iconzan1" v-if="show"></i>
        <i class="iconfont iconzu" v-else></i>
        <span>我创建的歌单</span>
        <span class="num">({{playlist.length}})</span>
      </div>
      <div class="create-right" v-show="righticon">
        <i class="iconfont iconzan1" @click.stop="buildlist"></i>
        <i class="iconfont icon-ellipsis" @click.stop="more"></i>
      </div>
    </div>

    <ul v-show="show">
      <li class="li">
        <div class="li-item">
          <div class="li-left">
            <img :src="playlist[0].coverImgUrl">
          </div>

          <div class="li-right">
            <div class="li-right-top">我喜欢的音乐</div>
            <div class="li-right-bottom">{{playlist[0].trackCount}}首</div>
          </div>

          <div class="beckoning">
            <i class="iconfont iconzan1"></i>
            <span>心动模式</span>
          </div>
        </div>
      </li>

      <li class="li" v-for="(item,index) in playlist.slice(1)" :key="item.id" data-type="0">
        <div class="li-item" >
<!--          <div class="li-item" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->

          <div class="li-left">
            <img :src="item.coverImgUrl">
          </div>

          <div class="li-right">
            <div class="li-right-top">{{item.name}}</div>
            <div class="li-right-bottom">{{item.trackCount}}首</div>
          </div>

          <div class="playing">
            <i class="iconfont iconzan1" v-show="playing"></i>
          </div>
        </div>

<!--        <div class="delete" @click="deleteItem" :data-index="index">删除</div>-->
      </li>
    </ul>


    <div v-if="this.collection.length">
      <div class="create-top collection" @click="showcollectionlist">
        <div class="create-left">
          <i class="iconfont iconzan1" v-if="showcollection"></i>
          <i class="iconfont iconzu" v-else></i>
          <span>我收藏的歌单</span>
          <span class="num">({{collection.length}})</span>
        </div>
        <div class="create-right" v-show="righticon">
          <i class="iconfont icon-ellipsis" @click.stop="morecollection"></i>
        </div>
      </div>

      <ul v-show="showcollection">
        <li class="li" v-for="item in collection" :key="item.id">
          <div class="li-item">
            <div class="li-left">
              <img :src="item.coverImgUrl">
            </div>

            <div class="li-right">
              <div class="li-right-top">{{item.name}}</div>
              <div class="li-right-bottom">{{item.trackCount}}首，by {{item.creator.nickname}}</div>
            </div>

            <div class="playing">
              <i class="iconfont iconzan1" v-show="playing"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
      name: 'createlist.vue',
      data () {
        return {
          show: true,
          showcollection: true,
          playing: true,
          playlist: [],
          collection: [],
          righticon: true,
                // 左滑出现删除
          startX: 0,
          endX: 0
        }
      },
      created () {
        this.getPlaylist()
      },
      computed: {
        ...mapGetters([
          'uid'
        ])
      },
        // props:{
        //     manage:{
        //         type:Boolean,
        //         default:false
        //     }
        // },
        // watch:{
        //     manage() {
        //         this.manage = true;
        //         console.log('管理菜单了');
        //         this.righticon = false;
        //         this.showcollection = true;
        //         this.show = true;
        //     }
        // },
      methods: {
        getPlaylist () {
          console.log(this.uid)
          this.$api.users.playlist(this.uid).then(res => {
            console.log(res)
                // this.playlist = res.data.playlist;
            this.playlist = res.data.playlist.filter((item) => {
              return item.userId === this.uid
            })
            this.collection = res.data.playlist.filter((item) => {
              return item.userId !== this.uid
            })
          })
        },
        buildlist () {
                // 新建歌单
          this.$emit('build')
        },
        more () {
                // 打开更多操作
          this.$emit('more', this.playlist.length)
          console.log('更多s')
        },
        morecollection () {
                // 打开更多操作
          this.$emit('mores', this.collection.length)
        },
        showlist () {
          this.show = !this.show
        },
        showcollectionlist () {
          this.showcollection = !this.showcollection
        },
            // 父组件调用子组件方法，用于管理菜单通知
        manage () {
                // this.manage = true;
          console.log('管理菜单了')
          this.righticon = false
          this.showcollection = true
          this.show = true
        },
            // 父组件调用的方法，用于布局归位
        homing () {
                // 右边更多等图标显示出来
          this.righticon = true
        },

        // 左滑删除功能 ** 外部网上代码引入，暂时未成功本地实现
        skip () {
          if (this.checkSlide()) {
            this.restSlide()
          } else {
            // this.$router.push({
            //   path: '/detail'
            // })
          }
        },
            // 滑动开始
        touchStart (e) {
                // 记录初始位置
          this.startX = e.touches[0].clientX
          console.log(this.startX)
        },
            // 滑动结束
        touchEnd (e) {
                // 当前滑动的父级元素
          let parentElement = e.currentTarget.parentElement
                // 记录结束位置
          this.endX = e.changedTouches[0].clientX
                // 左滑
          if (parentElement.dataset.type === 0 && this.startX - this.endX > 30) {
            this.restSlide()
            parentElement.dataset.type = 1
          }
                // 右滑
          if (parentElement.dataset.type === 1 && this.startX - this.endX < -30) {
            this.restSlide()
            parentElement.dataset.type = 0
          }
          this.startX = 0
          this.endX = 0
        },
            // 判断当前是否有滑块处于滑动状态
        checkSlide () {
          let listItems = document.querySelectorAll('.list-item')
          for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].dataset.type === 1) {
              return true
            }
          }
          return false
        },
            // 复位滑动状态
        restSlide () {
          let listItems = document.querySelectorAll('.list-item')
                // 复位
          for (let i = 0; i < listItems.length; i++) {
            listItems[i].dataset.type = 0
          }
        },
            // 删除
        deleteItem (e) {
                // 当前索引
          let index = e.currentTarget.dataset.index
                // 复位
          this.restSlide()
                // 删除
          this.list.splice(index, 1)
        }

      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .create
    background-color:white
    width:100%
    height:auto
    padding-bottom:60px
    border-top:8px solid rgba(128, 128, 128, 0.1)
    .create-top
      height:40px
      flex-between()
      font-size:$font-size-medium-x
      width:100%
      color:black
      .create-left
        width:150px
        margin-left: 10px
        display:flex
        height:40px
        line-height:40px
        i
          margin-right:5px
        .num
          color:gray
          font-size:$font-size-small
      .create-right
        margin-right:5px
        text-align:right
        .iconzan1
          width:20px
          height:100%
          margin-right:10px
        .iconzu
          width:20px
          height:100%


    ul
      background-color:white
      width:100%
      height:auto
      .li
        height:50px
        line-height:50px
        width:100%
        margin-top:10px
        position:relative
        .li-item
          display:flex
          height:50px
          line-height:50px
          width:100%
          .li-left
            width:50px
            height:50px
            margin-left:10px
            border-radius:5px
            border:1px solid #dcdcdc
            img
              width:100%
              height:100%
          .li-right
            flex:1
            margin-left:10px
            height:50px
            line-height:50px
            max-width:265px
            .li-right-top
              font-size:$font-size-medium
              height:25px
              line-height:25px
              ellipsis()
            .li-right-bottom
              font-size:$font-size-small
              height:20px
              line-height:20px
              color:gray
        .delete
          min-width: 80px
          max-width: 150px
          height:50px
          background: #ff4949
          font-size: $font-size-medium-x
          color: #ffffff
          text-align: center
          line-height: 50px
          position: absolute
          top:0
          right: -80px

        .beckoning
          width:70px
          height:20px
          border-radius:10px
          border:1px solid #dcdcdc
          font-size:$font-size-small
          flex-center()
          margin-top:15px
          margin-right:10px
        .playing
          font-size:$font-size-medium
          color:red
          width:25px
          height:50px
          line-height:50px
          margin-right:10px
          text-align:right

     .collection
      margin-top:10px
</style>
