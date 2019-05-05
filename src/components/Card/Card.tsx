import classnames from 'classnames';
import React from 'react';
import './Card.scss';

interface CardBodyProps {
  padded?: boolean;
}

export const CardBody: React.FunctionComponent<CardBodyProps> = ({
  children,
  padded = true,
}) => {
  return (
    <div className={classnames('sprova-card-body', { 'is-padded': padded })}>
      {children}
    </div>
  );
};

export const CardHeader: React.FunctionComponent = ({ children }) => {
  return <div className="sprova-card-header">{children}</div>;
};

interface CardProps {
  onClick?: () => void;
  status?: 'success' | 'danger' | 'warning' | 'info';
  style?: any;
}

const Card: React.FunctionComponent<CardProps> = ({
  children,
  onClick,
  status,
  style,
}) => {
  return (
    <div
      className={classnames(
        'sprova-card',
        { clickable: onClick },
        { [`is-${status}`]: status }
      )}
      onClick={() => onClick && onClick()}
      style={{ ...style }}
    >
      {children}
      {status && <div className="sprova-card-status-bar" />}
    </div>
  );
};

export default Card;
