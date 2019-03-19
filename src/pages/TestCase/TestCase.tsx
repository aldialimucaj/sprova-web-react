import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import './index.scss';
import CreateTestCase from './TestCaseCreate';
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
        path={'/projects/:pid/testcases'}
        exact={true}
        component={TestCaseList}
      />
      <Route path={'/projects/:pid/testcases/new'} component={CreateTestCase} />
      <Route
        path={'/projects/:pid/testcases/:tid'}
        component={TestCaseDetails}
      />
    </Switch>
  );
};

export default withRouter(TestCase);
