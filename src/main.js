import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ErrorService from './error/errorService'
import AuthPlugin from './plugins/authPlugin'
import RestPlugin from './plugins/restPlugin'

import {
  MdCard,
  MdAvatar,
  MdButton,
  MdAutocomplete,
  MdBottomBar, 
  MdIcon,
  MdField,
  MdList, 
  MdCheckbox,
  MdMenu,
  MdBadge,
  MdDialog,
  MdEmptyState,
  MdProgress,
  MdSubheader,
  MdDivider,
  MdChips,
  MdSnackbar,
  MdToolbar,
  MdDialogConfirm,
  MdDialogPrompt } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
Vue.use(MdAvatar)
Vue.use(MdAutocomplete)   
Vue.use(MdButton)
Vue.use(MdBottomBar)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdCheckbox)
Vue.use(MdBadge)
Vue.use(MdDialog)
Vue.use(MdDialogPrompt)
Vue.use(MdField)
Vue.use(MdProgress)
Vue.use(MdMenu)
Vue.use(MdChips)
Vue.use(MdSubheader)
Vue.use(MdToolbar)
Vue.use(MdCard)
Vue.use(MdDivider)
Vue.use(MdSnackbar)
Vue.use(MdEmptyState)
Vue.use(MdDialogConfirm)

Vue.use(AuthPlugin);
Vue.use(RestPlugin);

Vue.config.productionTip = true;
Vue.config.errorHandler = (error) => ErrorService.onError(error);
Vue.config.warnHandler = (warn) => ErrorService.onWarn(warn);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
