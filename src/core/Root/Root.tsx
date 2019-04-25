import PrivateRoute from '@/components/PrivateRoute';
import { UserProvider } from '@/contexts/UserContext';
import App from '@/core/App';
import { Login, Signup } from '@/pages';
import PageNotFound from '@/pages/PageNotFound';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './Root.scss';

const Root = () => {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/projects" component={App} />
          <Redirect path="/" exact={true} to="/projects" />
          <Route path="" component={PageNotFound} />
        </Switch>
      </UserProvider>
    </Router>
  );
};

export default Root;
