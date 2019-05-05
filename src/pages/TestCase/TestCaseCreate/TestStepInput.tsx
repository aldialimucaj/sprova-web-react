import { useFormInput } from '@/hooks/useFormInput';
import { TestStep } from '@/models/TestStep';
import { Button, Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';
import './TestCaseCreate.scss';
import Input from '@/components/Input';

interface Props {
  testSteps: TestStep[];
  setTestSteps: (testSteps: TestStep[]) => void;
}

const TestStepInput: React.FunctionComponent<Props> = ({
  testSteps,
  setTestSteps,
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

  const addTestStep = () => {
    const testStepNew = {
      action,
      expected,
    };
    const testStepsNew = [...testSteps, testStepNew];
    setTestSteps(testStepsNew);
    setAction('');
    setExpected('');
  };

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Input
          value={action}
          onChange={handleActionChange}
          placeholder="Step action"
        />
      </Col>
      <Col span={10}>
        <Input
          value={expected}
          onChange={handleExpectedChange}
          placeholder="Expected"
        />
      </Col>
      <Col span={4}>
        <Button block={true} type="primary" onClick={addTestStep}>
          Add
        </Button>
      </Col>
    </Row>
  );
};

export default TestStepInput;
