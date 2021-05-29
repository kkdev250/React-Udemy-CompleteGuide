import React from 'react';
import Radium from 'radium';
import './Person.css';

const person = (props) => {
  const style = {
    '@media (min-width: 800px)': { // @media thanks to RADIUM
      width: '450px',
      backgroundColor: 'aqua',
    }
  };
  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  )
};

export default Radium(person); //Radium() - to support @media