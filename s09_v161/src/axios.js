import axios from 'axios';

const instance1 = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', //instance1 baseURL
});

instance1.defaults.headers.common['Authorization'] = 'MY AUTH TOKEN FROM AXIOS INSTANCE1';

// instance1.interceptors.request...

export default instance1;