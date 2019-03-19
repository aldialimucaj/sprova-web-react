import { Form, Input } from 'antd';
import React, { useState } from 'react';

const TextArea = Input.TextArea;

interface Props {
  colon?: boolean;
  label: string;
  minLength?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  value: string;
}

const FormTextArea: React.FunctionComponent<Props> = ({
  colon = false,
  label,
  minLength = 2,
  onChange,
  placeholder = '',
  required = false,
  value,
}) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const validate = (_value: string): [string, string] => {
    if (!required || _value) {
      return ['success', ''];
    } else {
      return ['error', `${label} is required`];
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <TextArea
        value={value}
        minLength={minLength}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default FormTextArea;
