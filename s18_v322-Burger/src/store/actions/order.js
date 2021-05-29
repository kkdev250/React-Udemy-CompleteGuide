import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { useImperativeHandle } from 'react';

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}
const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
}
const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log(response.data)
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}
const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  }
}
const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}
export const fetchOrders = (token, userId) => {
  return (dispatch, getState) => { //in async AC we have not only 'dispatch', but 'getState' too - thanks to thunk middleware
    dispatch(fetchOrdersStart());  //so it was possible to get token and userId using 'getState'
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    //query pametry Firebase'a: 
    // ?auth=(token) -token autoryzacyjny do requestu, 
    // &orderBy="userId"&equalTo=(id) - składnia FB do zwracania tylko tych wpisów do bazy, które mają określone userId
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      });
  }
}