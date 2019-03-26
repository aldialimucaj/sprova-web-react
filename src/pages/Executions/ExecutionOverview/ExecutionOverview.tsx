import { getExecutionContexts } from '@/api/execution-context.api';
import Level from '@/components/Level';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFetcher } from '@/hooks/useFetcher';
import { ExecutionContext } from '@/models/ExecutionContext';
import { Alert, Button, Card, Col, Divider, Icon, List, Row } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

interface Params {
  pid: string;
}

const ExecutionOverview: React.FunctionComponent<
  RouteComponentProps<Params>
> = ({ history, match }) => {
  const [{ project }] = useContext(ProjectContext);

  const {
    data: executionContexts,
    isLoading: isExecutionContextsLoading,
    error,
  } = useFetcher<ExecutionContext[]>(getExecutionContexts, match.params.pid);

  return error ? (
    <Alert message="Something went wrong" description={error} type="error" />
  ) : (
    <Fragment>
      <PageHeader
        title="Executions"
        subTitle="Overview"
        url={`/projects/${match.params.pid}`}
        extra={
          <Link key="0" to={`/projects/${match.params.pid}/executions/setup`}>
            <Button type="primary">
              <Icon type="caret-right" /> Start new
            </Button>
          </Link>
        }
      />
      <List
        loading={isExecutionContextsLoading}
        className="children-list is-highlight"
        size="small"
        header={
          <div>
            <Icon type="loading" style={{ marginRight: 8 }} />
            Active Executions
          </div>
        }
        bordered={true}
        dataSource={executionContexts}
        renderItem={(executionContext: ExecutionContext) => (
          <List.Item
            onClick={() =>
              history.push(
                `/projects/${match.params.pid}/executions/run?contextId=${
                  executionContext._id
                }`
              )
            }
          >
            <Level
              style={{ marginBottom: 0, width: '100%' }}
              left={
                <div>
                  <div style={{ fontSize: 10, color: 'grey' }}>
                    {executionContext.method}
                    <Divider type="vertical" />
                    {executionContext.type}
                  </div>
                  <span>{executionContext._id}</span>
                </div>
              }
              right={
                <div style={{ textAlign: 'end' }}>
                  <div style={{ fontSize: 10, color: 'grey' }}>
                    {new Date(executionContext.createdAt).toLocaleString()}
                  </div>
                  <span>5/10</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Row gutter={16}>
        <Col span={12} style={{ marginBottom: 24 }}>
          <List
            loading={isExecutionContextsLoading}
            className="children-list"
            size="small"
            header={
              <Level
                style={{ marginBottom: 0 }}
                left={
                  <span>
                    <Icon type="clock-circle" style={{ marginRight: 8 }} />
                    Scheduled Executions
                  </span>
                }
                right={
                  <Link
                    to={`/projects/${match.params.pid}/executions/schedule`}
                  >
                    Show Schedule
                  </Link>
                }
              />
            }
            bordered={true}
            dataSource={[]}
            renderItem={(executionContext: ExecutionContext) => (
              <List.Item>{executionContext._id}</List.Item>
            )}
          />
        </Col>
        <Col span={12} style={{ marginBottom: 24 }}>
          <List
            loading={isExecutionContextsLoading}
            className="children-list"
            size="small"
            header={
              <Level
                style={{ marginBottom: 0 }}
                left={
                  <span>
                    <Icon type="check-circle" style={{ marginRight: 8 }} />
                    Finished Executions
                  </span>
                }
                right={
                  <Link to={`/projects/${match.params.pid}/executions/history`}>
                    Show History
                  </Link>
                }
              />
            }
            bordered={true}
            dataSource={[]}
            renderItem={(executionContext: ExecutionContext) => (
              <List.Item>{executionContext._id}</List.Item>
            )}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionOverview);
