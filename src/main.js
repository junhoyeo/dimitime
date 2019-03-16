import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import VueMoment from 'vue-moment'
Vue.use(VueMoment);

new Vue({
  render: h => h(App),
}).$mount('#app')
