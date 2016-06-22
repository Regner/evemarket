import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import isk from './filters'

Vue.use(VueResource)
Vue.filter('isk', isk)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
