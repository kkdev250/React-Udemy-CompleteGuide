import * as actionTypes from './actionTypes';
import axios from 'axios'; //not from 'axios-orders' because of different base url!

const authStart = () => { //sync action creator
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (token, userId) => { //sync ActionCreator
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
const authFail = (error) => { //sync AC
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logout = () => { //sync AC (nazwa powinna być authLogout)
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}
const checkAuthTimeout = (expirationTime) => { //async AC
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};
export const auth = (email, password, isSignup) => { //main async AC
  return dispatch => {
    dispatch(authStart());
    //info: 
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    //https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq1JjhGwrt0jQOwuuSExmZDbanYJZnsvg';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq1JjhGwrt0jQOwuuSExmZDbanYJZnsvg';
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => { //sync AC
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => { //async AC (not because of async code but for dispatching multiple actions)
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

//zabezpieczenie bazy w Firebase - Realtime Database | Rules:
/*
{
  "rules": {
    "ingredients": {
      ".read": true,
    	".write": true,
    },
    "orders": {
      ".read": "auth != null",
      ".write":"auth != null",
      ".indexOn": ["userId"]
    }
  }
}*/
//czyli dostęp do '/ingredients' jest dla każdego ale do '/orders' wymaga requestu z tokenem (patrz: order.js)
//(token uzyskujemy zakładając użytkownika w Firebase lub potem logując się)
//dodatkowo:
//".indexOn": ["userId"] - po polu userId możemy wyszukiwać (jest indeksowalne) - aby pobierać tylko własne oders