import { Button, Col, Empty, Icon, notification, Popconfirm, Row } from 'antd';
import _ from 'lodash';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteTestCase } from '../../../api/testcase.api';
import CardList from '../../../components/CardList';
import SectionHeader from '../../../components/SectionHeader';
import {
  ProjectContext,
  removeTestCase,
} from '../../../contexts/ProjectContext';
import { TestCase } from '../../../models/TestCase';
import { findById, findChildren } from '../../../utils';

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

  const handleChildClick = (tc: TestCase) => {
    history.push(`/projects/${pid}/testcases/${tc._id}`);
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
          <CardList
            title="Children"
            dataSource={findChildren(testCases, match.params.tid)}
            renderItem={(tc: TestCase) => <div>{tc.title}</div>}
            onItemClick={handleChildClick}
          />
        </Col>
      </Row>
    </Fragment>
  ) : (
    <Empty />
  );
};

export default withRouter(TestCaseDetails);
