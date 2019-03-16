import {
  Button,
  Card,
  Col,
  Empty,
  Icon,
  notification,
  Popconfirm,
  Row,
} from 'antd';
import _ from 'lodash';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteTestCase } from '../../../api/testcase.api';
import SectionHeader from '../../../components/SectionHeader';
import {
  ProjectContext,
  removeTestCase,
} from '../../../contexts/ProjectContext';
import { TestCase } from '../../../models/TestCase';

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
  const [testCase, setTestCase] = useState<TestCase | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const findById = (tcs: TestCase[], id: string): TestCase => {
    return _.find(tcs, ({ _id }: TestCase) => _id === id)!;
  };

  useEffect(() => {
    setTestCase(findById(testCases, match.params.tid));
  }, [testCases, match.params.tid]);

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

  const findChildren = (tcs: TestCase[], parentId: string) => {
    return _.filter(tcs, ({ parent }: TestCase) => parent === parentId);
  };

  const handleChildClick = (id: string) => {
    history.push(`/projects/${pid}/testcases/${id}`);
  };

  return testCase ? (
    <Fragment>
      <SectionHeader
        title={testCase.title}
        extra={
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
      <Row gutter={16}>
        <Col lg={12} style={{ marginBottom: 16 }}>
          Details
        </Col>

        <Col lg={12} style={{ marginBottom: 16 }}>
          <Card title="Children">
            {findChildren(testCases, testCase!._id!).map(
              (tc: TestCase, index: number) => (
                <Card.Grid style={{ cursor: 'pointer', width: '100%' }}>
                  <div onClick={() => handleChildClick(tc._id!)}>
                    {tc.title}
                  </div>
                </Card.Grid>
              )
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  ) : (
    <Empty />
  );
};

export default withRouter(TestCaseDetails);
