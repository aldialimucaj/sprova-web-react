import { getExecutionContext } from '@/api/execution-context.api';
import { getExecutionsOfContext } from '@/api/execution.api';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution, ExecutionStatus } from '@/models/Execution';
import { ExecutionStep } from '@/models/ExecutionStep';
import { parseQuery } from '@/utils';
import {
  Button,
  Card,
  Col,
  Icon,
  List,
  PageHeader,
  Row,
  Spin,
  Tag,
} from 'antd';
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
    const firstWaitingExecution: Execution | undefined = _.find(
      executions,
      (execution: Execution) => execution.status === ExecutionStatus.Waiting
    );
    setCurrentExecution(firstWaitingExecution || executions[0]);
  }

  const handleExecutionSelect = (selectedExecution: Execution) => {
    if (selectedExecution._id !== currentExecution!._id) {
      setCurrentExecution(selectedExecution);
    }
  };

  return isContextLoading || isTestCasesLoading ? (
    <Spin />
  ) : (
    <Fragment>
      <Card className="card-no-padding" style={{ marginBottom: 24 }}>
        <PageHeader
          onBack={() => null}
          style={{ padding: 16 }}
          title="Execution Run"
          subTitle="#51"
          extra={[<a key="0">Abort</a>]}
        />
      </Card>

      <Row gutter={24}>
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
              <List.Item onClick={() => handleExecutionSelect(_execution)}>
                {_execution.testCaseTitle}
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
        <Col span={18}>
          <Executor execution={currentExecution!} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionRun);
