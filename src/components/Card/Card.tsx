import classnames from 'classnames';
import React from 'react';
import './Card.scss';

interface Props {
  actions?: React.ReactNode;
  centerContent?: boolean;
  onClick?: () => void;
  padded?: boolean;
  status?: 'success' | 'danger' | 'warning' | 'info';
  style?: any;
  title?: React.ReactNode;
}

const Card: React.FunctionComponent<Props> = ({
  actions,
  centerContent = false,
  children,
  onClick,
  padded = true,
  status,
  style,
  title,
}) => {
  return (
    <div
      className={classnames(
        'sprova-card',
        { clickable: onClick },
        { centered: centerContent },
        { [`is-${status}`]: status }
      )}
      onClick={() => onClick && onClick()}
      style={{ ...style }}
    >
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
      {status && <div className="sprova-card-status-bar" />}
    </div>
  );
};

export default Card;
