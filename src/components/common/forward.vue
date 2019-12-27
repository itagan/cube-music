<template>
  <div class="wrapper">
    <cube-input
      v-model="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :clearable="clearable"
    ></cube-input>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: '',
      placeholder: '一起聊聊吧',
      maxlength: 100,
      autofocus: true,
      clearable: {
      visible: true,
      blurHidden: true
      }
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
</style>