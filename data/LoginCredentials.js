class LoginCredentials {
  encodeUserName() {
    return btoa(process.env.USERNAME);
  }

  encodePasscode() {
    return btoa(process.env.PASSCODE);
  }

  decodeUserName() {
    return atob(this.encodeUserName());
  }

  decodePasscode() {
    return atob(this.encodePasscode());
  }
}

module.exports = { LoginCredentials };
