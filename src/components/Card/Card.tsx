import classnames from 'classnames';
import React from 'react';
import './Card.scss';

interface Props {
  actions?: React.ReactNode;
  padded?: boolean;
  title?: React.ReactNode;
}

const Card: React.FunctionComponent<Props> = ({
  actions,
  children,
  padded = true,
  title,
}) => {
  return (
    <div className="sprova-card">
      {(actions || title) && (
        <div className="sprova-card-header">
          {title && <div className="sprova-card-header-title">{title}</div>}
          {actions && (
            <div className="sprova-card-header-actions">{actions}</div>
          )}
        </div>
      )}
      <div className={classnames('sprova-card-body', { 'is-padded': padded })}>
        {children}
      </div>
    </div>
  );
};

export default Card;
