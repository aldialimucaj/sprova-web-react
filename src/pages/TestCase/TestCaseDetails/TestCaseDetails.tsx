import { deleteTestCase } from '@/api/testcase.api';
import PageHeader from '@/components/PageHeader';
import { ProjectContext, removeTestCase } from '@/contexts/ProjectContext';
import { findById } from '@/utils';
import { Button, Icon, notification, Popconfirm, Tabs } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import CodeGenerationTab from './tabs/CodeGenerationTab';
import ExecutionsTab from './tabs/ExecutionsTab';
import OverviewTab from './tabs/OverviewTab';

const TabPane = Tabs.TabPane;

interface Params {
  pid: string;
  tid: string;
}

const TestCaseDetails: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [{ project, testCases }, dispatch] = useContext(ProjectContext);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const testCase = findById(testCases, match.params.tid);

  if (!testCase) {
    notification.error({
      placement: 'bottomRight',
      message: 'Oops',
      description: `No Test Case found with ID ${match.params.tid}`,
    });
    return <Redirect to={`/projects/${match.params.pid}/testcases`} />;
  }

  const deleteRequest = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteTestCase(match.params.tid);
      setIsDeleteLoading(false);
      dispatch(removeTestCase(match.params.tid));
      notification.success({
        placement: 'bottomRight',
        message: `${testCase.title} deleted`,
      });
      history.push(`/projects/${match.params.pid}/testcases`);
    } catch (error) {
      setIsDeleteLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to delete test case',
        description: error,
      });
    }
  };

  const header = (
    <span>
      <Link to={`/projects/${match.params.pid}`}>{project!.title}</Link> /{' '}
      <Link to={`/projects/${match.params.pid}/testcases`}>Test Cases</Link> /{' '}
      <strong>{testCase.title}</strong>
    </span>
  );

  const executeButton = (
    <Link
      to={{
        pathname: `/projects/${match.params.pid}/executions/setup`,
        search: `?type=testcases&tid=${match.params.tid}`,
      }}
      style={{ marginRight: 16 }}
    >
      <Button type="primary">Execute</Button>
    </Link>
  );

  const deleteButton = (
    <Popconfirm
      placement="bottomRight"
      title="Delete this test case?"
      onConfirm={deleteRequest}
      icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
      okText="Yes"
      cancelText="Cancel"
    >
      <Button type="danger" loading={isDeleteLoading}>
        Delete
      </Button>
    </Popconfirm>
  );

  return (
    <Fragment>
      <PageHeader
        title={header}
        extra={
          <div>
            {executeButton}
            {deleteButton}
          </div>
        }
      />
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Overview" key="1">
          <OverviewTab testCase={testCase} testCases={testCases} />
        </TabPane>
        <TabPane tab="Test Steps" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Executions" key="3">
          <ExecutionsTab />
        </TabPane>
        <TabPane tab="Code Generation" key="4">
          <CodeGenerationTab testCase={testCase} />
        </TabPane>
        <TabPane tab="Settings" key="5">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

export default withRouter(TestCaseDetails);
