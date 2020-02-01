<template>
  <my-header>
    <i class="iconfont icondiantai" slot="left"></i>
    <my-search
      slot="center"
      :placeholder="placeholder"
      fake
      @query="getQuery"
      @click.native="goToSearch"
    ></my-search>
    <i class="iconfont iconyinletiaodongzhuangtai" slot="right"></i>
  </my-header>
</template>

<script>
    import MyHeader from '../../base/navbar/navbar'
    import MySearch from '../../base/search/search'
    export default {
      name: 'header.vue',
      components: {
        MyHeader,
        MySearch
      },
      data () {
        return {
          placeholder: '真的爱你'
        }
      },
      methods: {
        getQuery (query) {
          console.log(query)
        },
        getSearchDefault () {
          this.$api.searchs.searchDefault().then(res => {
            this.placeholder = res.data.data.showKeyword
          })
        },
        goToSearch () {
          // this.$router.push('/hotsearch')
          this.$emit('Search')
        }
      },
      mounted () {
        this.$nextTick(() => {
          this.getSearchDefault()
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

</style>
