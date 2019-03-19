import Level from '@/components/Level';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Execution } from '@/models/Execution';
import { Button, Divider, Icon, List } from 'antd';
import React, { Fragment, useContext } from 'react';
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import './index.scss';

interface Params {
  pid: string;
}

const ExecutionOverview: React.FunctionComponent<
  RouteComponentProps<Params>
> = ({ match }) => {
  const [{ project }] = useContext(ProjectContext);

  const mockActiveExecutions: Execution[] = [];

  const mockExecutions: Execution[] = [];

  return (
    <Fragment>
      <Level
        left={
          <span style={{ fontSize: 18 }}>
            <Link to={`/projects/${match.params.pid}`}>{project.title}</Link> /{' '}
            <strong>Executions</strong>
          </span>
        }
        right={
          <Link to={`/projects/${match.params.pid}/executions/setup`}>
            <Button type="primary">
              <Icon type="caret-right" /> Start new
            </Button>
          </Link>
        }
      />
      <Divider />
      <List
        className="children-list"
        size="small"
        header={<div>Active Executions</div>}
        bordered={true}
        dataSource={mockActiveExecutions}
        renderItem={(exec: Execution) => <List.Item>{exec._id}</List.Item>}
      />
    </Fragment>
  );
};

export default withRouter(ExecutionOverview);
