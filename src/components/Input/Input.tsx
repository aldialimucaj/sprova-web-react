import cx from 'classnames';
import React, { Fragment } from 'react';
import './Input.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  style?: any;
  type?: string;
  value: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  placeholder,
  required = false,
  onChange,
  onEnter,
  style,
  type = 'text',
  value,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && onEnter) {
      onEnter();
    }
  };

  return (
    <Fragment>
      {label && (
        <label
          className={cx('sprova-input-label', { 'is-required': required })}
        >
          {label}
        </label>
      )}
      <input
        onKeyDown={handleKeyDown}
        className="sprova-input"
        onChange={onChange}
        placeholder={placeholder}
        style={{ ...style }}
        type={type}
        value={value}
      />
    </Fragment>
  );
};

export default Input;
