import React from 'react';
import './Person.css';

const person = (props) => {
    const onChangeHandler = (event) => {
        props.changed(event);
    }
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={onChangeHandler} value={props.name}/>
        </div>
    )
};

export default person;