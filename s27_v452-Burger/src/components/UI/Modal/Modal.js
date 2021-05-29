import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const modal = props => {
  return(
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div 
        className={classes.Modal} 
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
        >
        {props.children}
      </div>
    </Aux>
  );
}

export default React.memo(
  modal, 
  (prevProps, nextProps) => { //React.memo - the compontent will be re-rendered only if props change - 
                              //but you can also add comparision function to indicate if props are still not changed or not
                              //caution: if function returns true: it means no need to re-render, false - do re-render
                              //(it's opposite logic to shouldComponentUpdate lificycle hook)
    if (nextProps.show === prevProps.show && nextProps.children === prevProps.children) {
      return true;
    }
    return false;
  }
);
