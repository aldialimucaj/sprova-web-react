import { Form, Input } from 'antd';
import React, { useState } from 'react';

interface Props {
  colon?: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}

const FormInput: React.FunctionComponent<Props> = ({
  colon = false,
  label,
  onChange,
  placeholder = '',
  required = false,
  type = 'text',
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: _value } = event.currentTarget;
    const [_status, _error] = validate(_value);
    if (_status !== status) {
      setStatus(_status);
    }
    if (_error !== error) {
      setError(_error);
    }
    onChange(event);
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
      <Input
        value={value}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default FormInput;
