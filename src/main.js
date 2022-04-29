import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BootstrapVue} from 'bootstrap-vue'
import firebase from 'firebase/compat/app';
import 'leaflet/dist/leaflet.css';
import responsive from 'vue-responsive'
import './registerServiceWorker'
Vue.use(responsive)
//install bootstrapVue
Vue.use(BootstrapVue)
Vue.config.productionTip = false


let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    });
  }
});
