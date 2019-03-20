import { Form, Select } from 'antd';
import React, { useState } from 'react';

interface Props {
  colon?: boolean;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}

const FormSearchSelect: React.FunctionComponent<Props> = ({
  children,
  colon = false,
  label,
  onChange,
  required = false,
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
      <Select<string> value={value} onChange={handleChange}>
        {children}
      </Select>
    </Form.Item>
  );
};

export default FormSearchSelect;
