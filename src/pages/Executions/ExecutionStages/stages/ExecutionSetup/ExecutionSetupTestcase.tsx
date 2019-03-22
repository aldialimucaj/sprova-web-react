import { getUser } from '@/api/auth.api';
import { postExecutionContext } from '@/api/execution-context.api';
import { postExecution } from '@/api/execution.api';

import { FormButton, FormCheckbox, FormSearchSelect } from '@/components/form';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Execution } from '@/models/Execution';
import { ExecutionContext } from '@/models/ExecutionContext';
import { TestCase } from '@/models/TestCase';
import { Icon, notification, Select } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetupTestcase: React.FunctionComponent<
  RouteComponentProps<Params>
> = ({ history, match }) => {
  const [{ testCases }] = useContext(ProjectContext);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [includeInherited, setIncludeInherited] = useState<boolean>(false);

  const handleTestCaseSelect = (id: string) => {
    const _selectedTestCase = testCases.find(
      (_testCase) => _testCase._id === id
    )!;
    setSelectedTestCase(_selectedTestCase);
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
      const executionsNew: Execution = {
        testcaseId: selectedTestCase!._id!,
        contextId,
        result: null,
        status: 'waiting',
      };
      const id = await postExecution(executionsNew);
      setIsLoading(false);
      notification.success({
        message: 'Execution started',
        description: `Execution Context created with ID ${contextId}`,
      });
      history.push(
        `/projects/${match.params.pid}/executions/run?contextId=${contextId}`
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
      <FormSearchSelect
        label="Test Case"
        placeholder="None"
        value={(selectedTestCase && selectedTestCase.title) || undefined}
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
      <FormButton
        type="primary"
        loading={isLoading}
        disabled={!selectedTestCase}
        onClick={handleSubmit}
      >
        Start
        <Icon type="right" />
      </FormButton>
    </Fragment>
  );
};

export default withRouter(ExecutionSetupTestcase);
