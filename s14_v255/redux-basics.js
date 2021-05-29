//this file is to show how to use redux (without react) - it'll be run with node.js: node redux-basics.js
const redux = require('redux'); //node.js syntax for import
const createStore = redux.createStore;

const initialState = {
  counter: 0,
}

// Reducer
const rootReducer = (state=initialState, action) => { //for first run use initialState
  if (action.type === 'INC_COUNTER') {
    return {
      ...state, //first create copy (shallow!) of state...
      counter: state.counter + 1, //...then overwrite some of state properties
    }
  }
  if (action.type === 'ADD_COUNTER') {
    return {
      ...state, 
      counter: state.counter + action.value,
    }
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({type: 'INC_COUNTER'}); //'type' property is mandatory in dispatching actions!
console.log('between dispatching')
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
