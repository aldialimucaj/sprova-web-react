import classnames from 'classnames';
import React from 'react';
import './Card.scss';

interface Props {
  actions?: React.ReactNode;
  centerContent?: boolean;
  onClick?: () => void;
  padded?: boolean;
  style?: any;
  title?: React.ReactNode;
}

const Card: React.FunctionComponent<Props> = ({
  actions,
  centerContent = false,
  children,
  onClick,
  padded = true,
  style,
  title,
}) => {
  return (
    <div
      className={classnames(
        'sprova-card',
        { clickable: onClick },
        { centered: centerContent }
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
    </div>
  );
};

export default Card;
