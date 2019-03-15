import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import CreateTestCase from '../CreateTestCase';
import './TestCase.scss';
import TestCaseDetails from './TestCaseDetails';
import TestCaseList from './TestCaseList';

interface Params {
  pid: string;
}

const TestCase: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  return (
    <Switch>
      <Route
        path={`/projects/${match.params.pid}/testcases`}
        exact={true}
        component={TestCaseList}
      />
      <Route
        path={`/projects/${match.params.pid}/testcases/new`}
        component={CreateTestCase}
      />
      <Route
        path={`/projects/${match.params.pid}/testcases/:tid`}
        component={TestCaseDetails}
      />
    </Switch>
  );
};

export default withRouter(TestCase);
