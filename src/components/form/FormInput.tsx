import { Form, Input } from 'antd';
import React, { useState } from 'react';

export const MIN_LENGTH = 'MIN_LENGTH';

interface MinLengthRule {
  type: typeof MIN_LENGTH;
  message: string;
  length: number;
}

type InputRule = MinLengthRule;

interface Props {
  colon?: boolean;
  initialValue?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rules?: InputRule[];
  type?: string;
}

const FormInput: React.FunctionComponent<Props> = ({
  colon = false,
  initialValue = '',
  label,
  placeholder = '',
  required = false,
  rules = [],
  type = 'text',
}) => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
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
