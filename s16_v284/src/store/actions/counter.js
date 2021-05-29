import * as actionTypes from './actionTypes';

export const increment = () => { //Action Creator - the same name as action name, but in camelCase
  return {  //returns action object with mandatory 'type' property
    type: actionTypes.INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: actionTypes.DECREMENT,
  };
};

export const add = (value) => {
  return {
    type: actionTypes.ADD,
    val: value,
  };
};

export const subtract = (value) => {
  return {
    type: actionTypes.SUBTRACT,
    val: value,
  };
};
