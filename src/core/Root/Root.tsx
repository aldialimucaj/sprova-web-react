import PrivateRoute from '@/components/PrivateRoute';
import App from '@/core/App';
import { Login, Signup } from '@/pages';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Root.scss';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="" component={App} />
      </Switch>
    </Router>
  );
};

export default Root;
