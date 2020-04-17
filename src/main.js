import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import aos from 'aos'
import 'aos/dist/aos.css'


Vue.config.productionTip = false;


new Vue({
  created() {
    aos.init()
  },
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');


