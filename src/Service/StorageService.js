class StorageService {
  setAccessToken(token_type, expires_in, access_token) {
    localStorage.setItem(
      "APP:AccessToken",
      JSON.stringify({
        token_type,
        expires_in: Math.round(new Date().getTime() / 1000) + expires_in,
        access_token
      })
    );
  }

  getAccessToken() {
    const str = localStorage.getItem("APP:AccessToken");
    if (str) return JSON.parse(str).access_token;
    return false;
  }

  // return true is token valid
  checkAccessToken() {
    const str = localStorage.getItem("APP:AccessToken");
    if (
      str &&
      Math.round(new Date().getTime() / 1000) < JSON.parse(str).expires_in
    )
      return true;
    return false;
  }
}

export default new StorageService();
