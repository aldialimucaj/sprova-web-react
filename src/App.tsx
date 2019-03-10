import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Layout from './layout';
import { CreateProject, Home, Project } from './pages';

const App = () => {
  return (
    <Layout>
      <Route path="/projects" exact={true} component={Home} />
      <Switch>
        <Route path="/projects/new" component={CreateProject} />
        <Route path="/projects/:id" component={Project} />
      </Switch>
    </Layout>
  );
};

export default App;
