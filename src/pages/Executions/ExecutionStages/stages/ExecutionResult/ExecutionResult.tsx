import PageHeader from '@/components/PageHeader';
import { parseQuery } from '@/utils';
import { Button } from 'antd';
import React, { Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './index.scss';

interface Params {
  pid: string;
}

const ExecutionResult: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  location,
}) => {
  const { contextId } = parseQuery(location);

  return (
    <Fragment>
      <PageHeader
        title="Execution Run"
        subTitle="#51"
        url={`/projects/${match.params.pid}/executions`}
      />
      <Link
        to={`/projects/${match.params.pid}/executions`}
        style={{ marginRight: 16 }}
      >
        <Button>Back to Executions</Button>
      </Link>
      <Link to={`/projects/${match.params.pid}/reports/${contextId}`}>
        <Button type="primary">Show Report</Button>
      </Link>
    </Fragment>
  );
};

export default ExecutionResult;
