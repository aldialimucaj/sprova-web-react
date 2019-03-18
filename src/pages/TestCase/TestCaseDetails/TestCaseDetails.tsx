import { deleteTestCase } from '@/api/testcase.api';
import Level from '@/components/Level';
import { ProjectContext, removeTestCase } from '@/contexts/ProjectContext';
import { TestCase } from '@/models/TestCase';
import { findById } from '@/utils';
import { Button, Empty, Icon, notification, Popconfirm, Tabs } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import GeneralTab from './tabs/OverviewTab';

const TabPane = Tabs.TabPane;

interface Params {
  tid: string;
}

const TestCaseDetails: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [
    {
      project: { _id: pid },
      testCases,
    },
    dispatch,
  ] = useContext(ProjectContext);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const testCase = findById(testCases, match.params.tid);

  const deleteRequest = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteTestCase(match.params.tid);
      setIsDeleteLoading(false);
      dispatch(removeTestCase(match.params.tid));
      notification.success({
        message: `${testCase!.title} deleted`,
      });
      history.push(`/projects/${pid}/testcases`);
    } catch (error) {
      setIsDeleteLoading(false);
      notification.error({
        message: 'Failed to delete test case',
        description: error,
      });
    }
  };

  return testCase ? (
    <Fragment>
      <Level
        left={
          <span style={{ fontSize: 18 }}>
            <Link to={`/projects/${pid}/testcases`}>Test Cases</Link> /{' '}
            <strong>{testCase.title}</strong>
          </span>
        }
        right={
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
        }
      />
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Overview" key="1">
          <GeneralTab testCase={testCase} testCases={testCases} />
        </TabPane>
        <TabPane tab="Test Steps" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Executions" key="3">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Settings" key="4">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </Fragment>
  ) : (
    <Empty />
  );
};

export default withRouter(TestCaseDetails);
