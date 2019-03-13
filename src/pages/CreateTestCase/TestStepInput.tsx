import { Button, Form, Input, List } from 'antd';
import React, { Fragment, useState } from 'react';
import { TestCase } from '../../models/TestCase';
import { TestStep } from '../../models/TestStep';

interface Props {
  parent: string;
  testSteps: TestStep[];
  setTestSteps: (testSteps: TestStep[]) => void;
}

const TestStepInput: React.FunctionComponent<Props> = ({
  parent,
  testSteps,
  setTestSteps,
}) => {
  const [action, setAction] = useState('');
  const [expected, setExpected] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'action': {
        setAction(value);
        break;
      }
      case 'expected': {
        setExpected(value);
        break;
      }
    }
  };

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
    // TODO:
  };

  return (
    <List
      header={parent ? <div>Show inherited steps</div> : null}
      itemLayout="horizontal"
      footer={
        <Fragment>
          <Input
            onChange={handleChange}
            placeholder="Step action"
            name="action"
          />
          <Input
            onChange={handleChange}
            placeholder="Expected"
            name="expected"
          />
          <Button type="primary" onClick={addTestStep}>
            Add
          </Button>
        </Fragment>
      }
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
  );
};

export default TestStepInput;
