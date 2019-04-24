import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import PageContent from '@/layout/PageContent';
import { Breadcrumb, Button, Icon } from 'antd';
import React, { Fragment, useContext } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

interface Params {
  pid: string;
}

const CycleList: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const { currentProject } = useContext(ProjectContext);

  if (!currentProject) {
    return <Redirect to="/projects" />;
  }

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Link to={`/projects/${match.params.pid}`}>
                <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Cycles</Breadcrumb.Item>
            </Breadcrumb>
          }
          title="All Cycles"
          extra={
            <Link to={`/projects/${match.params.pid}/cycles/new`}>
              <Button type="primary">
                <Icon type="plus" /> New
              </Button>
            </Link>
          }
        />
      }
    >
      Content
    </PageContent>
  );
};

export default withRouter(CycleList);
