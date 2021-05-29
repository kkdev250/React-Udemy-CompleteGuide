import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'; //all axios imports share the same configuration!!!

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'; //global baseURL
axios.defaults.headers.common['Authorization'] = 'MY AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const int1 = axios.interceptors.request.use(  //INTERCEPTOR for sending requests
  (request) => {
    console.log('intercepted request:');
    console.log(request);
    //here we can EDIT the request before sending (e.g. add authorization header)
    return request; //if we don't return that will STOP the request!!!
  },
  (error) => { //for SENDING requests errors only - if we're unable to send a request (e.g. no internet)
    console.log('intercepted request error:');
    console.log(error);
    return Promise.reject(error);
  }
);

const int2 = axios.interceptors.response.use(  //INTERCEPTOR for responses
  (response) => {
    console.log('intercepted response:');
    console.log(response);
    //here we can EDIT the response before continuing
    return response;
  },
  (error) => {
    console.log('intercepted response error:');
    console.log(error);
    return Promise.reject(error);
  }
);

setTimeout(()=>{ //removing interceptors
  axios.interceptors.request.eject(int1);
  axios.interceptors.response.eject(int2);
}, 5000)

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
