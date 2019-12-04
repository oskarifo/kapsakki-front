import axios from "axios";
import router from '@/router';
import ErrorService from '@/error/errorService'

class RestService {
  constructor() {
    axios.interceptors.request.use((config) => {
      config.headers.authorization = localStorage.getItem("accessToken");
      return config;
    }, function (error) {
      ErrorService.onError(error);
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response.status === 401) {
        router.replace({ name: 'auth' }).catch(e => ErrorService.onError(e))  
      }
      ErrorService.onError(error);
      return Promise.reject(error.response.data.message);
    });
  }

  fetchUserInfo() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.VUE_APP_API_URL + '/user')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  }

  deleteUser() {
    return new Promise((resolve, reject) => {
      axios.delete(process.env.VUE_APP_API_URL + '/user')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  }

  register() {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + '/register', null)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  fetchLists() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.VUE_APP_API_URL + '/lists')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  fetchTemplates() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.VUE_APP_API_URL + '/templates')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  fetchTemplate(templateId) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.VUE_APP_API_URL + '/templates/' + templateId)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  fetchList(listId) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.VUE_APP_API_URL + '/lists/' + listId)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  deleteList(listId) {
    return new Promise((resolve, reject) => {
      axios.delete(process.env.VUE_APP_API_URL + '/lists/' + listId)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  addTemplate(template) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + '/templates', template)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  }

  addList(list) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + '/lists', list)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  }

  addListItem(listId, listItem) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + '/lists/' + listId + '/listitems', listItem)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  }

  updateList(list) {
    return new Promise((resolve, reject) => {
      axios.put(process.env.VUE_APP_API_URL + '/lists/' + list.id, list) 
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }

  patchListItems(listId, listItems) {
    return new Promise((resolve, reject) => {
      axios.patch(process.env.VUE_APP_API_URL + '/lists/' + listId + '/listitems', listItems)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
  }

  updateListItem(listId, listItem) {
    return new Promise((resolve, reject) => {
      axios.put(process.env.VUE_APP_API_URL + '/lists/' + listId + '/listitems/' + listItem.id, listItem)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    });
  }
}

export default new RestService();
