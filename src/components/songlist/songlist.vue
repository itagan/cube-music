<template>
  <div class="song-list">
    <transition name="slide-fade">
      <my-header class="my-header" ref="header" v-show="isShow"></my-header>
    </transition>

<!--    <div :class="{'my-search-leave': this.searchLeave ,'my-search-enter' : this.searchEnter}" class="my-search">-->
<!--      <my-search-->
<!--        :placeholder="placeholder"-->
<!--        :fake="fake"-->
<!--        @query="getQuery"-->
<!--        @click.native="goToSearch"-->
<!--        >-->
<!--      </my-search>-->
<!--    </div>-->
    <my-search
      :placeholder="placeholder"
      :fake="fake"
      @query="getQuery"
      @click.native="goToSearch"
      :class="{'my-search-leave': this.searchLeave ,'my-search-enter' : this.searchEnter}"
      class="my-search"
    >
    </my-search>

  </div>
</template>

<script>
    import myHeader from "./header"
    // import mySearch from "../../base/search/search";
    import mySearch from "../../base/search/searchcancel"
    export default {
        name: "songList.vue",
        components: {
            myHeader,
            mySearch
        },
        data () {
            return {
                placeholder: '搜索歌单内歌曲',
                fake:false,
                isShow:true,
                searchLeave:false,
                searchEnter:false
            }
        },
        methods: {
            getQuery (query) {
                console.log(query)
            },
            goToSearch () {
                this.isShow = !this.isShow
                if(this.isShow) {
                    this.fake = false
                    this.searchEnter = true
                    this.searchLeave = false
                }else {
                    this.searchLeave = true
                    this.searchEnter = false
                    // this.$nextTick(() => {
                    //     this.fake = false
                    // })
                    this.fake = true
                }
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .song-list
    position:relative
    .my-search
      position:absolute
      top:50px




  .slide-fade-enter-active
    transition: all .3s ease

  .slide-fade-leave-active
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateY(-50px)
    opacity: 0


   .my-search-leave
     transform: translateY(-50px)
     transition:transform 0.3s ease

  .my-search-enter
    transform: translateY(0)
    transition:transform 0.3s ease

</style>
