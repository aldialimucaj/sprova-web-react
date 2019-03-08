import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Layout from './layouts';
import Home from './pages/Home/Home';

const App = () => {
  return <Layout>{<Route path="" exact={true} component={Home} />}</Layout>;
};

export default App;
