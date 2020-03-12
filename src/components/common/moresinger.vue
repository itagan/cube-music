<template>
  <div class="share">
    <cube-popup ref="popup" @mask-click="hide" :position="'bottom'" :zIndex="2001">

      <div class="build">
        <div class="top">该歌曲有多个歌手</div>
        
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :options="options">

          <ul class="build-center">
            <li v-for="item in  singers" :key="item.id" @click="toSinger(item.id)">
              <div class="img">
                <img :src="item.picUrl" alt="">
              </div>
              <div class="name">
                {{item.name}}
              </div>
            </li>
          </ul>
          
        </cube-scroll>
      </div>

      </div>
    </cube-popup>
  </div>
</template>

<script>
    export default {
      name: 'playMore.vue',
      data () {
        return {
          options: {
            scrollbar: true
          }}
      },
      props: {
        singers: {
          type: Array,
          default: []
        }
      },
      methods: {
        show () {
          this.$refs.popup.show()
        },
        hide () {
          this.$refs.popup.hide()
        },
        toSinger (id) {
          this.$api.singers.singermusic(id).then(res => {
            if (res.data.artist.accountId) {
              this.accountId = res.data.artist.accountId
              let userId = this.accountId
              this.$router.push({
                path: `/singer/${userId}/${id}`
              })
            } else {
              let userId = 477726475
              this.$router.push({
                path: `/singer/${userId}/${id}`
              })
            }
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
   .build
      position:relative
      bottom:0
      height:auto
      width:100%
      border-top-left-radius:20px
      border-top-right-radius:20px
      background-color:white
      .top
        height:30px
        width:100%
        padding-left:20px
        line-height:30px
        font-size:$font-size-small
        color:gray
          

    .scroll-list-wrap
      height:150px
      .build-center
        width:100%
        margin:auto 10px
        height:auto
        li
          display:flex
          height:50px
          line-height:50px
          border-bottom:.5px solid rgba(128, 128, 128, 0.3)
          margin:10px auto
          .img
            height:45px
            width:45px
            border-radius:5px
            img 
              height:100%
              width:100%
              border-radius:5px
          .name
            margin-left:10px
            height:45px
            line-height:45px 
            font-size:$font-size-medium 


</style>
