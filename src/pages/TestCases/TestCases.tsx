import { List, Spin } from 'antd';
import React, { Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useGetTestCases } from '../../api/testcase.api';
import SectionHeader from '../../components/SectionHeader';
import { TestCase } from '../../models/TestCase';

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
      <List
        itemLayout="horizontal"
        dataSource={testCases}
        renderItem={(testCase: TestCase) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{testCase.title}</a>}
              description={testCase.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default TestCases;
