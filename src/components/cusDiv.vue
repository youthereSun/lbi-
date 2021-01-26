<template>
  <div @click="onClick">
    Hello, {{name}}<br/>
    <span>点击，触发界面保存</span>
  </div>
</template>

<script>
export default {
  name: 'lw-cus-div',
  data () {
    return {
      name: 'Custom Component'
    }
  },
  created () {
    console.log('created hook start')
  },
  methods: {
    onClick () {
      // 将会触发demo中 bookQueryPage.layout.xml的保存
      // eslint-disable-next-line
      EventBus.$emit('saveBtn.click')
    }
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
