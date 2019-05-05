import Card, { CardBody, CardHeader } from '@/components/Card';
import { PageContent, PageHeader } from '@/components/Layout';
import Level from '@/components/Level';
import Table from '@/components/Table';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCaseContext } from '@/contexts/TestCaseContext';
import { TestCase } from '@/models/TestCase';
import { Breadcrumb, Button, Icon, Spin } from 'antd';
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
      />
      <PageContent>
        {!isTestCasesFetched ? (
          <Spin />
        ) : (
          <Card>
            <CardHeader>
              <Level>
                <h3>Test Cases</h3>
                <div>
                  {
                    <Link
                      key={0}
                      to={`/projects/${match.params.pid}/testcases/new`}
                    >
                      <Button type="primary">
                        <Icon type="plus" /> New
                      </Button>
                    </Link>
                  }
                </div>
              </Level>
            </CardHeader>
            <CardBody padded={false}>
              <Table
                title="Test Cases"
                data={testCases}
                columnTitles={['Title', 'Description']}
                onRowClick={handleRowClick}
                renderRow={(testCase: TestCase, index: number) => [
                  <td key={0}>{testCase.title}</td>,
                  <td key={1}>{testCase.description}</td>,
                ]}
              />
            </CardBody>
          </Card>
        )}
      </PageContent>
    </Fragment>
  );
};

export default withRouter(TestCaseList);
