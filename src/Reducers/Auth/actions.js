import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGGED
} from "./constants";

import StorageService from "../../Service/StorageService";
import ApiService from "../../Service/ApiService";

export const login = values => (dispatch, getState) => {
  const { username, password, venueID } = values;

  dispatch({ type: LOGIN_REQUEST });

  ApiService.login(username, password, venueID)
    .then(resp => {
      const obj = JSON.parse(resp);
      ApiService.getAccessToken(
        obj.Clients[0].ID,
        username,
        password,
        obj.Clients[0].Secret
      )
        .then(resp => {
          const obj = JSON.parse(resp);

          StorageService.setAccessToken(
            obj.token_type,
            obj.expires_in,
            obj.access_token
          );

          dispatch({ type: LOGIN_SUCCESS });
        })
        .catch(e => {
          dispatch({ type: LOGIN_FAILURE, e });
        });
    })
    .catch(e => {
      dispatch({ type: LOGIN_FAILURE, e });
    });
};

export const userLogged = () => (dispatch, getState) => {
  dispatch({ type: LOGGED });
};
