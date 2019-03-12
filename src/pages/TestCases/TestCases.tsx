import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';

interface Params {
  id: string;
}

const TestCases: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  return (
    <SectionHeader
      title="Test Cases"
      extra={
        <Link to={`/projects/${match.params.id}/testcases/new`}>
          New Test Case
        </Link>
      }
    />
  );
};

export default TestCases;
