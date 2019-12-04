import authService from '../auth/authService';

export default function (to, from, next) {
  if (authService.isAuthenticated()) {
    next()
  }
  else {
    next('/auth')
  }
}