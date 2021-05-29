import { takeEvery, all, takeLatest } from 'redux-saga/effects'; 
//takeEvery - watch for every action and run saga
//takeLast - take only last of ongoing actions and run saga e.g. actions after multiple fast clicks
//all - to run multiple task simultaneously
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);

}
//when we execute this generator it will setup a 'listener' for e.g. 'AUTH_INITIATE_LOGOUT' action
//and then execute the 'logoutSaga' saga (which will execute the additional code + dispatch the 'AUTH_LOGOUT' action)

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}