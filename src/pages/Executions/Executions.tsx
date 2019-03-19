import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import ExecutionOverview from './ExecutionOverview';
import ExecutionStages from './ExecutionStages';
import './index.scss';

interface Params {
  pid: string;
}

const Executions: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  return (
    <Switch>
      <Route
        path="/projects/:pid/executions/:stage(setup|run|result)"
        component={ExecutionStages}
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
