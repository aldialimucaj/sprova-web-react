import { List } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import { ProjectContext } from '../../contexts/ProjectContext';
import { TestCase } from '../../models/TestCase';

interface Params {
  id: string;
}

const TestCases: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [{ testCases }] = useContext(ProjectContext);
  return (
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

export default withRouter(TestCases);
