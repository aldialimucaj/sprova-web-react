import Level from '@/components/Level';
import { Divider, Steps } from 'antd';
import React, { Fragment } from 'react';
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import './index.scss';
import { ExecutionResult, ExecutionRun, ExecutionSetup } from './stages';

const Step = Steps.Step;

interface Params {
  pid: string;
  stage: 'setup' | 'run' | 'result';
}

const ExecutionStages: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const activeStageIndex = (): number => {
    const { stage } = match.params;
    switch (stage) {
      case 'setup': {
        return 0;
      }
      case 'run': {
        return 1;
      }
      case 'result': {
        return 2;
      }
    }
  };

  return (
    <Fragment>
      <Steps current={activeStageIndex()} style={{ marginBottom: 24 }}>
        <Step title="Setup" />
        <Step title="Run" />
        <Step title="Result" />
      </Steps>
      <Switch>
        <Route
          path={`/projects/:pid/executions/setup`}
          component={ExecutionSetup}
        />
        <Route
          path={`/projects/:pid/executions/run`}
          component={ExecutionRun}
        />
        <Route
          path={`/projects/:pid/executions/result`}
          component={ExecutionResult}
        />
      </Switch>
    </Fragment>
  );
};

export default withRouter(ExecutionStages);
