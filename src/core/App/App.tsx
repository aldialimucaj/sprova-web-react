import { ProjectProvider } from '@/contexts/ProjectContext';
import Layout from '@/components/Layout/Layout';
import { Project, ProjectCreate, ProjectList } from '@/pages';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';

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
