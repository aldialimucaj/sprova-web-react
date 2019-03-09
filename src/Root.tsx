import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './pages';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="" component={App} />
      </Switch>
    </Router>
  );
};

export default Root;
