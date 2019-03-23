import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import Layout from './layout';
import { Project, ProjectCreate, ProjectList } from './pages';

const App = () => {
  return (
    <ProjectProvider>
      <Layout>
        <Switch>
          <Route path="/projects" exact={true} component={ProjectList} />
          <Route path="/projects/new" component={ProjectCreate} />
          <Route path="/projects/:pid" component={Project} />
          <Redirect path="/" exact={true} to="/projects" />
        </Switch>
      </Layout>
    </ProjectProvider>
  );
};

export default App;
