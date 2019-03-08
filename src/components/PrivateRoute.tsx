import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

interface Props {
  component: any;
  path: string;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
  component: Component,
  ...rest
}) => {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userContext.isAuthenticated ? (
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
