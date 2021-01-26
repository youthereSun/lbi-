// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import App from './App'

Vue.prototype.HOST='/api'
Vue.config.productionTip = false
import {CheckboxGroup,CheckboxButton,Checkbox} from 'element-ui'
Vue.use(CheckboxGroup).use(CheckboxButton).use(Checkbox)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
