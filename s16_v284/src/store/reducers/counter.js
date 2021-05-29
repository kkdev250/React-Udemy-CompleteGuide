import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObject(state, {counter: state.counter +1});
      //or without 'updateObject' utility function:
      // const newState = Object.assign({}, state); //shallow copy
      // newState.counter = state.counter + 1;
      // return newState;
    case actionTypes.DECREMENT:
      return updateObject(state, {counter: state.counter -1});
      //or without 'updateObject' utility function:
      // return { //return new js object
      //   ...state, //shallow copy
      //   counter: state.counter -1, //overwrite 'counter' with new value
      // }
    case actionTypes.ADD:
      return updateObject(state, {counter: state.counter + action.val});
      //or without 'updateObject' utility function:
      // return {
      //   ...state,
      //   counter: state.counter + action.val,
      // }
    case actionTypes.SUBTRACT:
      return updateObject(state, {counter: state.counter - action.val});
      //or without 'updateObject' utility function:
      // return {
      //   ...state,
      //   counter: state.counter - action.val,
      // }
  }
  return state;
};

export default reducer;