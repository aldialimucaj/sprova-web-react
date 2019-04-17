import { getExecutionsOfTestCase } from '@/api/execution.api';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution, ExecutionStatus } from '@/models/Execution';
import { List, Spin } from 'antd';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';

interface Params {
  pid: string;
  tid: string;
}

const ExecutionsTab: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const { data: executions, isLoading } = useFetcher(
    getExecutionsOfTestCase,
    match.params.tid
  );

  const getStatusColor = (status: ExecutionStatus): string => {
    switch (status) {
      case ExecutionStatus.Successful: {
        return '#f6ffed';
      }
      case ExecutionStatus.Warning: {
        return '#fffbe6';
      }
      case ExecutionStatus.Failed: {
        return '#fff1f0';
      }
      default: {
        return 'white';
      }
    }
  };

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
          <List.Item
            style={{
              backgroundColor: `${getStatusColor(exec.status)}`,
            }}
            onClick={() =>
              history.push(
                `/projects/${match.params.pid}/executions/${exec.contextId}`
              )
            }
          >
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
