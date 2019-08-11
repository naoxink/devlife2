import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCogs,
  faTrophy,
  faHome,
  faQuestionCircle,
  faCodeBranch,
  faHeart,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faCogs,
  faTrophy,
  faHome,
  faQuestionCircle,
  faCodeBranch,
  faHeart,
  faExclamationTriangle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

window.vueapp = new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
