<template>
  <div id="app">
    <lbi-echart :attributes="attributes"></lbi-echart>
  </div>
</template>

<script>
import lbiEchart from './components/lbiEchart'

export default {
  name: 'App',
  data(){
    return{
      attributes:{
        code:"322231",

      }
    }
  },
  components: {
    lbiEchart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
