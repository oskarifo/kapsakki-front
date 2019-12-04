import authService from '../auth/authService';

export default {
  install(Vue) {
    Vue.prototype.$auth = authService;
  }
};