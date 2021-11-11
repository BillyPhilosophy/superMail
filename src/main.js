import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import {store} from './store/store'
import VueLazyload from 'vue-lazyload'
import '@/assets/style/base.css'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: '@/assets/image/lazyImage/error.jpg',
  loading: require('./assets/image/lazyImage/loading.jpg'),
  attempt: 1
})

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
	store
}).$mount('#app')
