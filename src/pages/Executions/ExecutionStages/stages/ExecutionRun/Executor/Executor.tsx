import {
  getExecution,
  getExecutionSteps,
  putExecutionStep,
} from '@/api/execution.api';
import { FormTextArea } from '@/components/form';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { ExecutionStep, ExecutionStepResult } from '@/models/ExecutionStep';
import { Alert, Button, Form, Icon, List, notification, Spin, Tag } from 'antd';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

const ButtonGroup = Button.Group;

interface Params {
  pid: string;
}

interface Props extends RouteComponentProps<Params> {
  eid: string;
  executionTitle: string;
}

const Executor: React.FunctionComponent<Props> = ({ eid, executionTitle }) => {
  const {
    data: executionSteps,
    setData: setExecutionSteps,
    isLoading: isExecutionStepsLoading,
    error,
  } = useFetcher(getExecutionSteps, eid);
  const [currentStep, setCurrentStep] = useState<ExecutionStep | null>(null);
  const [isStepUpdateLoading, setIsStepUpdateLoading] = useState<boolean>(
    false
  );
  const {
    value: stepMessage,
    handleChange: handleStepMessageChange,
  } = useFormTextArea('');

  if (!currentStep && executionSteps) {
    const firstPendingStep: ExecutionStep | undefined = _.find(
      executionSteps,
      (step: ExecutionStep) => step.result === ExecutionStepResult.Pending
    );
    setCurrentStep(firstPendingStep || executionSteps[0]);
  }

  const handleStepSelect = (executionStep: ExecutionStep) => {
    setCurrentStep(executionStep);
  };

  const handleStepResult = async (result: ExecutionStepResult) => {
    const executionStepNew: ExecutionStep = {
      ...currentStep!,
      ...(stepMessage && { message: stepMessage }),
      result,
    };

    setIsStepUpdateLoading(true);

    try {
      await putExecutionStep(eid, executionStepNew);

      const index = _.findIndex(executionSteps, {
        action: executionStepNew.action,
        expected: executionStepNew.expected,
      });

      executionSteps!.splice(index, 1, executionStepNew);

      setIsStepUpdateLoading(false);
    } catch (error) {
      setIsStepUpdateLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to update Execution Step',
        description: error,
      });
    }
  };

  const getTagColor = (result: ExecutionStepResult): string => {
    switch (result) {
      case ExecutionStepResult.Successful: {
        return 'green';
      }
      case ExecutionStepResult.Failed: {
        return 'red';
      }
      case ExecutionStepResult.Pending: {
        return 'blue';
      }
      case ExecutionStepResult.Warning: {
        return 'orange';
      }
      default: {
        return '';
      }
    }
  };

  return (
    <Fragment>
      <Level
        left={<span style={{ fontSize: 18 }}>{executionTitle}</span>}
        right={
          <ButtonGroup>
            <Button>
              <Icon type="left" />
              Previous
            </Button>
            <Button>
              Next
              <Icon type="right" />
            </Button>
          </ButtonGroup>
        }
      />
      {isExecutionStepsLoading ? (
        <Spin />
      ) : error ? (
        <Alert
          message="Something went wrong"
          description={error}
          type="error"
        />
      ) : (
        <List
          size="default"
          bordered={true}
          dataSource={executionSteps}
          renderItem={(executionStep: ExecutionStep) =>
            executionStep.action === currentStep!.action ? (
              <List.Item
                style={{
                  display: 'block',
                  paddingBottom: 24,
                  backgroundColor: 'rgba(0, 0, 0, 0.025)',
                  overflow: 'hidden',
                }}
              >
                <Spin spinning={isStepUpdateLoading}>
                  <Level
                    style={{ width: '100%' }}
                    left={
                      <div>
                        <h4>{executionStep.action}</h4>
                        <div>{`Expected: ${executionStep.expected}`}</div>
                      </div>
                    }
                    right={
                      <Tag
                        color={getTagColor(executionStep.result)}
                        style={{ pointerEvents: 'none' }}
                      >
                        {executionStep.result}
                      </Tag>
                    }
                  />
                  {executionStep.result === ExecutionStepResult.Pending ? (
                    <Fragment>
                      <Form layout="vertical">
                        <FormTextArea
                          label="Message (optional)"
                          value={stepMessage}
                          onChange={handleStepMessageChange}
                        />
                      </Form>
                      <Button
                        type="primary"
                        style={{ marginRight: 16 }}
                        onClick={() =>
                          handleStepResult(ExecutionStepResult.Successful)
                        }
                      >
                        <Icon type="check-circle" /> Success
                      </Button>
                      <Button
                        style={{ marginRight: 16 }}
                        onClick={() =>
                          handleStepResult(ExecutionStepResult.Warning)
                        }
                      >
                        <Icon type="warning" /> Warning
                      </Button>
                      <Button
                        type="danger"
                        onClick={() =>
                          handleStepResult(ExecutionStepResult.Failed)
                        }
                      >
                        <Icon type="stop" /> Failure
                      </Button>
                    </Fragment>
                  ) : (
                    <Button style={{ marginRight: 16 }}>Edit</Button>
                  )}
                </Spin>
              </List.Item>
            ) : (
              <List.Item
                className="selectable-step"
                onClick={() => handleStepSelect(executionStep)}
              >
                <List.Item.Meta
                  title={executionStep.action}
                  description={`Expected: ${executionStep.expected}`}
                />
                <Tag
                  color={getTagColor(executionStep.result)}
                  style={{ pointerEvents: 'none' }}
                >
                  {executionStep.result}
                </Tag>
              </List.Item>
            )
          }
        />
      )}
    </Fragment>
  );
};

export default withRouter(Executor);
