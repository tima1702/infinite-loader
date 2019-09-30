import { message } from 'antd';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGGED,
  LOGOUT,
} from './constants';

import StorageService from '../../Service/StorageService';

const initialState = {
  loggedIn: false,
  failedLogin: false,
  blockButton: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      message.loading('Action in progress..', 0);
      return {
        ...state,
        loggedIn: false,
        failedLogin: false,
        blockButton: true,
      };
    }
    case LOGIN_SUCCESS: {
      message.destroy();
      return {
        ...state,
        loggedIn: true,
        failedLogin: false,
        blockButton: false,
      };
    }
    case LOGGED: {
      return {
        ...state,
        loggedIn: true,
        failedLogin: false,
        blockButton: false,
      };
    }
    case LOGOUT: {
      StorageService.clearToken();
      return {
        ...state,
        loggedIn: false,
        failedLogin: false,
        blockButton: false,
      };
    }
    case LOGIN_FAILURE: {
      message.destroy();
      if (action.e.status === 500) {
        message.error('Error on server.');
      } else {
        message.error('Error! Please check your input and try again.');
      }

      return {
        ...state,
        loggedIn: false,
        failedLogin: true,
        blockButton: false,
      };
    }
    default:
      return state;
  }
}
