import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button//Button';

class OrderSummary extends Component {
  //this could be a functional component, doesn't have to be a class
  // componentDidUpdate() {
  //   console.log('[OrderSummary} DidUpdate')
  // }

  render() {
    this.ingredientSummary = Object.entries(this.props.ingredients).map(([ingredient, amount]) => (
      <li key={ingredient}>
        <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {amount}
      </li>
    )); 
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {this.ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;