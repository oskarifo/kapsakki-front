import restService from '../rest/restService';

export default {
  install(Vue) {
    Vue.prototype.$rest = restService;
  }
};