import { getExecutionSteps, putExecutionStep } from '@/api/execution.api';
import { FormTextArea } from '@/components/form';
import Level from '@/components/Level';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { ExecutionStep, ExecutionStepResult } from '@/models/ExecutionStep';
import { Alert, Button, Form, Icon, List, notification, Spin, Tag } from 'antd';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

const ButtonGroup = Button.Group;

interface Props extends RouteComponentProps {
  eid: string;
  executionTitle: string;
}

const Executor: React.FunctionComponent<Props> = ({ eid, executionTitle }) => {
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [isExecutionStepsLoading, setIsExecutionStepsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const [currentStep, setCurrentStep] = useState<ExecutionStep>();

  const [isStepUpdateLoading, setIsStepUpdateLoading] = useState(false);
  const {
    value: stepMessage,
    setValue: setStepMessage,
    handleChange: handleStepMessageChange,
  } = useFormTextArea('');

  const findFirstPendingStep = (
    steps: ExecutionStep[]
  ): ExecutionStep | undefined => {
    return _.find(
      steps,
      (step: ExecutionStep) => step.result === ExecutionStepResult.Pending
    );
  };

  const handleStepSelect = (executionStep: ExecutionStep) => {
    setCurrentStep(executionStep);
    setStepMessage('');
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

      const nextPendingStep = findFirstPendingStep(executionSteps);
      setCurrentStep(nextPendingStep);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsExecutionStepsLoading(true);
      setError('');

      try {
        const fetchedData = await getExecutionSteps(eid);
        setExecutionSteps(fetchedData);

        const firstPendingStep = findFirstPendingStep(fetchedData);
        setCurrentStep(firstPendingStep);
        setStepMessage('');
      } catch (error) {
        setError(error);
      }

      setIsExecutionStepsLoading(false);
    };

    fetchData();
  }, [eid]);

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
            currentStep && executionStep.action === currentStep.action ? (
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
