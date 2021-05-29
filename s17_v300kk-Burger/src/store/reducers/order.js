import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false});
  // return {
  //   ...state,
  //   purchased: false,
  // }
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {loading: true});
  // return {
  //   ...state,
  //   loading: true,
  // }
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId});
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
  // const newOrder = {
  //   ...action.orderData,
  //   id: action.orderId,
  // }
  // return {
  //   ...state,
  //   loading: false,
  //   purchased: true,
  //   orders: state.orders.concat(newOrder),
  // }
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {loading: false});
  // return {
  //   ...state,
  //   loading: false,
  // }
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {loading: true});
  // return {
  //   ...state,
  //   loading: true,
  // }
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
  // return {
  //   ...state,
  //   orders: action.orders,
  //   loading: false,
  // }
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, {loading: false});
  // return {
  //   ...state,
  //   loading: false,
  // }
};

//KK...
const removeOrderStart = (state, action) => {
  return {
    ...state,
    loading: true,
  }
}
const removeOrderSuccess = (state, action) => {
  const updatedOrders = state.orders.filter(order => order.id !== action.id);
  return {
    ...state,
    orders: updatedOrders,
    loading: false,
  }
}
const removeOrderFail = (state, action) => {
  return {
    ...state,
    loading: false,
  }
}
//...KK

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
    case actionTypes.REMOVE_ORDER_START: return removeOrderStart(state, action); //KK
    case actionTypes.REMOVE_ORDER_SUCCESS: return removeOrderSuccess(state, action); //KK
    case actionTypes.REMOVE_ORDER_FAIL: return removeOrderFail(state, action); //KK
    default: return state;
  }
}

export default reducer;