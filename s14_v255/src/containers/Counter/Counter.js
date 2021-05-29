//standalone redux demo in redux-basics.js file!!!

import React, { Component } from 'react';
import { connect } from 'react-redux';  //connect is a function that returns hoc
import * as actionTypes from '../../store/actions';
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
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li 
                            key={strResult.id} 
                            onClick={() => this.props.onDeleteResult(strResult.id)}>
                                {strResult.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

//after class!!:
const mapStateToProps = state => { //state: redux's store
    return {
        ctr: state.ctr.counter, //'counter' from redux's store will be accessible as a prop 'ctr'
        storedResults: state.res.results,
    };
};
const mapDispatchToProps = dispatch => { //dispatch is a redux.dispatch function for dispatching actions
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}), //in a prop 'onIncrementCounter' will be a function that dispatches 'INCREMENT' action
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter); //connecting Counter component to redux