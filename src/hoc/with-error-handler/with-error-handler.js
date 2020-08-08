import React from 'react';
import Aux from '../Auxx-hoc';
import Modal from '../../components/UI/modal/modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const WithErrorHandler = (WrappedComponent, axios) => {
  return props => {
      // eslint-disable-next-line
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default WithErrorHandler;
