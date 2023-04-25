import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "@/css/button.css"
import fontStyle from '@/css/style.css'
import axios from 'axios'
import * as VueKakaoSdk from "vue-kakao-sdk";

const apiKey = "1b9ab9c85ce4696e324d95f2d27458e2"; 
Vue.use(VueKakaoSdk, { apiKey });

Vue.config.productionTip = false
//
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
