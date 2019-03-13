import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import Layout from './layout';
import { CreateProject, Home, Project } from './pages';

const App = () => {
  return (
    <ProjectProvider>
      <Layout>
        <Route path="/projects" exact={true} component={Home} />
        <Switch>
          <Route path="/projects/new" component={CreateProject} />
          <Route path="/projects/:id" component={Project} />
        </Switch>
      </Layout>
    </ProjectProvider>
  );
};

export default App;
