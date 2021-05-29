import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const [key, value] of query.entries()) {
      if (key === 'price') {
        price = value;
      } else {
        ingredients[key] = +value;
      }
    }
    this.setState({ingredients, totalPrice: price});
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
          {/*differences in component rendering in routing: */}
          {/*component={ContactData} - ContactData will receive in its props the match, location and history objects*/}
          {/*render={()=>ContactData />} - ContactData is manually rendered, it will NOT receive the 3 routing props*/}
          {/*render={(props)=>ContactData {...props}/>} - now ContactData will not get the match, location and history*/}
      </div>
    );
  }
}

export default Checkout;