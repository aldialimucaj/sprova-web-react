import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import './index.scss';

interface Params {
  pid: string;
}

const Executions: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  return <div>Execution works</div>;
};

export default withRouter(Executions);
