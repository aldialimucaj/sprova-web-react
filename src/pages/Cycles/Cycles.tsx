import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CycleCreate from './CycleCreate';

const TestCase: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path={'/projects/:pid/cycles/new'} component={CycleCreate} />
    </Switch>
  );
};

export default TestCase;
