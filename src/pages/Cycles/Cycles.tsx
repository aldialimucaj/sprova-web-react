import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CycleDetails from './CycleDetails';

const TestCase: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={'/projects/:pid/cycles/:cid'} component={CycleDetails} />
    </Switch>
  );
};

export default TestCase;
