import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
Vue.config.productionTip = false
import fastclick from 'fastclick'


fastclick.attach(document.body)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
