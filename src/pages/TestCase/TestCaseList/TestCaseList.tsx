import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCase } from '@/models/TestCase';
import { Breadcrumb, Button, Icon, Table } from 'antd';
import React, { Fragment, useContext } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

interface Params {
  pid: string;
}

const TestCaseList: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [{ project, testCases }] = useContext(ProjectContext);

  if (!project) {
    return <Redirect to="/projects" />;
  }

  const handleRowClick = (record: TestCase) => {
    history.push(`/projects/${match.params.pid}/testcases/${record._id}`);
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
              <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
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
      <Table
        className="testcases-list"
        bordered={true}
        columns={columns}
        onRowClick={handleRowClick}
        dataSource={testCases}
      />
    </Fragment>
  );
};

export default withRouter(TestCaseList);
