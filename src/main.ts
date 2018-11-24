import Vue from 'vue';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
