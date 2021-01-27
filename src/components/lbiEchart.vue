<template>
  <div id="lbi_echart" >
    <div v-show="showAlert">无对应数据，请检查code</div>

    <div v-show="!showSub">
      <div id="myCharts" ref="myCharts"  :style="{width:attributes.width||'100%',height:attributes.height||'500px'}"></div>
    </div>
    <div v-show="showSub">
      <button @click="showSub=false">返回</button>
      <div id="mySubCharts" ref="mySubCharts" :style="{width:attributes.width||'100%',height:attributes.height||'500px'}"></div>
    </div>

    <filter-checkboxs  :dimension-list="dimensions" @emit-dimension="refreshDataByDimension"></filter-checkboxs>
    <div>

    </div>
  </div>
</template>

<script>
  import filterCheckboxs from "./filterCheckboxs";
  import china from 'echarts/map/json/china.json'
  import my from 'echarts/map/json/china-cities.json'
  import 'echarts/theme/bee-inspired'
  import 'echarts/theme/blue'
  import 'echarts/theme/caravan'
  import 'echarts/theme/carp'
  import 'echarts/theme/forest'
  import 'echarts/theme/dark-blue'
  import 'echarts/theme/jazz'
  import 'echarts/theme/fruit'
  import 'echarts/theme/london'
  import 'echarts/theme/red'
  import 'echarts/theme/vintage'
  import 'echarts/theme/tech-blue'
  import 'echarts/theme/sakura'
  import 'echarts/theme/shine'
  import 'echarts/theme/helianthus'
  import 'echarts/theme/roma'
  import 'echarts/theme/royal'
  import 'echarts/theme/macarons'
  import 'echarts/theme/macarons2'
  import 'echarts/theme/inspired'
  import 'echarts/theme/infographic'
  import 'echarts/theme/green'
  import 'echarts/theme/dark-mushroom'
  import echarts from 'echarts'

  export default {
    name: 'lw-lbi-chart',

    data() {
      return {
        type: "",
        config: {},
        showSub: false,
        dimensions:[],
        showAlert:false
      }
    },
    components:{
      filterCheckboxs
    },
    mounted() {

      echarts.registerMap('china', china)
      echarts.registerMap('my', my)
      var that = this
      that.getConfigurationByCode().then(res => {
        let a=res.data.config
        if(!a){
          this.showAlert=true
          return
        }
        that.config = JSON.parse(res.data.config)

        that.type = res.data.type;
        let myCharts;

          myCharts = echarts.init(that.$refs.myCharts, that.config.otherSetting.chartTheme)


        myCharts.setOption(that.config)

        const lineCB=function (data){
          const {name, seriesName, seriesIndex} = data
          const params = new Object()
          params['parent_x'] = name
          params['parent_series'] = seriesName
          const code = params['code'] = that.config.series[seriesIndex].subSeriesConfigurationCode
          if (code) {
            that.getSubChart(params)
          }
        }
        const mapCB=function (data){
          const parent_series=data.seriesName;
          const parent_x=data.name;//对应的x轴名称
          const code=that.config.otherSetting.subCode;
          if(!code){
            console.warn("未指定子图表")
            return;
          }
          let params={
            parent_x,
            parent_series,
            code
          }
          that.getSubChart(params)
        }

        if(that.type==='map'||that.type==='dynamicMap'){
          myCharts.on('click', mapCB)
        }else {
          myCharts.on('click', lineCB)
        }

      }).catch(error => {
            console.log('cnm')
      })
    },

    methods: {
      refreshDataByDimension(data){

        const params = {
          code: this.attributes.code,
          dimension:data
        }
        let that=this;
        this.getSubConfigurationByCode(params).then(res => {
          that.showSub=false
          that.config = JSON.parse(res.data.config)
          that.type = res.data.type;
          let myCharts;
          if (that.type != "map") {
            myCharts = echarts.init(that.$refs.myCharts, that.config.otherSetting.chartTheme)
          } else {
            myCharts = echarts.init(that.$refs.myCharts)
          }

          myCharts.setOption(that.config)
/*          myCharts.on('click', function (param) {
            const {name, seriesName, seriesIndex} = param
            const params = new Object()
            params['parent_x'] = name
            params['parent_series'] = seriesName
            const code = params['code'] = that.config.series[seriesIndex].subSeriesConfigurationCode
            if (code) {
              that.getSubChart(params)
            }
          })*/

        }).catch(error => {
          console.log('cnm')
        })

      },

      /**
       * 首次进入时通过code获取config
       * @returns {Promise<unknown>}
       */
      async getConfigurationByCode() {
        const params = {
          code: this.attributes.code
        }
        this. dimensions= await this.getDataDimension(params)
        return new Promise((resolve, reject) => {
          this.$http.post(this.HOST+'/handler/biHandler/echartGetAction', params).then(function (res) {
            resolve(res)
            // eslint-disable-next-line handle-callback-err
          }, function (error) {
            reject(error)
          })
        })
      },
      getSubConfigurationByCode(params) {
        return new Promise((resolve, reject) => {
          this.$http.post(this.HOST+'/handler/biHandler/echartGetAction', params).then(function (res) {
            resolve(res)
            // eslint-disable-next-line handle-callback-err
          }, function (error) {
            reject(error)
          })
        })
      },
      async getDataDimension(params) {
        return new Promise((resolve, reject) => {
          this.$http.post(this.HOST+'/handler/biHandler/dataDimensionGet', params).then(function (res) {

            resolve(res.data)
            // eslint-disable-next-line handle-callback-err
          }, function (error) {
            reject(error)
          })
        })
      },
      /**
       * 点击获取子图表数据
       * @param params
       */
      getSubChart(params) {
        var that = this
        that.getSubConfigurationByCode(params).then(res => {
          that.showSub = true
          const subConfig = JSON.parse(res.data.config)
          const mySubChart = echarts.init(that.$refs.mySubCharts, subConfig.otherSetting.chartTheme)
          mySubChart.setOption(subConfig)
        }).catch(error => {

        })
      }
    },
    props: {
      attributes: Object,
      children: Array
    }
  }
</script>

<style scoped>



</style>
