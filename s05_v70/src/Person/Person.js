import React from 'react';
import styled from 'styled-components';
//import './Person.css';

const StyledDiv = styled.div` 
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 800px) {
    width: 450px;
    background-color: aqua;
  }
`;
//styled.sth: sth (e.g. div, button) is a method, equvalent to HTML tag - that returnns React component...
//...it's a js 'tag function' that uses template literal: function``
//...inside the template literal we pass the styling for this "HTML tag" (in css-way, not js-literal-way)
//...and returning value is styled React component

const person = (props) => {
  return (
    <StyledDiv>
      <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>
    </StyledDiv>
  )
};

export default person;