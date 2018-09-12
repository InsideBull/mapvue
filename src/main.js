// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vue-style-loader'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import FullscreenExit from 'vue-material-design-icons/FullscreenExit.vue'
import 'vue-material-design-icons/styles.css'


Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.component('fullscreenExit-icon', FullscreenExit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
