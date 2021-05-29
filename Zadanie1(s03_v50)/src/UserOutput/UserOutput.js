import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>{props.userName}</p>
      <p>paragraph one</p>
      <p>paragraph two</p>
    </div>
  )
};

export default UserOutput;