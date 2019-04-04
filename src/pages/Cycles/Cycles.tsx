import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CycleList from './CycleList';

const TestCase: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        path={'/projects/:pid/cycles'}
        exact={true}
        component={CycleList}
      />
      {/* <Route path={'/projects/:pid/cycles/new'} component={CycleCreate} /> */}
      {/* <Route
        path={'/projects/:pid/cycles/:cid'}
        component={CycleDetails}
      /> */}
    </Switch>
  );
};

export default TestCase;
