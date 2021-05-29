import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); //to prevent trying to submit the form and reload the page
    console.log(this.props.ingredients);
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Max',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Zanzibar'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest',
    }
    axios.post('/orders.json', order) //format endpointu w Firebase jest taki: '[baseURL]/dowolna_nazwa.json'
     .then(response => {
       console.log(response)
       this.setState({loading: false});
       this.props.history.push('/');
      })
     .catch(error => {
       console.log(error)
       this.setState({loading: false});
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
};

export default ContactData;