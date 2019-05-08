import { Label } from '@/components/Label';
import React from 'react';
import './TextArea.scss';

interface TextAreaProps {
  disabled?: boolean;
  empty?: string;
  extra?: React.ReactNode;
  label?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  style?: any;
  value: string;
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  disabled = false,
  empty,
  extra,
  label,
  placeholder,
  required = false,
  onChange,
  style,
  value,
}) => {
  return (
    <Label extra={extra} required={required} text={label}>
      {!disabled ? (
        <textarea
          className="sprova-textarea"
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...style }}
          value={value}
        />
      ) : value ? (
        <p style={{ ...style }}>{value}</p>
      ) : (
        <span style={{ opacity: 0.4 }}>{empty || 'No value'}</span>
      )}
    </Label>
  );
};

export default TextArea;
