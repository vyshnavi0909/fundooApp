class Auth {
  constructor() {
    this.authenticated = false;
  }

  SignIn(callback) {
    this.authenticated = true;
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
