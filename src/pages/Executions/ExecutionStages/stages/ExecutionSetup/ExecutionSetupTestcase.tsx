import { getUser } from '@/api/auth.api';
import { postExecutionContext } from '@/api/execution-context.api';
import { postExecutions } from '@/api/execution.api';
import { FormButton, FormSearchSelect } from '@/components/form';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Execution, ExecutionStatus } from '@/models/Execution';
import {
  ExecutionContext,
  ExecutionContextStatus,
  ExecutionMethod,
  ExecutionType,
} from '@/models/ExecutionContext';
import { ExecutionStep, ExecutionStepResult } from '@/models/ExecutionStep';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { parseQuery } from '@/utils';
import { Icon, List, notification, Select } from 'antd';
import _ from 'lodash';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetupTestcase: React.FunctionComponent<
  RouteComponentProps<Params>
> = ({ history, location, match }) => {
  const { tid } = parseQuery(location);

  const [{ testCases }] = useContext(ProjectContext);

  const testCaseFromQuery: TestCase | undefined = _.find(
    testCases,
    (testCase: TestCase) => testCase._id === tid
  );

  const [selectableTestCases, setSelectableTestCases] = useState<TestCase[]>(
    (testCaseFromQuery && _.without(testCases, testCaseFromQuery)) || testCases
  );
  const [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>(
    (testCaseFromQuery && [testCaseFromQuery]) || []
  );
  const [currentTestCaseId, setCurrentTestCaseId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTestCaseSelect = (selectedTestCaseId: string) => {
    const selectedTestCase: TestCase = _.find(
      selectableTestCases,
      (testCase: TestCase) => testCase._id === selectedTestCaseId
    )!;
    setSelectableTestCases(_.without(selectableTestCases, selectedTestCase));
    setSelectedTestCases([...selectedTestCases, selectedTestCase]);
    setCurrentTestCaseId(null);
  };

  const removeTestCase = (testCase: TestCase) => {
    setSelectableTestCases([...selectableTestCases, testCase]);
    setSelectedTestCases(_.without(selectedTestCases, testCase));
  };

  const handleStartTestCases = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const { _id: userId } = getUser()!;

    const executionContextNew: Partial<ExecutionContext> = {
      userId,
      projectId: match.params.pid,
      type: ExecutionType.TestCases,
      method: ExecutionMethod.Manual,
      status: ExecutionContextStatus.Active,
    };

    setIsLoading(true);

    try {
      const { _id: contextId } = await postExecutionContext(
        executionContextNew
      );

      const executions: Array<Partial<Execution>> = selectedTestCases.map(
        (testCase: TestCase) => {
          return {
            contextId,
            testCaseId: testCase._id,
            status: ExecutionStatus.Pending,
          };
        }
      );

      await postExecutions(executions);
      setIsLoading(false);
      notification.success({
        placement: 'bottomRight',
        message: 'Execution started',
        description: `Execution Context created with ID ${contextId}`,
      });
      history.push(
        `/projects/${match.params.pid}/executions/run?contextId=${contextId}`
      );
    } catch (error) {
      setIsLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to start Execution Context',
        description: error,
      });
    }
  };

  return (
    <Fragment>
      <List
        className="children-list"
        size="small"
        header={<span>Test Cases</span>}
        bordered={true}
        dataSource={selectedTestCases}
        renderItem={(testCase: TestCase) => (
          <List.Item
            actions={[
              <a key="remove" onClick={() => removeTestCase(testCase)}>
                remove
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{testCase.title}</a>}
            />
          </List.Item>
        )}
      />
      <FormSearchSelect
        label="Add"
        placeholder="None"
        value={currentTestCaseId || undefined}
        onChange={handleTestCaseSelect}
      >
        {selectableTestCases.map((_testCase, index) => (
          <Option key={index} value={_testCase._id}>
            {_testCase.title}
          </Option>
        ))}
      </FormSearchSelect>
      <FormButton
        type="primary"
        loading={isLoading}
        disabled={selectedTestCases.length === 0}
        onClick={handleStartTestCases}
      >
        Start
        <Icon type="right" />
      </FormButton>
    </Fragment>
  );
};

export default withRouter(ExecutionSetupTestcase);
