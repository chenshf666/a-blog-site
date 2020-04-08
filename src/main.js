// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import ElementUI from 'element-ui'
// 引入富文本编辑器
//import VueQuillEditor from 'vue-quill-editor'
const getEditor = () => import(
/* webpackChunkName: "vue-quill-editor" */
'vue-quill-editor'
)
import { Button, Input, Message, Loading } from 'element-ui';
//const getButton = ()=>import(/* webpackChunkName: "ele-ui" */'element-ui/packages/button')
//const getInput = ()=>import(/* webpackChunkName: "ele-ui" */'element-ui/packages/input')
//const getMessage = ()=>import(/* webpackChunkName: "ele-ui" */'element-ui/packages/message')
//const getLoading = ()=>import(/* webpackChunkName: "ele-ui" */'element-ui/packages/loading')
//use(getButton)
//use(getInput)
//use(getLoading)
//getMessage().then((module)=>{
//  console.log(module)
//  Vue.prototype.$message = module.default
//})
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


function use(get){
  get().then((module)=>{
    Vue.use(module.default)
  })
}
use(getEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
