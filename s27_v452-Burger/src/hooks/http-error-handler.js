import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  })
  const resInterceptor = httpClient.interceptors.response.use(
    res => res, 
    err => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => { //cleanup function
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [httpClient.interceptors.request, httpClient.interceptors.response, reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler]; //custom hook - returns http request error and function to clear error
}                                        //note: hook doesn't need to return an array, it could be object or whatever else