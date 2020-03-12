<template>
  <div>
    <my-search
      slot="center"
      :placeholder="placeholder"
      fake
      @query="getQuery"
      @click.native="goToSearch"
    ></my-search>

    <cube-input
      v-model="value"
      :clearable="clearable"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
    ></cube-input>
  </div>
</template>

<script>
    import MySearch from '../../base/search/search'
    export default {
      name: 'search.vue',
      components: {
        MySearch
      },
      data () {
        return {
          value: '',
          placeholder: '请输入内容',
          readonly: true,
          maxlength: 100,
          disabled: true,
          autofocus: true,
          autocomplete: true,
          clearable: {
            visible: true,
            blurHidden: true
          }
        }
      },
      methods: {
        getQuery (query) {
          console.log(query)
        },
        goToSearch () {
          this.$router.push('/my')
        },
        input (val) {
              // 输入中

        }
      }
    }
</script>

<style scoped>

</style>
