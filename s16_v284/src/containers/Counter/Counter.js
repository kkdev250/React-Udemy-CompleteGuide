//standalone redux demo in redux-basics.js file!!!

import React, { Component } from 'react';
import { connect } from 'react-redux';  //connect is a function that returns hoc
import * as actionCreators from '../../store/actions/index';
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
        onIncrementCounter: () => dispatch(actionCreators.increment()), //in a prop 'onIncrementCounter' will be a function that dispatches 'INCREMENT' action
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(10)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter); //connecting Counter component to redux