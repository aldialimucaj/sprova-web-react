import Level from '@/components/Level';
import { Col, Icon, List, Row } from 'antd';
import React from 'react';

const TestCasesTab: React.FunctionComponent = () => {
  return (
    <Row gutter={24}>
      <Col span={8}>
        <List
          className="children-list"
          size="small"
          header={
            <Level
              style={{ marginBottom: 0 }}
              left={
                <span>
                  <Icon type="file-text" style={{ marginRight: 8 }} />
                  Executed Test Cases
                </span>
              }
            />
          }
          bordered={true}
          dataSource={[]}
          renderItem={(item: any) => <div />}
        />
      </Col>
      <Col span={16}>Display Test Case Execution Details here.</Col>
    </Row>
  );
};

export default TestCasesTab;
