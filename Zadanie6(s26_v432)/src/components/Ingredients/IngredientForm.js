import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  //const [inputState, setInputState] = useState({title: '', amount: '' }); //NOT recommended way: state as one object
  const [enteredTitle, setEnteredTitle] = useState(''); //it MUCH EASIER when you split the state (for useState hook)...
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              oldvalue="value={inputState.title}"
              value={enteredTitle}
              onChange={event => {
                //const newTitle = event.target.value;
                //setInputState(previousInputState => ({  
                //  title: newTitle, 
                //  amount: previousInputState.amount //...and here is WHY: you have to manually keep other state properties unchanged 
                //}))                                 
                setEnteredTitle(event.target.value); //for single-item state it's as simple as that
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              oldvalue="value={inputState.amount}"
              value={enteredAmount}
              onChange={event => {
                //const newAmount = event.target.value;
                //setInputState(previousInputState => ({
                //  amount: newAmount, 
                //  title: previousInputState.title
                //}))
                setEnteredAmount(event.target.value);
              }} 
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
