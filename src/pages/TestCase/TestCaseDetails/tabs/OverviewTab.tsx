import { TestCase } from '@/models/TestCase';
import { findChildren } from '@/utils';
import { List } from 'antd';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';

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
    <Fragment>
      <span style={{ display: 'block', marginBottom: 16 }}>
        {testCase.description}
      </span>
      <List
        className="children-list"
        size="small"
        header={<div>Children ({children.length})</div>}
        bordered={true}
        dataSource={children}
        renderItem={(tc: TestCase) => (
          <List.Item
            onClick={() =>
              history.push(`/projects/${match.params.pid}/testcases/${tc._id}`)
            }
          >
            {tc.title}
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default withRouter(OverviewTab);
