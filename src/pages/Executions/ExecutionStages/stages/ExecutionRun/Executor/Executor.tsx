import { FormTextArea } from '@/components/form';
import Level from '@/components/Level';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { Execution } from '@/models/Execution';
import { ExecutionStep, ExecutionStepResult } from '@/models/ExecutionStep';
import { Button, Form, Icon, List, Tag } from 'antd';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

const ButtonGroup = Button.Group;

interface Params {
  pid: string;
}

interface Props extends RouteComponentProps<Params> {
  execution: Execution;
}

const Executor: React.FunctionComponent<Props> = ({ execution }) => {
  const firstPendingStep: ExecutionStep | undefined = _.find(
    execution.steps,
    (step: ExecutionStep) => step.result === ExecutionStepResult.Pending
  );

  const [currentStep, setCurrentStep] = useState<ExecutionStep>(
    firstPendingStep || execution.steps[0]
  );

  const handleStepSelect = (executionStep: ExecutionStep) => {
    setCurrentStep(executionStep);
  };

  const {
    value: stepMessage,
    handleChange: handleStepMessageChange,
  } = useFormTextArea('');

  return (
    <Fragment>
      <Level
        left={<span style={{ fontSize: 18 }}>{execution.testCaseTitle}</span>}
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
      <List
        size="default"
        bordered={true}
        dataSource={execution.steps}
        renderItem={(executionStep: ExecutionStep) =>
          executionStep === currentStep ? (
            <List.Item
              style={{
                display: 'block',
                paddingBottom: 24,
                backgroundColor: 'rgba(0, 0, 0, 0.025)',
                overflow: 'hidden',
              }}
            >
              <Level
                style={{ width: '100%' }}
                left={
                  <div>
                    <h4>{executionStep.action}</h4>
                    <div>{`Expected: ${executionStep.expected}`}</div>
                  </div>
                }
                right={
                  <Tag color="blue" style={{ pointerEvents: 'none' }}>
                    {executionStep.result}
                  </Tag>
                }
              />
              <Form layout="vertical">
                <FormTextArea
                  label="Message (optional)"
                  value={stepMessage}
                  onChange={handleStepMessageChange}
                />
              </Form>
              <Button type="primary" style={{ marginRight: 16 }}>
                <Icon type="check-circle" /> Success
              </Button>
              <Button style={{ marginRight: 16 }}>
                <Icon type="warning" /> Warning
              </Button>
              <Button type="danger">
                <Icon type="stop" /> Failure
              </Button>
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
              <Tag color="blue" style={{ pointerEvents: 'none' }}>
                {executionStep.result}
              </Tag>
            </List.Item>
          )
        }
      />
    </Fragment>
  );
};

export default withRouter(Executor);
