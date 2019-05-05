import cx from 'classnames';
import React, { Fragment } from 'react';
import './TextArea.scss';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: any;
  value: string;
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  label,
  placeholder,
  required = false,
  rows,
  onChange,
  style,
  value,
}) => {
  return (
    <Fragment>
      {label && (
        <label
          className={cx('sprova-textarea-label', { 'is-required': required })}
        >
          {label}
        </label>
      )}
      <textarea
        className="sprova-textarea"
        onChange={onChange}
        placeholder={placeholder}
        style={{ ...style }}
        value={value}
      />
    </Fragment>
  );
};

export default TextArea;
