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
import { Cycles, Executions, TestCases } from '@/pages';
import { Spin } from 'antd';
import React, { Fragment, useContext, useEffect } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import ProjectCreate from './ProjectCreate';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';
import { setCycles } from '@/contexts/ProjectContext/ProjectActions';
import { getCycles } from '@/api/cycle.api';
import { Cycle } from '@/models/Cycle';

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
  >(getTestCases, match.params.pid);

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
            <Route path="/projects/new" component={ProjectCreate} />
            <Route
              path="/projects/:pid"
              exact={true}
              component={ProjectDetails}
            />
          </Switch>
          <Route path="/projects/:pid/cycles" component={Cycles} />
          <Route path="/projects/:pid/executions" component={Executions} />
          <Route path="/projects/:pid/settings" component={ProjectSettings} />
          <Route path="/projects/:pid/testcases" component={TestCases} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(ProjectPage);
