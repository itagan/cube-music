<template>
  <div>
    <my-search
      slot="center"
      :placeholder="placeholderOne"
      fake
      @query="getQuery"
      @click.native="goToSearch"
    ></my-search>

    <cube-input v-model="value" ></cube-input>
  </div>
</template>

<script>
    import MySearch from '../../base/search/search'
    export default {
        name: "search.vue",
        components: {
            MySearch
        },
        data () {
          return {
              value: '',
              placeholderOne:'真的爱你',
              placeholder: '请输入内容',
              readonly: true,
              maxlength: 100,
              disabled: true,
              autofocus: true,
              autocomplete: true,
          }
        },
        methods: {
          getQuery (query) {
              console.log(query)
          },
          goToSearch () {
              this.$router.push('/my')
          }
        }
    }
</script>

<style scoped>

</style>
