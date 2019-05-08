import Level from '@/components/Level';
import cx from 'classnames';
import React, { Fragment } from 'react';
import './TextArea.scss';

interface TextAreaProps {
  disabled?: boolean;
  extra?: React.ReactNode;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: any;
  value: string;
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  disabled = false,
  extra,
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
        <Level className="sprova-textarea-level">
          <label
            className={cx('sprova-textarea-label', { 'is-required': required })}
          >
            {label}
          </label>
          {extra}
        </Level>
      )}
      {!disabled ? (
        <textarea
          className="sprova-textarea"
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...style }}
          value={value}
        />
      ) : (
        <p>{value}</p>
      )}
    </Fragment>
  );
};

export default TextArea;
