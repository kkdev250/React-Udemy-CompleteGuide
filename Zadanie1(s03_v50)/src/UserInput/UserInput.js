import React from 'react';

const UserInput = (props) => {
  const style = {
    backgroundColor: 'lightyellow',
  }
  return (
    <div>
      <label for="user">user name: </label>
      <input 
        id="user" 
        type="text" 
        onChange={props.change} 
        value={props.name}
        style={style}
      />
    </div>
  )
};

export default UserInput;