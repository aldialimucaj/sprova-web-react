import Level from '@/components/Level';
import { Execution } from '@/models/Execution';
import { ExecutionStep } from '@/models/ExecutionStep';
import { List, Tag } from 'antd';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

interface Params {
  pid: string;
}

interface Props extends RouteComponentProps<Params> {
  execution: Execution;
}

const Executor: React.FunctionComponent<Props> = ({ execution }) => {
  return (
    <Fragment>
      <Level
        left={<span style={{ fontSize: 18 }}>{execution.testCaseTitle}</span>}
      />
      <List
        size="default"
        bordered={true}
        dataSource={execution.steps}
        renderItem={(executionStep: ExecutionStep) => (
          <List.Item>
            <List.Item.Meta
              title={executionStep.action}
              description={`Expected: ${executionStep.expected}`}
            />
            <Tag color="blue" style={{ pointerEvents: 'none' }}>
              {executionStep.result}
            </Tag>
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default withRouter(Executor);
