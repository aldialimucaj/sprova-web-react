import Input from '@/components/Input';
import { useFormInput } from '@/hooks/useFormInput';
import { TestStep } from '@/models/TestStep';
import { Button, Col, Row } from 'antd';
import React from 'react';
import './TestCaseCreate.scss';

interface TestStepInputProps {
  onAdd: (testStep: TestStep) => void;
}

const TestStepInput: React.FunctionComponent<TestStepInputProps> = ({
  onAdd,
}) => {
  const {
    value: action,
    setValue: setAction,
    handleChange: handleActionChange,
  } = useFormInput('');
  const {
    value: expected,
    setValue: setExpected,
    handleChange: handleExpectedChange,
  } = useFormInput('');

  const handleAddTestStep = () => {
    const testStep = {
      action,
      expected,
    };
    onAdd(testStep);
    setAction('');
    setExpected('');
  };

  const isFormValid = () => action && action.length > 0;

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Input
          value={action}
          onChange={handleActionChange}
          onEnter={() => isFormValid() && handleAddTestStep()}
          placeholder="Step action"
        />
      </Col>
      <Col span={10}>
        <Input
          value={expected}
          onChange={handleExpectedChange}
          onEnter={() => isFormValid() && handleAddTestStep()}
          placeholder="Expected"
        />
      </Col>
      <Col span={4}>
        <Button
          block={true}
          type="primary"
          disabled={!isFormValid()}
          onClick={handleAddTestStep}
        >
          Add
        </Button>
      </Col>
    </Row>
  );
};

export default TestStepInput;
