import auth0 from 'auth0-js';

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_DOMAIN,
  redirectUri: `${window.location.origin}/callback`,
  audience: process.env.VUE_APP_AUDIENCE,
  clientID: process.env.VUE_APP_CLIENTID,
  responseType: 'token id_token',
  scope: 'openid profile email'
});

class AuthService {

  constructor () {
    if (!AuthService.instance) {
      AuthService.instance = this
    }
    return AuthService.instance
  }

  isAuthenticated () {
    let authenticated = localStorage.getItem('isAuthenticated');
    let expiresIn = localStorage.getItem('tokenExpiresIn');

    return authenticated && Date.now() < expiresIn;
  }

  login(customState) {
    webAuth.authorize({
      appState: customState
    });
  }

  logout() {
    localStorage.setItem('isAuthenticated', false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiresIn');
    
    webAuth.logout({
      returnTo: `${window.location.origin}/auth`
    });
  }

   handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.setAuthResult(authResult);
          resolve();
        }
      });
    });
  }

  setAuthResult(authResult) {
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('accessToken', 'Bearer ' + authResult.accessToken);
    localStorage.setItem('tokenExpiresIn', Date.now() + authResult.expiresIn * 1000);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

}
const instance = new AuthService();

export default instance;
