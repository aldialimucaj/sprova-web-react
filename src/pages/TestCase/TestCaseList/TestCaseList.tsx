import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCase } from '@/models/TestCase';
import { Button, Divider, Icon, Table } from 'antd';
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
        title={
          <span>
            <Link to={`/projects/${match.params.pid}`}>{project.title}</Link> /{' '}
            <strong>Test Cases</strong>
          </span>
        }
        extra={
          <Link to={`/projects/${match.params.pid}/testcases/new`}>
            <Button type="primary">
              <Icon type="plus" /> New
            </Button>
          </Link>
        }
      />
      <Divider />
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
