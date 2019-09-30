import NetService from './NetService';
import StorageService from './StorageService';
class ApiService {
  async login(username, password, venueID) {
    return NetService.post(
      '/users/login',
      {
        Username: username,
        Password: password,
        VenueID: venueID,
      },
      { 'Content-Type': 'application/json' },
    );
  }
  async getAccessToken(client_id, username, password, client_secret) {
    return NetService.post(
      '/oauth/token',
      {
        grant_type: 'password',
        client_id,
        username,
        password,
        client_secret,
      },
      { 'Content-Type': 'application/json' },
      true,
    );
  }

  async getData(startIndex, stopIndex) {
    const token = StorageService.getAccessToken();
    const tokenType = StorageService.getAccessTokenType();
    return NetService.get(
      '/events/range/' + startIndex + '/' + stopIndex,
      {},
      {
        'Content-Type': 'application/json',
        Authorization: tokenType + ' ' + token,
      },
    );
  }
}

export default new ApiService();
