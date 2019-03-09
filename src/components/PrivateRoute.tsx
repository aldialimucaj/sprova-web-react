import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authApi from '../api/auth.api';

interface Props {
  component: any;
  path: string;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = authApi.isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
