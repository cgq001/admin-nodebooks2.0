import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './axios'
import VCharts from 'v-charts'
Vue.use(VCharts)
import moment  from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
Vue.prototype.moment=moment

Vue.prototype.$http=axios
Vue.config.productionTip = false
import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
    // use
    Vue.use(mavonEditor)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
