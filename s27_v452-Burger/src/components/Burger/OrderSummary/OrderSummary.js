import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button//Button';

const orderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients).map(([ingredient, amount]) => (
    <li key={ingredient}>
      <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {amount}
    </li>
  )); 
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
}

export default orderSummary;