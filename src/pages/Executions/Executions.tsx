import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExecutionDetails from './ExecutionDetails';
import ExecutionOverview from './ExecutionOverview';
import ExecutionRun from './ExecutionRun';
import ExecutionSetup from './ExecutionSetup';
import './index.scss';

const Executions: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        path="/projects/:pid/executions/setup"
        component={ExecutionSetup}
      />
      <Route path="/projects/:pid/executions/run" component={ExecutionRun} />
      <Route
        path="/projects/:pid/executions/:ecid"
        component={ExecutionDetails}
      />
      <Route
        path="/projects/:pid/executions"
        exact={true}
        component={ExecutionOverview}
      />
    </Switch>
  );
};

export default Executions;
