import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import Layout from './layout';
import { Project, ProjectList } from './pages';

const App = () => {
  return (
    <ProjectProvider>
      <Layout>
        <Switch>
          <Route path="/projects" exact={true} component={ProjectList} />
          <Route path="/projects/:pid" component={Project} />
        </Switch>
      </Layout>
    </ProjectProvider>
  );
};

export default App;
