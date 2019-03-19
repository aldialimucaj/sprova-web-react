import SectionHeader from '@/components/SectionHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCase } from '@/models/TestCase';
import { Button, Icon, Table } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Params {
  pid: string;
}

const TestCaseList: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [{ testCases }] = useContext(ProjectContext);

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
  ];

  return (
    <Fragment>
      <SectionHeader
        title="Test Cases"
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
