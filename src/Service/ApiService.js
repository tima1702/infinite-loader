import NetService from "./NetService";

class ApiService {
  async login(username, password, venueID) {
    return NetService.post(
      "/users/login",
      {
        Username: username,
        Password: password,
        VenueID: venueID
      },
      { "Content-Type": "application/json" }
    );
  }
  async getAccessToken(client_id, username, password, client_secret) {
    return NetService.post(
      "/oauth/token",
      {
        grant_type: "password",
        client_id,
        username,
        password,
        client_secret
      },
      { "Content-Type": "application/json" },
      true
    );
  }
}

export default new ApiService();
