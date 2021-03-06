import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show !== this.props.show) {
      return true
    }
    return false;
  }

  // componentDidUpdate() {
  //   console.log('[Modal] DidUpdate')
  // }

  render() {
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
          className={classes.Modal} 
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
          >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;