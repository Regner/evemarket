import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCharts from 'vue-charts'
import App from './App.vue'
import { isk } from './filters'

Vue.use(VueResource)
Vue.use(VueCharts)
Vue.filter('isk', isk)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
