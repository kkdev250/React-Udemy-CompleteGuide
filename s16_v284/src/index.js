import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //middleware for running async code in redux
import { Provider } from 'react-redux';
//import reducer from './store/reducer';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

const logger = store => {//middleware - running code between action and reducer
  return next => {      //(function that returns function that returns funcion)
    return action => {
      console.log('[Middleware] Dispatching ', action);
      const result = next(action); //next(action) - dispatching the action
      console.log('[Middleware] next state', store.getState()); //getting updated state 
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(rootReducer); //create store before mounting react app
//const store = createStore(rootReducer, applyMiddleware(logger)); //with middleware
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk))); //with Redux DevTools

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
); //wrap <App /> with redux's Provider

registerServiceWorker();
