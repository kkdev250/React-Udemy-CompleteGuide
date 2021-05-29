//standalone redux demo in redux-basics.js file!!!

import React, { Component } from 'react';
import { connect } from 'react-redux';  //connect is a function that returns hoc

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 8" clicked={this.props.onSubtractCounter} />
            </div>
        );
    }
}

//after class!!:
const mapStateToProps = state => { //state: redux's store
    return {
        ctr: state.counter, //'counter' from redux's store will be accessible as a prop 'ctr'
    };
};
const mapDispatchToProps = dispatch => { //dispatch is a redux.dispatch function for dispatching actions
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}), //in a prop 'onIncrementCounter' will be a function that dispatches 'INCREMENT' action
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD'}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT'}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter); //connecting Counter component to redux