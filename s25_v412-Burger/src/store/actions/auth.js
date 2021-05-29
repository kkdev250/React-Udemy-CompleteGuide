import * as actionTypes from './actionTypes';

export const authStart = () => { //sync action creator
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => { //sync ActionCreator
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => { //sync AC
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logout = () => { //sync AC
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');  //change - no additional code (it will be handled by redux saga)
  return {                               //now AC only returns the action object
    type: actionTypes.AUTH_INITIATE_LOGOUT, //instead of 'AUTH_LOGOUT' - this action will be intercepted by saga watcher watchAuth() in sagas/index.js
  }
}
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};
export const checkAuthTimeout = (expirationTime) => { //before saga: async AC, now sync AC + async code in saga
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   }, expirationTime * 1000);
  // }
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT, //this action will be intercepted by saga watcher watchAuth() in sagas/index.js
    expirationTime: expirationTime,
  }
};
export const auth = (email, password, isSignup) => { //main async AC, now async part is in the saga
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup,
  }
};

export const setAuthRedirectPath = (path) => { //sync AC
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => { 
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  }
}
