<template>
  <el-checkbox-group
    v-model="checked" @change="doChangeSelectedItem">
    <el-checkbox v-for="city in dimensionList" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checked: [],
      };
    },
    methods:{
      doChangeSelectedItem(data){
        this.$emit('emit-dimension',data)
      }
    },
    props:{
      dimensionList:{
        type:Array,
        default:function () {
          return []
        }

      },
    }
  };
</script>
