import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import authApi from './api/auth.api';
import App from './App';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import UserContext, { UserContextValue } from './contexts/UserContext';
import { Login } from './pages';

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authApi.isAuthenticated()
  );
  // TODO: Replace by more complex User model
  const [username, setUsername] = useState(authApi.getUsername());

  const userContext: UserContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    setUsername,
    username,
  };

  return (
    <Router>
      <UserContext.Provider value={userContext}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="" component={App} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default Root;
