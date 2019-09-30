import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGGED
} from "./constants";

import { message } from "antd";
const initialState = {
  loggedIn: false,
  failedLogin: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loggedIn: false, failedLogin: false };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loggedIn: true, failedLogin: false };
    }
    case LOGGED: {
      return { ...state, loggedIn: true, failedLogin: false };
    }
    case LOGIN_FAILURE: {
      if (action.e.status === 500) {
        message.error("Error on server.");
      } else {
        message.error("Error! Please check your input and try again.");
      }

      console.log("LOGIN_FAILURE", action.e);
      return { ...state, loggedIn: false, failedLogin: true };
    }
    default:
      return state;
  }
}
