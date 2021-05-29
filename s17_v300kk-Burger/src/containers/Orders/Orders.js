import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import  * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.onFetchOrders();
    }, 0); //to let the hoc (withErrorHandler) mount as first and set the interceptors
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order 
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          onRemoveOrder={() => this.props.onRemoveOrder(order.id)}
        />
      ))
    }
    return(
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onRemoveOrder: (id) => dispatch(actions.removeOrder(id)), //KK
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));