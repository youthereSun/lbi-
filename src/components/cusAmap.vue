<template>
  <div class="amapContainer">
    <div :id="attributes.name" style="height: calc(100vh - 95px); width: 100%;"></div>
    <div class="below-outer">
      <div class="showBelow" @click.stop="showBelow = !showBelow"><i class="fa fa-arrow-up"></i></div>
      <div v-show="showBelow">
        <component v-for="child in children"
           :is="child.use"
           :attributes="child.attributes"
           :children="child.children">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lw-cus-map1',

  data () {
    return {
      map: null,
      showBelow: false
    }
  },

  props: {
    attributes: Object,
    children: Array
  },

  created () {
    setTimeout(() => {
      this.init()
    }, 0)
  },

  beforeDestroy () {
  },

  methods: {
    init () {
      const container = this.attributes.name
      const initOption = this.initOption
      this.map = new window.AMap.Map(container, initOption)
    }
  },

  computed: {
    initOption () {
      return {}
    }
  }

}
</script>
<style scoped>
  .amapContainer {
    position: relative;
  }
  .below-outer{
    position: absolute;
    bottom: 0px;
    z-index: 999;
    width: 100%;
    background: red;
  }
  .showBelow{
    text-align: center;
    cursor: pointer;
  }
</style>
