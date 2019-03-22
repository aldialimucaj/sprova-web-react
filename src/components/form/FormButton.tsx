import { Button, Form } from 'antd';
import React from 'react';

interface Props {
  disabled?: boolean;
  htmlType?: 'submit' | 'button' | 'reset';
  loading?: boolean;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: 'default' | 'danger' | 'primary' | 'ghost' | 'dashed';
}

const FormButton: React.FunctionComponent<Props> = ({
  children,
  disabled = false,
  htmlType = 'submit',
  loading = false,
  onClick,
  type = 'default',
}) => {
  return (
    <Form.Item>
      <Button
        type={type}
        loading={loading}
        htmlType={htmlType}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

export default FormButton;
