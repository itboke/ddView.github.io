import Vue from 'vue'
import miniView from './index'
import App from './app.vue'
Vue.use(miniView)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});