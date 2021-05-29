import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  }

  showModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button 
          className="Button"
          onClick={() => 
            this.setState(prevState => ({showBlock: !prevState.showBlock}))}
        >
          Toggle
        </button>
        <br />
        <Transition in={this.state.showBlock} timeout={1000}>
          {//'in' prop: boolean, meaning 'show' (true/false)
          //inside <Transition> tag we should render a JSX function, which receives one 
          //string parameter (name is up to you, e.g. 'transitionState', or 'state' with values:
          //after changing 'in' to true: 'entering', after 'timeout'[ms]: 'entered'
          //after changing 'in' to false: 'exiting', after 'timeout'[ms]: 'exited'
          transitionState => <p>{transitionState}</p>}
        </Transition>
        <Transition 
          in={this.state.showBlock} 
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          {transitionState => (
            <div
              style={{
                backgroundColor: 'red',
                width: 100, //==='100px'
                height: 100,
                margin: 'auto',
                opacity: transitionState === 'exiting' ? 0 : 1,
                transition: 'opacity 1000ms ease-out',
              }}
            />
          )}
        </Transition>
        <Transition 
          in={this.state.modalIsOpen} 
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {transitionState => (
            <Modal show={transitionState} closed={this.closeModal} />
          )}
        </Transition>
        {this.state.modalIsOpen ? <Backdrop show /> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
