import * as actionTypes from './actionTypes';

             //nazwa sync AC - inna niż nazwa akacji i asyncAC
const saveResult = (res) => { //synchronous Action Creator
  // const updatedResult = res * 2; //you can put some logic here, but better in the reducer
  return {
    type: actionTypes.STORE_RESULT, //nazwa akcji - UPPERCASE
    result: res,
  }
};           //nazwa async AC - ta sama jak nazwa akcji, ale camelCase
export const storeResult = (res) => { //asynchronous Action Creator - returns not an action object but function
  return (dispatch, getState) => { //here we have access to 'dispatch' thanks to redux-thunk middleware
    setTimeout(() => { //running async code...
      const oldCounter = getState().ctr.counter;
      console.log(oldCounter);
      dispatch(saveResult(res)); //after asnyc event - dispatch syncronous action
    }, 2000)
  }
};
//to co normalnie zwraca Action Creator (AC) to obiekt akcji {type: 'sth', ...}
//ten obiekt trafia do middleware i do reducer'a
//ale tu jest inaczej: asynchroniczny AC nie zwraca obiektu akcji, tylko funkcję, która trafia do thunk middleware
//thunk tą funkcję wywołuje (zamiast next(action)), jako parametr przekazując funkcję 'dispatch' (i getState)
//wewnątrz funkcji zwracanej przez acync AC można wywołać asynchroniczny kod a następnie
//dispatchować synchroniczny AC (ta akcja też trafia do thunk middleware - ale tym razem jest to obiekt akcji, 
//a nie funkcja - więc thunk middleware 'przepuszcza' ją dalej (next(action)) - do reducera)

export const deleteResult = (resElId) => { 
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: resElId,
  }
};