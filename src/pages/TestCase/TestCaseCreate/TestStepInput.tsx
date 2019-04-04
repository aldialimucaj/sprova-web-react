import { useFormInput } from '@/hooks/useFormInput';
import { TestStep } from '@/models/TestStep';
import { Button, Col, Input, List, Row } from 'antd';
import _ from 'lodash';
import React, { Fragment } from 'react';
import './TestCaseCreate.scss';

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

  const removeTestStep = (testStep: TestStep) => {
    setTestSteps(_.without(testSteps, testStep));
  };

  const footerInput = (
    <Row gutter={16}>
      <Col span={10}>
        <Input
          value={action}
          onChange={handleActionChange}
          placeholder="Step action"
          name="action"
        />
      </Col>
      <Col span={10}>
        <Input
          value={expected}
          onChange={handleExpectedChange}
          placeholder="Expected"
          name="expected"
        />
      </Col>
      <Col span={4}>
        <Button block={true} type="primary" onClick={addTestStep}>
          Add
        </Button>
      </Col>
    </Row>
  );

  return (
    <Fragment>
      <List
        className="steps-list"
        bordered={true}
        itemLayout="horizontal"
        dataSource={testSteps}
        renderItem={(testStep: TestStep) => (
          <List.Item
            actions={[
              <a key="remove" onClick={() => removeTestStep(testStep)}>
                remove
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{testStep.action}</a>}
            />
          </List.Item>
        )}
      />
      {footerInput}
    </Fragment>
  );
};

export default TestStepInput;
