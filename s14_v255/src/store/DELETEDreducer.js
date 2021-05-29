import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: [],
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
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: state.counter}), //concat returns a NEW array, not manipulate the oryginal one (like push does)
      }
    case actionTypes.DELETE_RESULT:
      /*const id = 2;
      const newArray = [...state.results]; //shallow copy of array (deleting object from array is ok, but not manipulate the object)
      newArray.splice(id, 1);*/
      const updatedArray = state.results.filter(result => result.id !== action.resultElId);
      return {
        ...state,
        results: updatedArray,
      }
  }
  return state;
};

export default reducer;