import { getExecutionsOfTestCase } from '@/api/execution.api';
import CardList from '@/components/CardList';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution, ExecutionStatus } from '@/models/Execution';
import { Icon, Spin } from 'antd';
import React from 'react';
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

  const getStatusIcon = (status: ExecutionStatus): React.ReactNode => {
    switch (status) {
      case ExecutionStatus.Successful: {
        return (
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        );
      }
      case ExecutionStatus.Warning: {
        return <Icon type="warning" theme="twoTone" twoToneColor="goldenrod" />;
      }
      case ExecutionStatus.Failed: {
        return <Icon type="close-circle" theme="twoTone" twoToneColor="red" />;
      }
      case ExecutionStatus.Pending: {
        return <Icon type="loading" />;
      }
      default: {
        return null;
      }
    }
  };

  return isLoading ? (
    <Spin />
  ) : (
    <CardList
      zebra={true}
      small={true}
      title={<div>Executions ({executions!.length})</div>}
      data={executions!}
      renderItem={(exec: Execution) => {
        const icon = getStatusIcon(exec.status);
        return (
          <Level>
            <div>
              {icon && <span style={{ marginRight: 16 }}>{icon}</span>}

              {exec._id}
            </div>
            <div>{new Date(exec.createdAt).toUTCString()}</div>
          </Level>
        );
      }}
      onItemClick={(exec: Execution) =>
        history.push(
          `/projects/${match.params.pid}/executions/${exec.contextId}`
        )
      }
    />
  );
};

export default withRouter(ExecutionsTab);
