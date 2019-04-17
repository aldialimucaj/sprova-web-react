import { TestCase } from '@/models/TestCase';
import { findChildren } from '@/utils';
import { List, Row, Col, Card, Button, Icon } from 'antd';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';
import Level from '@/components/Level';
import Editor from '@/components/Editor';
import CardList from '@/components/CardList';

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
        <Level left={<h3>Description</h3>} right={<a>Edit</a>} />
        <CardList
          zebra={true}
          small={true}
          title={<div>Children ({children.length})</div>}
          data={children}
          renderItem={(tc: TestCase) => <div>{tc.title}</div>}
          onItemClick={(tc: TestCase) =>
            history.push(`/projects/${match.params.pid}/testcases/${tc._id}`)
          }
        />
      </Col>
    </Row>
  );
};

export default withRouter(OverviewTab);
