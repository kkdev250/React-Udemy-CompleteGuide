import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import './List.css';

class List extends Component {
    state = {
        items: {
          [Math.random().toString(36).substr(2, 5)]: 1,
          [Math.random().toString(36).substr(2, 5)]: 2,
          [Math.random().toString(36).substr(2, 5)]: 3
        }
      }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: {
                    ...prevState.items,
                    [Math.random().toString(36).substr(2, 5)]: Object.keys(prevState.items).length + 1
                }
            };
        });
    }

    removeItemHandler = (selIndex) => {
        let newItems = {};
        this.setState((prevState) => {
            for (const prop in prevState.items) {
                console.log(prop, prevState.items[prop]);
                if (prop !== selIndex) {
                    newItems = {
                        ...newItems,
                        [prop]: prevState.items[prop]
                    }
                }
            }
            return { items: newItems };
        });
    }

    render () {
        const listItems = Object.entries(this.state.items).map( (item, index) => (
            <CSSTransition
                key={item[0]}
                classNames="fade"
                timeout={300}
            >
                <li 
                    className="ListItem" 
                    onClick={() => this.removeItemHandler(item[0])}>{item[1]}</li>
            </CSSTransition>
        ) );

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                {/*<ul className="List">*/}
                <TransitionGroup component="ul" className="List">
                    {listItems}
                </TransitionGroup>
                {/*</ul>*/}
            </div>
        );
    }
}

export default List;