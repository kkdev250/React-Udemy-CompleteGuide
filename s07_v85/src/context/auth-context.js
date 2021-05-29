import React from 'react';

const authContext = React.createContext({
  authenticated: false, //default value, not necessary, set here for better auto-complete
  login: () => {},
});

export default authContext;