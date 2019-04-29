import { PageContent, PageHeader } from '@/components/Layout';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCaseContext } from '@/contexts/TestCaseContext';
import { TestCase } from '@/models/TestCase';
import { Breadcrumb, Button, Icon, Spin, Table } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Params {
  pid: string;
}

const TestCaseList: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const { currentProject } = useContext(ProjectContext);
  const { testCases, isTestCasesFetched } = useContext(TestCaseContext);

  const handleRowClick = (record: TestCase) => {
    history.push(`/projects/${currentProject!._id}/testcases/${record._id}`);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Statistics',
      dataIndex: 'statistics',
      key: 'statistics',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text: string, record: any) => (
        <Button size="small" type="primary" onClick={undefined}>
          Execute
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects/${match.params.pid}`}>
              <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Test Cases</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="All Test Cases"
        extra={
          <Link to={`/projects/${match.params.pid}/testcases/new`}>
            <Button type="primary">
              <Icon type="plus" /> New
            </Button>
          </Link>
        }
      />
      <PageContent>
        {!isTestCasesFetched ? (
          <Spin />
        ) : (
          <Table
            className="testcases-list"
            bordered={true}
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => handleRowClick(record),
              };
            }}
            rowKey={(record: TestCase) => record._id}
            dataSource={testCases}
          />
        )}
      </PageContent>
    </Fragment>
  );
};

export default withRouter(TestCaseList);
