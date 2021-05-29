import { delay } from 'redux-saga/effects'; //'delay' - equivalent of setTimeout
import { put, call } from 'redux-saga/effects'; //'put' dispatches the action
import * as actions from '../actions/index';
import axios from 'axios'; //not from 'axios-orders' because of different base url!


export function* logoutSaga(action) { //function* - ES6 generator
  //yield localStorage.removeItem('token'); //yield - single step: execute this and wait for it to finish
  yield call([localStorage, 'removeItem' ], 'token'); //to samo co wyżej, ale z call umożliwia testowanie generatora
  //yield localStorage.removeItem('expirationDate');
  //yield localStorage.removeItem('userId');
  yield call([localStorage, 'removeItem' ], 'expirationDate');
  yield call([localStorage, 'removeItem' ], 'userId');
  yield put(actions.logoutSucceed()); //dispatch sync AC
}

export function* checkAuthTimeoutSaga(action) {
  //setTimeout(() => {
  //  dispatch(logout());
  //}, expirationTime * 1000);
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq1JjhGwrt0jQOwuuSExmZDbanYJZnsvg';
  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq1JjhGwrt0jQOwuuSExmZDbanYJZnsvg';
  }
  try {
    const response = yield axios.post(url, authData); //yield will pause and wait wait for the promise to resolve or reject

    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken); //localstorage get/set is sync - so yield is not needed
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch(error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}