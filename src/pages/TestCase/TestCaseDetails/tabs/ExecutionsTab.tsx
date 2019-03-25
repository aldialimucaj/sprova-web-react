import { getExecutionsOfTestCase } from '@/api/execution.api';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution } from '@/models/Execution';
import { List, Spin } from 'antd';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';

interface Params {
  pid: string;
  tid: string;
}

const ExecutionsTab: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { data: executions, isLoading } = useFetcher(
    getExecutionsOfTestCase,
    match.params.tid
  );

  return isLoading ? (
    <Spin />
  ) : (
    <Fragment>
      <List
        className="children-list"
        size="small"
        header={<div>Executions ({executions!.length})</div>}
        bordered={true}
        dataSource={executions}
        renderItem={(exec: Execution) => (
          <List.Item>
            <Level
              style={{ marginBottom: 0, width: '100%' }}
              left={<div>{exec._id}</div>}
              right={<div>{new Date(exec.createdAt).toUTCString()}</div>}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default withRouter(ExecutionsTab);
