import { Form, Select } from 'antd';
import React, { useState } from 'react';

interface Props {
  className?: string;
  colon?: boolean;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  style?: any;
  value: string;
}

const FormSelect: React.FunctionComponent<Props> = ({
  className,
  children,
  colon = false,
  label,
  onChange,
  required = false,
  style,
  value,
}) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const validate = (_value: string): [string, string] => {
    if (!required) {
      return ['', ''];
    } else if (_value) {
      return ['success', ''];
    } else {
      return ['error', `${label} is required`];
    }
  };

  const handleChange = (_value: string) => {
    const [_status, _error] = validate(_value);
    if (_status !== status) {
      setStatus(_status);
    }
    if (_error !== error) {
      setError(_error);
    }
    onChange(_value);
  };

  return (
    <Form.Item
      required={required}
      label={label}
      colon={colon}
      validateStatus={status as any}
      hasFeedback={true}
      help={error}
    >
      <Select<string>
        {...style}
        className={className}
        value={value}
        onChange={handleChange}
      >
        {children}
      </Select>
    </Form.Item>
  );
};

export default FormSelect;
