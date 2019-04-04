import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { parseQuery } from '@/utils';
import { Breadcrumb, Button, Icon } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './ExecutionDetails.scss';

interface Params {
  pid: string;
}

const ExecutionResult: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  location,
}) => {
  const { contextId } = parseQuery(location);

  const [{ project }] = useContext(ProjectContext);

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects/${match.params.pid}`}>
              <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
            </Link>
            <Link to={`/projects/${match.params.pid}/executions`}>
              <Breadcrumb.Item>Executions</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Result</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="Finished Execution"
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
