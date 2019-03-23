import { getUser } from '@/api/auth.api';
import { postExecutionContext } from '@/api/execution-context.api';
import { postExecution } from '@/api/execution.api';
import { FormButton, FormCheckbox, FormSearchSelect } from '@/components/form';
import { ProjectContext } from '@/contexts/ProjectContext';
import {
  Execution,
  ExecutionResult,
  ExecutionStatus,
} from '@/models/Execution';
import {
  ExecutionContext,
  ExecutionContextStatus,
  ExecutionMethod,
  ExecutionType,
} from '@/models/ExecutionContext';
import { ExecutionStep, ExecutionStepResult } from '@/models/ExecutionStep';
import { TestCase } from '@/models/TestCase';
import { Icon, notification, Select } from 'antd';
import { ObjectId } from 'bson';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { TestStep } from '@/models/TestStep';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetupTestcase: React.FunctionComponent<
  RouteComponentProps<Params>
> = ({ history, match }) => {
  const [{ testCases }] = useContext(ProjectContext);
  const [currentTestCaseId, setCurrentTestCaseId] = useState<ObjectId | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTestCaseIdChange = (selectedTestCaseIdString: string) => {
    const selectedTestCaseId = ObjectId.createFromHexString(
      selectedTestCaseIdString
    );
    if (currentTestCaseId !== selectedTestCaseId) {
      setCurrentTestCaseId(selectedTestCaseId);
    }
  };

  const handleStartTestCases = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const { _id: userId } = getUser()!;
    const testCase: TestCase = testCases.find(
      (_testCase: TestCase) => testCase._id === currentTestCaseId
    )!;

    const executionContextNew: Partial<ExecutionContext> = {
      userId,
      projectId: ObjectId.createFromHexString(match.params.pid),
      type: ExecutionType.TestCases,
      method: ExecutionMethod.Manual,
      status: ExecutionContextStatus.Scheduled,
    };

    setIsLoading(true);

    try {
      const { _id: contextId } = await postExecutionContext(
        executionContextNew
      );
      const executionSteps: ExecutionStep[] = testCase.steps.map(
        (testStep: TestStep) => ({
          ...testStep,
          result: ExecutionStepResult.Pending,
        })
      );
      const executionsNew: Partial<Execution> = {
        contextId,
        testCaseId: currentTestCaseId!,
        result: ExecutionResult.Pending,
        status: ExecutionStatus.Waiting,
        steps: executionSteps,
      };
      await postExecution(executionsNew);
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

  return (
    <Fragment>
      <FormSearchSelect
        label="Test Case"
        placeholder="None"
        value={
          (currentTestCaseId && currentTestCaseId.toHexString()) || undefined
        }
        onChange={handleTestCaseIdChange}
      >
        {testCases.map((_testCase, index) => (
          <Option key={index} value={_testCase._id.toHexString()}>
            {_testCase.title}
          </Option>
        ))}
      </FormSearchSelect>
      <FormButton
        type="primary"
        loading={isLoading}
        disabled={!currentTestCaseId}
        onClick={handleStartTestCases}
      >
        Start
        <Icon type="right" />
      </FormButton>
    </Fragment>
  );
};

export default withRouter(ExecutionSetupTestcase);
