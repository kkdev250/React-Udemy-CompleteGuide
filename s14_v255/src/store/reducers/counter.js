import * as actionTypes from '../actions';

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      const newState = Object.assign({}, state); //shallow copy
      newState.counter = state.counter + 1;
      return newState;
    case actionTypes.DECREMENT:
      return { //return new js object
        ...state, //shallow copy
        counter: state.counter -1, //overwrite 'counter' with new value
      }
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.val,
      }
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.val,
      }
  }
  return state;
};

export default reducer;