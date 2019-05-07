import { PageLoad, Layout } from '@/components/Layout';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCaseContext } from '@/contexts/TestCaseContext';
import { Cycles, Executions, TestCases } from '@/pages';
import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProjectCreate from './ProjectCreate';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

const ProjectPage: React.FunctionComponent = () => {
  const { currentProject, isProjectsLoading } = useContext(ProjectContext);
  const { currentCycle, isCyclesLoading } = useContext(CycleContext);
  const { isTestCasesFetched } = useContext(TestCaseContext);

  return (
    <Layout>
      {isProjectsLoading ||
      isCyclesLoading ||
      (currentCycle && !isTestCasesFetched) ? (
        <PageLoad />
      ) : currentProject && currentCycle ? (
        <Switch>
          <Route
            path="/projects/:pid"
            exact={true}
            component={ProjectDetails}
          />
          <Route path="/projects/:pid/cycles" component={Cycles} />
          <Route path="/projects/:pid/executions" component={Executions} />
          <Route path="/projects/:pid/settings" component={ProjectSettings} />
          <Route path="/projects/:pid/testcases" component={TestCases} />
        </Switch>
      ) : null}
    </Layout>
  );
};

export default ProjectPage;
