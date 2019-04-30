import { getExecutionsOfTestCase } from '@/api/execution.api';
import CardList from '@/components/CardList';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution, ExecutionStatus } from '@/models/Execution';
import { Icon, Spin } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import CardTable from '@/components/CardTable';

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

  return isLoading || !executions ? (
    <Spin />
  ) : (
    <CardTable
      columnTitles={['Status', 'ID', 'Date']}
      data={executions}
      renderRow={(execution: Execution) => {
        const icon = getStatusIcon(execution.status);
        return [
          <td key={0}>
            {icon && <span style={{ marginRight: 16 }}>{icon}</span>}
          </td>,
          <td key={1}>{execution._id}</td>,
          <td key={2}>{new Date(execution.createdAt).toUTCString()}</td>,
        ];
      }}
      onRowClick={(execution: Execution) =>
        history.push(
          `/projects/${match.params.pid}/executions/${execution.contextId}`
        )
      }
    />
  );
};

export default withRouter(ExecutionsTab);
