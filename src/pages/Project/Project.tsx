import { ProjectContext } from '@/contexts/ProjectContext';
import { Cycles, Executions, TestCases } from '@/pages';
import React, { Fragment, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProjectCreate from './ProjectCreate';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

const ProjectPage: React.FunctionComponent = () => {
  const { currentProject } = useContext(ProjectContext);

  return (
    <Switch>
      <Route path="/projects/new" component={ProjectCreate} />
      <Route path="/projects/:pid" exact={true} component={ProjectDetails} />
      <Route path="/projects/:pid/cycles" component={Cycles} />
      <Route path="/projects/:pid/executions" component={Executions} />
      <Route path="/projects/:pid/settings" component={ProjectSettings} />
      <Route path="/projects/:pid/testcases" component={TestCases} />
      {currentProject && (
        <Redirect path="/projects" to={`/projects/${currentProject._id}`} />
      )}
    </Switch>
  );
};

export default ProjectPage;
