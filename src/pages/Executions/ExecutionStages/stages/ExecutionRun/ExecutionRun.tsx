import { getExecutionContext } from '@/api/execution-context.api';
import { getExecutionsOfContext } from '@/api/execution.api';
import Level from '@/components/Level';
import PageHeader from '@/components/PageHeader';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution, ExecutionStatus } from '@/models/Execution';
import { parseQuery } from '@/utils';
import { Button, Col, Icon, List, Popconfirm, Row, Spin } from 'antd';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Executor from './Executor';
import './index.scss';

const ButtonGroup = Button.Group;

interface Params {
  pid: string;
}

const ExecutionRun: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  location,
  match,
}) => {
  const { contextId } = parseQuery(location);

  const [currentExecution, setCurrentExecution] = useState<Execution | null>(
    null
  );

  const { data: context, isLoading: isContextLoading } = useFetcher(
    getExecutionContext,
    contextId
  );

  const { data: executions, isLoading: isTestCasesLoading } = useFetcher<
    Execution[]
  >(getExecutionsOfContext, contextId, true);

  if (!currentExecution && executions) {
    const firstPendingExecution: Execution | undefined = _.find(
      executions,
      (execution: Execution) => execution.status === ExecutionStatus.Pending
    );
    setCurrentExecution(firstPendingExecution || executions[0]);
  }

  const handleExecutionSelect = (selectedExecution: Execution) => {
    if (selectedExecution._id !== currentExecution!._id) {
      setCurrentExecution(selectedExecution);
    }
  };

  const abortButton = (
    <Popconfirm
      placement="bottomRight"
      title="Abort this test run?"
      icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
      okText="Yes"
      cancelText="Cancel"
    >
      <a>Abort</a>
    </Popconfirm>
  );

  const handleFinishedExecution = (status: ExecutionStatus) => {};

  const getStatusColor = (status: ExecutionStatus): string => {
    switch (status) {
      case ExecutionStatus.Successful: {
        return '#f6ffed';
      }
      case ExecutionStatus.Warning: {
        return '#fffbe6';
      }
      case ExecutionStatus.Failed: {
        return '#fff1f0';
      }
      default: {
        return 'white';
      }
    }
  };

  const getStatusIcon = (status: ExecutionStatus): string => {
    switch (status) {
      case ExecutionStatus.Successful: {
        return 'check';
      }
      case ExecutionStatus.Warning: {
        return 'exclamation';
      }
      case ExecutionStatus.Failed: {
        return 'close';
      }
      default: {
        return '';
      }
    }
  };

  const findPrevious = () => {
    // return _.findIndex();
  };

  const findNext = () => {};

  const hasPrevious = () => {
    return false;
  };

  const hasNext = () => {
    return false;
  };

  const selectPrevious = () => {};

  const selectNext = () => {};

  return isContextLoading || isTestCasesLoading ? (
    <Spin />
  ) : (
    <Fragment>
      <PageHeader
        title="Execution Run"
        subTitle="#51"
        extra={abortButton}
        url={`/projects/${match.params.pid}/executions`}
      />

      <Row gutter={24}>
        <Col span={18}>
          <Level
            left={
              <span style={{ fontSize: 18 }}>
                {currentExecution!.testCaseTitle!}
              </span>
            }
            right={
              <ButtonGroup>
                <Button disabled={!hasPrevious()} onClick={selectPrevious}>
                  <Icon type="left" />
                  Previous
                </Button>
                <Button disabled={!hasNext()} onClick={selectNext}>
                  Next
                  <Icon type="right" />
                </Button>
              </ButtonGroup>
            }
          />
          <Executor
            eid={currentExecution!._id}
            onFinish={handleFinishedExecution}
          />
        </Col>
        <Col span={6}>
          <List
            className="children-list"
            size="small"
            header={
              <Level
                style={{ marginBottom: 0 }}
                left={<span>Test Cases</span>}
              />
            }
            bordered={true}
            dataSource={executions}
            renderItem={(_execution: Execution) => (
              <List.Item
                style={{
                  backgroundColor: `${getStatusColor(_execution.status)}`,
                }}
                className={`list-item ${
                  _execution._id === currentExecution!._id ? 'selected' : ''
                }`}
                onClick={() => handleExecutionSelect(_execution)}
              >
                <Level
                  style={{
                    marginBottom: 0,
                    width: '100%',
                  }}
                  left={<span>{_execution.testCaseTitle}</span>}
                  right={<Icon type={getStatusIcon(_execution.status)} />}
                />
              </List.Item>
            )}
            footer={<span>Footer</span>}
          />
          <Button
            disabled={true}
            style={{ marginBottom: 8 }}
            block={true}
            type="primary"
          >
            Finish
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionRun);
