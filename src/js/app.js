import Vue from 'vue';
import ddView from './index';
import App from './app.vue';
Vue.use(ddView);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});