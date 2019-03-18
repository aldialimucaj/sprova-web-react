import { isAuthenticated } from '@/api/auth.api';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  component: any;
  path: string;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
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
