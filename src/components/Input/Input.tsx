import cx from 'classnames';
import React, { Fragment } from 'react';
import './Input.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: any;
  type?: string;
  value: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  placeholder,
  required = false,
  onChange,
  style,
  type = 'text',
  value,
}) => {
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
