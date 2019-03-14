import { Breadcrumb, Spin } from 'antd';
import React, { Fragment, useContext, useEffect } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { getProject } from '../../api/project.api';
import { getTestCases } from '../../api/testcase.api';
import {
  ProjectContext,
  setProject,
  setTestCases,
} from '../../contexts/ProjectContext';
import { useFetcher } from '../../hooks/useFetcher';
import { Project } from '../../models/Project';
import { TestCase } from '../../models/TestCase';
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
  const [_, dispatch] = useContext(ProjectContext);
  const { data: project, isLoading: isProjectLoading } = useFetcher<Project>(
    getProject,
    match.params.id
  );
  const { data: testCases, isLoading: isTestCasesLoading } = useFetcher<
    TestCase[]
  >(getTestCases);

  useEffect(() => {
    if (project) {
      dispatch(setProject(project));
    }
  }, [project]);

  useEffect(() => {
    if (testCases) {
      dispatch(setTestCases(testCases));
    }
  }, [testCases]);

  return (
    <Fragment>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      {isProjectLoading || isTestCasesLoading ? (
        <Spin />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(ProjectPage);
