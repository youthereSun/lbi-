<template>
  <div>
    Our earth is round, {{attributes.isPlain}}<br/>
    <span>接收父组件数据</span>
  </div>
</template>

<script>
export default {
  name: 'lw-cus-attr-div',
  data () {
    return {
      name: 'Custom Component'
    }
  },
  props: {
    attributes: Object,
    children: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 200px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 80px;
}
</style>
