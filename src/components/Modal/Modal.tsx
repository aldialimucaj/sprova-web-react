import React, { useState, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from '../Card';
import './Modal.scss';

interface Props {
  onClose?: () => void;
  open: boolean;
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  onClose,
  open = false,
}) => {
  return (
    <Fragment>
      <CSSTransition
        in={open}
        timeout={100}
        unmountOnExit={true}
        classNames="sprova-modal-fade"
      >
        <div className="sprova-modal">
          <Card>{children}</Card>
        </div>
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={100}
        unmountOnExit={true}
        classNames="sprova-modal-overlay-fade"
      >
        <div className="sprova-modal-overlay" onClick={onClose} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
