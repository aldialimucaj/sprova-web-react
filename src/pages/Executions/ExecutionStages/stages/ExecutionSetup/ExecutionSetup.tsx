import { getUser } from '@/api/auth.api';
import { postExecutionContext } from '@/api/execution-context.api';
import { postExecutions } from '@/api/execution.api';
import { FormButton, FormSearchSelect, FormSelect } from '@/components/form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Execution } from '@/models/Execution';
import { ExecutionContext } from '@/models/ExecutionContext';
import { TestCase } from '@/models/TestCase';
import { Col, Form, Icon, notification, Row, Select } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetup: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [{ testCases }] = useContext(ProjectContext);

  const [type, setType] = useState('');
  const [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>([]);
  const [includeInherited, setIncludeInherited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTestCaseSelect = (id: string) => {
    const selectedTestCase = testCases.find(
      (_testCase) => _testCase._id === id
    )!;
    setSelectedTestCases([...selectedTestCases, selectedTestCase]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { _id: userId } = getUser()!;

    const executionContextNew: ExecutionContext = {
      userId,
      projectId: match.params.pid,
      type: 'testcase',
      method: 'manual',
      status: 'active',
    };

    setIsLoading(true);

    try {
      const contextId = await postExecutionContext(executionContextNew);
      const executionsNew: Execution[] = selectedTestCases.map(
        (_testCase: TestCase): Execution => {
          return {
            testcaseId: _testCase._id!,
            contextId,
            result: null,
            status: 'waiting',
          };
        }
      );
      const ok = await postExecutions(executionsNew);
      setIsLoading(false);
      notification.success({
        message: 'Execution started',
        description: `Execution Context created with ID ${contextId}`,
      });
      history.push(
        `/projects/${match.params.pid}/executions/run?context=${contextId}`
      );
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: 'Failed to start Execution Context',
        description: error,
      });
    }
  };

  const handleIncludeInheritedChange = () => {};

  return (
    <Fragment>
      <Row>
        <Col>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <FormSelect
              label="Type"
              value={type}
              onChange={setType}
              required={true}
            >
              <Option value="testcase">Test Case</Option>
              <Option value="testset">Test Set</Option>
              <Option value="cycle">Cycle</Option>
            </FormSelect>
            <FormSearchSelect
              label="Test Case"
              placeholder="None"
              onChange={handleTestCaseSelect}
            >
              {testCases.map((_testCase, index) => (
                <Option key={index} value={_testCase._id}>
                  {_testCase.title}
                </Option>
              ))}
            </FormSearchSelect>
            <FormCheckbox
              checked={includeInherited}
              onChange={handleIncludeInheritedChange}
            >
              Include inherited
            </FormCheckbox>
            <FormButton type="primary" loading={isLoading}>
              Start
              <Icon type="right" />
            </FormButton>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionSetup);
