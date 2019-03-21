import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React from 'react';

interface Props {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: CheckboxChangeEvent) => void;
}

const FormCheckbox: React.FunctionComponent<Props> = ({
  children,
  checked = false,
  disabled = false,
  onChange,
}) => {
  return (
    <Form.Item>
      <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
        {children}
      </Checkbox>
    </Form.Item>
  );
};

export default FormCheckbox;
