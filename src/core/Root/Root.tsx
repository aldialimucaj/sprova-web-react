import PrivateRoute from '@/components/PrivateRoute';
import App from '@/core/App';
import { Login, Signup } from '@/pages';
import PageNotFound from '@/pages/PageNotFound';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Root.scss';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/projects" component={App} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Root;
