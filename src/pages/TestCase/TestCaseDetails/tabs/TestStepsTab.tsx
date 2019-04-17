import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById, resolveInheritance } from '@/utils';
import { Button, Col, List, Row, Tag } from 'antd';
import React, { useState } from 'react';
import './OverviewTab.scss';

interface Props {
  testCase: TestCase;
  testCases: TestCase[];
}

const TestStepsTab: React.FunctionComponent<Props> = ({
  testCase,
  testCases,
}) => {
  const [showInherited, setShowInherited] = useState(false);

  const parent = findById(testCases, testCase.parentId);

  return (
    <Row gutter={24}>
      <Col span={16}>
        {parent ? (
          <Button
            block={true}
            onClick={() => setShowInherited(!showInherited)}
            type="dashed"
            style={{ marginBottom: 16 }}
          >
            {`${showInherited ? 'Hide' : 'Show'} inherited steps`}
          </Button>
        ) : null}
        {parent && showInherited ? (
          <List
            className="inherited-list"
            itemLayout="horizontal"
            bordered={true}
            dataSource={resolveInheritance(parent, testCases, true)}
            renderItem={([testStep, mappedParent]: [TestStep, TestCase]) => (
              <List.Item style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}>
                <List.Item.Meta
                  title={testStep.action}
                  description={`Expected: ${testStep.expected}`}
                />
                <Tag style={{ pointerEvents: 'none' }}>
                  {mappedParent.title}
                </Tag>
              </List.Item>
            )}
          />
        ) : null}
        <List
          className="steps-list"
          bordered={true}
          itemLayout="horizontal"
          dataSource={testCase.steps}
          renderItem={(testStep: TestStep) => (
            <List.Item>
              <List.Item.Meta title={testStep.action} />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default TestStepsTab;
