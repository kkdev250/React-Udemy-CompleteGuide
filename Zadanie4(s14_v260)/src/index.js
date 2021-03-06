import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';

const store = createStore(reducer); //create store before mounting react app

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
); //wrap <App /> with redux's Provider

registerServiceWorker();
