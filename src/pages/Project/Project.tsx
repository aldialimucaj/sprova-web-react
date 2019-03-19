import { getProject } from '@/api/project.api';
import { getTestCases } from '@/api/testcase.api';
import {
  ProjectContext,
  setProject,
  setTestCases,
} from '@/contexts/ProjectContext';
import { useFetcher } from '@/hooks/useFetcher';
import { Project } from '@/models/Project';
import { TestCase } from '@/models/TestCase';
import { Cycles, TestCase as TestCasePage } from '@/pages';
import { Spin } from 'antd';
import React, { Fragment, useContext, useEffect } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import CreateProject from './CreateProject';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

interface Params {
  pid: string;
}

const ProjectPage: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [_, dispatch] = useContext(ProjectContext);
  const { data: project, isLoading: isProjectLoading } = useFetcher<Project>(
    getProject,
    match.params.pid
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
      {isProjectLoading || isTestCasesLoading ? (
        <Spin />
      ) : (
        <Fragment>
          <Switch>
            <Route path="/projects/new" component={CreateProject} />
            <Route
              path="/projects/:pid"
              exact={true}
              component={ProjectDetails}
            />
          </Switch>
          <Route path="/projects/:pid/settings" component={ProjectSettings} />
          <Route path="/projects/:pid/testcases" component={TestCasePage} />
          <Route path="/projects/:pid/cycles" component={Cycles} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(ProjectPage);
