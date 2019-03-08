import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import ProjectLayout from './layouts/ProjectLayout';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <ProjectLayout>
      {<Route path="" exact={true} component={Home} />}
    </ProjectLayout>
  );
};

export default App;
