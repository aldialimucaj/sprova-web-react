import Layout from '@/components/Layout/Layout';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Project, ProjectCreate } from '@/pages';
import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';

const App = () => {
  const { currentProject, error, isProjectsLoading } = useContext(
    ProjectContext
  );
  return isProjectsLoading ? (
    <div>Loader</div>
  ) : error ? (
    <div>Error</div>
  ) : !currentProject ? (
    <div>Create New Project</div>
  ) : (
    <Layout>
      <Switch>
        <Route path="/projects/new" component={ProjectCreate} />
        <Route path="/projects/:pid" component={Project} />
        <Redirect
          path="/"
          exact={true}
          to={`/projects/${currentProject!._id}`}
        />
      </Switch>
    </Layout>
  );
};

export default App;
