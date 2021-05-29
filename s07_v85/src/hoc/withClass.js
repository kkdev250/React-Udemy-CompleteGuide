import React from 'react';

//2'nd way to create HOC:
const withClass = (WrappedComponent, className) => { //withClass (lowercase)- js function that returns component
  return props => (
    <div className={className}>
      <WrappedComponent {...props}/>
    </div>
  );
}
//<WrappedComponent props={props}/> == <WrappedComponent {...props}/>

export default withClass;

//usage:
// export default withClass(ComponentToWrap, args)