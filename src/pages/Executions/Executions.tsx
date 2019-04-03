import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import ExecutionOverview from './ExecutionOverview';
import './index.scss';
import {
  ExecutionSetup,
  ExecutionRun,
  ExecutionResult,
} from './ExecutionStages/stages';

interface Params {
  pid: string;
}

const Executions: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  return (
    <Switch>
      <Route
        path="/projects/:pid/executions/setup"
        component={ExecutionSetup}
      />
      <Route path="/projects/:pid/executions/run" component={ExecutionRun} />
      <Route
        path="/projects/:pid/executions/:ecid"
        component={ExecutionResult}
      />
      <Route
        path="/projects/:pid/executions"
        exact={true}
        component={ExecutionOverview}
      />
    </Switch>
  );
};

export default withRouter(Executions);
