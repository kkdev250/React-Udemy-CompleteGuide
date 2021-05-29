import React from 'react';

const ValidationComponent = props => {
  let result = null;
  if (props.textLength < 5) {
    result = <p>Text too short</p>
  } else if (props.textLength > 10) {
    result = <p>Text too long</p>
  }
  return (
    <div>
      {result}
      {
        props.textLength === 8 ? 
          <p>perfect!</p>
        : null
      }
    </div>
  )
};

export default ValidationComponent;