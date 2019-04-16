import { TestCase } from '@/models/TestCase';
import { findChildren } from '@/utils';
import { List, Row, Col, Card, Button, Icon } from 'antd';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';
import Level from '@/components/Level';
import Editor from '@/components/Editor';

interface Params {
  pid: string;
  tid: string;
}

interface Props extends RouteComponentProps<Params> {
  testCase: TestCase;
  testCases: TestCase[];
}

const OverviewTab: React.FunctionComponent<Props> = ({
  history,
  match,
  testCase,
  testCases,
}) => {
  const children = findChildren(testCases, match.params.tid);

  return (
    <Row gutter={24}>
      <Col span={16}>
        <Level
          left={<span style={{ fontSize: 18 }}>Description</span>}
          right={
            <Button>
              <Icon type="edit" />
              Edit
            </Button>
          }
        />
        <Editor />
      </Col>
      <Col span={8}>
        <List
          className="children-list"
          size="small"
          header={<div>Children ({children.length})</div>}
          bordered={true}
          dataSource={children}
          renderItem={(tc: TestCase) => (
            <List.Item
              onClick={() =>
                history.push(
                  `/projects/${match.params.pid}/testcases/${tc._id}`
                )
              }
            >
              {tc.title}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default withRouter(OverviewTab);
