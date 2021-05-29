import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  results: [],
};

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter(result => result.id !== action.resultElId);
  return updateObject(state, {results: updatedArray});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const updatedResult = action.result * 2; //additional logic
      return updateObject(state, {results: state.results.concat({id: new Date(), value: updatedResult})});
      //or without 'updateObject' utility function:
      // return {
      //   ...state,
      //   results: state.results.concat({id: new Date(), value: updatedResult}), //concat returns a NEW array, not manipulate the oryginal one (like push does)
      // }
    case actionTypes.DELETE_RESULT:
      /*const id = 2;
      const newArray = [...state.results]; //shallow copy of array (deleting object from array is ok, but not manipulate the object)
      newArray.splice(id, 1);*/
      return deleteResult(state, action);
      //or without 'updateObject' and 'deleteResult' utility functions:
      // const updatedArray = state.results.filter(result => result.id !== action.resultElId);
      // return {
      //   ...state,
      //   results: updatedArray,
      // }
  }
  return state;
};

export default reducer;