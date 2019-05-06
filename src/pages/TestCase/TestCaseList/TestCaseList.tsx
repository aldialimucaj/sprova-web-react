import Card, { CardBody, CardHeader } from '@/components/Card';
import { PageContent, PageHeader } from '@/components/Layout';
import Level from '@/components/Level';
import Table, { TableColumn, TableRow } from '@/components/Table';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCaseContext } from '@/contexts/TestCaseContext';
import { TestCase } from '@/models/TestCase';
import { Breadcrumb, Button, Icon } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const TestCaseList: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const { currentProject } = useContext(ProjectContext);
  const { testCases, isTestCasesFetched } = useContext(TestCaseContext);

  const handleRowClick = (testCase: TestCase) => {
    history.push(`/projects/${currentProject!._id}/testcases/${testCase._id}`);
  };

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects/${currentProject!._id}`}>
              <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Test Cases</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="All Test Cases"
      />
      <PageContent loading={!isTestCasesFetched}>
        <Card>
          <CardHeader>
            <Level>
              <h3>Test Cases</h3>
              <Button
                type="primary"
                onClick={() =>
                  history.push(`/projects/${currentProject!._id}/testcases/new`)
                }
              >
                <Icon type="plus" /> New
              </Button>
            </Level>
          </CardHeader>
          <CardBody padded={false}>
            <Table
              data={testCases}
              columnTitles={['Title', 'Description']}
              renderRow={(testCase: TestCase, index: number) => (
                <TableRow key={index} onClick={() => handleRowClick(testCase)}>
                  <TableColumn>{testCase.title}</TableColumn>
                  <TableColumn>{testCase.description}</TableColumn>
                </TableRow>
              )}
            />
          </CardBody>
        </Card>
      </PageContent>
    </Fragment>
  );
};

export default withRouter(TestCaseList);
