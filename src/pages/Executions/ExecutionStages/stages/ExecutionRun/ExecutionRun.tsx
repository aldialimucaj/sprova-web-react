import { getExecutionContext } from '@/api/execution-context.api';
import { getExecutionsOfContext } from '@/api/execution.api';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Execution } from '@/models/Execution';
import { Button, Icon, Spin, Row, Col, List, Timeline } from 'antd';
import queryString from 'querystring';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import './index.scss';

const ButtonGroup = Button.Group;

interface Params {
  pid: string;
}

const ExecutionRun: React.FunctionComponent<RouteComponentProps<Params>> = ({
  location,
  match,
}) => {
  const { contextId } = queryString.parse(location.search.substring(1));

  const { data: context, isLoading: isContextLoading } = useFetcher(
    getExecutionContext,
    contextId
  );

  const { data: executions, isLoading: isTestCasesLoading } = useFetcher<
    Execution[]
  >(getExecutionsOfContext, contextId);

  return isContextLoading || isTestCasesLoading ? (
    <Spin />
  ) : (
    <Fragment>
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
              <List.Item>{_execution._id}</List.Item>
            )}
            footer={<span>Footer</span>}
          />
          <Button
            disabled={true}
            style={{ marginBottom: 24 }}
            block={true}
            type="primary"
          >
            Finish
          </Button>
          <Button block={true}>Abort</Button>
        </Col>
        <Col span={18}>
          <Level left={<span style={{ fontSize: 18 }}>Title</span>} />
          {context!.method}
          {executions!.map((execution, index) => (
            <p key={index}>{execution._id}</p>
          ))}
          <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionRun);
