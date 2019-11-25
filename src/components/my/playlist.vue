<template>
  <div class="create">
    <div class="create-top">
      <div class="create-left">
        <i class="iconfont iconzan1" v-if="show"></i>
        <i class="iconfont iconzu" v-else></i>
        <span>我创建的歌单</span>
        <span class="num">({{playlist.length}})</span>
      </div>
      <div class="create-right">
        <i class="iconfont iconzan1" @click="buildlist"></i>
        <i class="iconfont icon-ellipsis"></i>
      </div>
    </div>

    <ul>
      <router-link to="/find" tag="li" class="li">
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
      </router-link>

      <router-link to="/find" tag="li" class="li" v-for="item in playlist.slice(1)" :key="item.id">
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
      </router-link>
    </ul>


    <div v-if="this.collection.length">
      <div class="create-top collection">
        <div class="create-left">
          <i class="iconfont iconzan1" v-if="show"></i>
          <i class="iconfont iconzu" v-else></i>
          <span>我收藏的歌单</span>
          <span class="num">({{collection.length}})</span>
        </div>
        <div class="create-right">
          <i class="iconfont icon-ellipsis"></i>
        </div>
      </div>

      <ul>
        <router-link to="/find" tag="li" class="li" v-for="item in collection" :key="item.id">
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
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "createlist.vue",
        data() {
            return {
                show:true,
                playing:true,
                playlist:[],
                collection:[]
            }
        },
        created() {
            this.getPlaylist()
        },
        computed: {
            ...mapGetters([
                'uid',
            ])
        },
        methods: {
            getPlaylist() {
                console.log(this.uid);
                this.$api.users.playlist(this.uid).then(res => {
                    console.log(res);
                    // this.playlist = res.data.playlist;
                    this.playlist = res.data.playlist.filter((item) => {
                        return item.userId === this.uid;
                    });
                    this.collection = res.data.playlist.filter((item) => {
                        return item.userId !== this.uid;
                    });
                })
            },
            buildlist() {
                //新建歌单
                this.$emit('build');
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
        .num
          color:gray
          font-size:$font-size-small
      .create-right
        margin-right:20px
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
        display:flex
        height:50px
        line-height:50px
        width:100%
        margin-top:10px
        /*padding-left:10px*/
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
