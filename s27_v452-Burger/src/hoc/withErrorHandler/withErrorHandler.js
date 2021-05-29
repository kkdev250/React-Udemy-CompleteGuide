import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => { //lowercase - it doesn't return JSX, it's a js function, that returns component
  return props => { //here we return anonymous, functional component
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal 
          show={error}
          modalClosed={clearError}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;