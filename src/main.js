import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Router from 'vue-router'

import '@/assets/css/iconfont.css'

import '@/assets/js/rem.js'
import '@/assets/css/reset.scss'
import '@/assets/css/base.scss'

import { Picker, Popup, Dialog, Loading, Overlay, DropdownMenu, DropdownItem } from 'vant';
Vue.use(Picker).use(Popup).use(Dialog).use(Loading).use(Overlay).use(DropdownMenu).use(DropdownItem);

import {get, post} from '@/assets/js/request.js'
Vue.prototype.$get = get
Vue.prototype.$post = post

Vue.config.productionTip = false

window.BASE_API = process.env.VUE_APP_BASE_API
window.LOGIN_API = process.env.VUE_APP_LOGIN_API


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
