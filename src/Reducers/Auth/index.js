import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGGED
} from "./constants";

const initialState = {
  loggedIn: false,
  failedLogin: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      console.log("LOGIN_REQUEST");
      return { ...state, loggedIn: false, failedLogin: false };
    }
    case LOGIN_SUCCESS: {
      console.log("LOGIN_SUCCESS");
      return { ...state, loggedIn: true, failedLogin: false };
    }
    case LOGGED: {
      return { ...state, loggedIn: true, failedLogin: false };
    }
    case LOGIN_FAILURE: {
      console.log("LOGIN_FAILURE", action.e);
      return { ...state, loggedIn: false, failedLogin: true };
    }
    default:
      return state;
  }
}
