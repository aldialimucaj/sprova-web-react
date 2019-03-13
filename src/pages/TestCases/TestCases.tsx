import { Spin } from 'antd';
import React, { Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useGetTestCases } from '../../api/testcase.api';
import SectionHeader from '../../components/SectionHeader';

interface Params {
  id: string;
}

const TestCases: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { testCases, isLoading } = useGetTestCases();
  return isLoading ? (
    <Spin />
  ) : (
    <Fragment>
      <SectionHeader
        title="Test Cases"
        extra={
          <Link to={`/projects/${match.params.id}/testcases/new`}>
            New Test Case
          </Link>
        }
      />
      {testCases.map((testCase, index) => (
        <h1 key={index}>{testCase.title}</h1>
      ))}
    </Fragment>
  );
};

export default TestCases;
