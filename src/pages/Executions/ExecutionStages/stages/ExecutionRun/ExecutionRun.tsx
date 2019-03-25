import { getExecutionContext } from '@/api/execution-context.api';
import { getExecutionsOfContext } from '@/api/execution.api';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution } from '@/models/Execution';
import { Spin } from 'antd';
import queryString from 'querystring';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

interface Params {
  pid: string;
}

const ExecutionRun: React.FunctionComponent<RouteComponentProps<Params>> = ({
  location,
  match,
}) => {
  const { contextId } = queryString.parse(location.search.substring(1));

  const { data: context, isLoading: isContextLoading } = useFetcher(
    getExecutionContext,
    contextId
  );

  const { data: executions, isLoading: isTestCasesLoading } = useFetcher<
    Execution[]
  >(getExecutionsOfContext, contextId);

  return isContextLoading || isTestCasesLoading ? (
    <Spin />
  ) : (
    <Fragment>
      {context!.method}
      {executions!.map((execution, index) => (
        <p key={index}>{execution._id}</p>
      ))}
    </Fragment>
  );
};

export default withRouter(ExecutionRun);
