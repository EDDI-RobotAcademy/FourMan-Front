import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "@/css/button.css"
import fontStyle from '@/css/style.css'
import axios from 'axios'

Vue.config.productionTip = false
//
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
