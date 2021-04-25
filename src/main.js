import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "./assets/css/conmont.css"

import "animate.css"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "./assets/font-awesome-4.7.0/css/font-awesome.min.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
