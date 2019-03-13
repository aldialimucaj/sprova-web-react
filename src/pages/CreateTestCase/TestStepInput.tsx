import { Button, Form, Input, List } from 'antd';
import React, { useState } from 'react';
import { TestCase } from '../../models/TestCase';
import { TestStep } from '../../models/TestStep';

interface Props {
  parent: TestCase | null;
}

const TestStepInput: React.FunctionComponent<Props> = () => {
  const mockTestSteps = [
    {
      action: 'Click login',
      expected: '',
    },
    {
      action: 'Enter password',
      expected: '',
    },
  ];

  const [testSteps, setTestSteps] = useState<TestStep[]>(mockTestSteps);
  return (
    <List
      header={<div>Show inherited steps</div>}
      itemLayout="horizontal"
      footer={
        <Form layout="inline">
          <Form.Item>
            <Input placeholder="Step action" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Expected" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Add</Button>
          </Form.Item>
        </Form>
      }
      dataSource={testSteps}
      renderItem={(testStep: TestStep) => (
        <List.Item actions={[<a key="remove">remove</a>]}>
          <List.Item.Meta
            title={<a href="https://ant.design">{testStep.action}</a>}
          />
        </List.Item>
      )}
    />
  );
};

export default TestStepInput;
