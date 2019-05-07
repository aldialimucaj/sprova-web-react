import { Layout, PageLoad } from '@/components/Layout';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCaseContext } from '@/contexts/TestCaseContext';
import { Executions, TestCases } from '@/pages';
import CycleCreate from '@/pages/Cycles/CycleCreate';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
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
          <Route path="/projects/:pid/cycles/new" component={CycleCreate} />
          <Route path="/projects/:pid/executions" component={Executions} />
          <Route path="/projects/:pid/settings" component={ProjectSettings} />
          <Route path="/projects/:pid/testcases" component={TestCases} />
        </Switch>
      ) : null}
    </Layout>
  );
};

export default ProjectPage;
