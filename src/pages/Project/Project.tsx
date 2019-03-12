import { Breadcrumb, Spin } from 'antd';
import React, { Fragment } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { useGetProject } from '../../api/project.api';
import ProjectContext from '../../contexts/ProjectContext';
import CreateTestCase from '../CreateTestCase';
import TestCases from '../TestCases';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

interface Params {
  id: string;
}

const ProjectPage: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { isLoading, project, setProject } = useGetProject(match.params.id);

  return (
    <Fragment>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      {isLoading ? (
        <Spin />
      ) : (
        <ProjectContext.Provider value={{ project, setProject }}>
          <Route path="/projects/:id" exact={true} component={ProjectDetails} />
          <Route
            path="/projects/:id/settings"
            exact={true}
            component={ProjectSettings}
          />
          <Switch>
            <Route
              path="/projects/:id/testcases/new"
              exact={true}
              component={CreateTestCase}
            />
            <Route path="/projects/:id/testcases" component={TestCases} />
          </Switch>
        </ProjectContext.Provider>
      )}
    </Fragment>
  );
};

export default withRouter(ProjectPage);
