import lbiEchart from './components/lbiEchart'

const install = function (Vue) {
  Vue.component(lbiEchart.name, lbiEchart)
}

/* ingection */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/*
 * 当做Vue的模块化插件
 * 我们并不是要做一个library，因此此处代码可以隐去
export default {
  install,
  cusDiv
}
*/
