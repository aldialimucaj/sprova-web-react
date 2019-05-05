import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import Card, { CardBody, CardHeader } from '../Card';
import './Modal.scss';

interface Props {
  onClose?: () => void;
  open: boolean;
  title?: string;
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  onClose,
  open = false,
  title,
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
          <Card>
            <CardHeader>
              <h3>{title}</h3>
            </CardHeader>
            <CardBody>{children}</CardBody>
          </Card>
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
