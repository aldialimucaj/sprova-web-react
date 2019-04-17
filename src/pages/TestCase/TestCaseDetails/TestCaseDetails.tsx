import { deleteTestCase } from '@/api/testcase.api';
import PageHeader from '@/components/PageHeader';
import { ProjectContext, removeTestCase } from '@/contexts/ProjectContext';
import PageContent from '@/layout/PageContent';
import { findById } from '@/utils';
import {
  Breadcrumb,
  Button,
  Col,
  Icon,
  notification,
  Popconfirm,
  Row,
  Tabs,
} from 'antd';
import React, { useContext, useState } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import CodeGenerationTab from './tabs/CodeGenerationTab';
import ExecutionsTab from './tabs/ExecutionsTab';
import OverviewTab from './tabs/OverviewTab';
import TestStepsTab from './tabs/TestStepsTab';

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
  const [activeTabKey, setActiveTabKey] = useState('overview');
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

  let content;

  switch (activeTabKey) {
    case 'overview': {
      content = <OverviewTab testCase={testCase} testCases={testCases} />;
      break;
    }
    case 'statistics': {
      content = 'Statistics';
      break;
    }
    case 'testSteps': {
      content = <TestStepsTab testCase={testCase} testCases={testCases} />;
      break;
    }
    case 'executions': {
      content = <ExecutionsTab />;
      break;
    }
    case 'codeGeneration': {
      content = <CodeGenerationTab testCase={testCase} />;
      break;
    }
  }

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Link to={`/projects/${match.params.pid}`}>
                <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
              </Link>
              <Link to={`/projects/${match.params.pid}/testcases`}>
                <Breadcrumb.Item>Test Cases</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Test Case</Breadcrumb.Item>
            </Breadcrumb>
          }
          title={testCase.title}
          extra={[executeButton, deleteButton]}
          tabs={
            <Tabs
              defaultActiveKey={`${activeTabKey}`}
              onChange={(activeKey: string) => setActiveTabKey(activeKey)}
            >
              <TabPane tab="Overview" key="overview" />
              <TabPane tab="Statistics" key="statistics" />
              <TabPane tab="Test Steps" key="testSteps" />
              <TabPane tab="Executions" key="executions" />
              <TabPane tab="Code Generation" key="codeGeneration" />
            </Tabs>
          }
        >
          <Row>
            <Col span={2}>
              <div>
                <strong>Created at:</strong>
              </div>
            </Col>
            <Col>
              <div>{new Date(testCase.createdAt).toDateString()}</div>
            </Col>
          </Row>
        </PageHeader>
      }
    >
      {content}
    </PageContent>
  );
};

export default withRouter(TestCaseDetails);
