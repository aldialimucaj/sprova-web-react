import { getExecutionContexts } from '@/api/execution-context.api';
import Level from '@/components/Level';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFetcher } from '@/hooks/useFetcher';
import { ExecutionContext } from '@/models/ExecutionContext';
import { Button, Col, Divider, Icon, List, Row } from 'antd';
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

  const { data: contexts, isLoading: isContextsLoading } = useFetcher<
    ExecutionContext[]
  >(getExecutionContexts, match.params.pid);

  return (
    <Fragment>
      <Level
        left={
          <span style={{ fontSize: 18 }}>
            <Link to={`/projects/${match.params.pid}`}>{project.title}</Link> /{' '}
            <strong>Executions</strong>
          </span>
        }
        right={
          <Link to={`/projects/${match.params.pid}/executions/setup`}>
            <Button type="primary">
              <Icon type="caret-right" /> Start new
            </Button>
          </Link>
        }
      />
      <Divider />
      <List
        className="children-list is-highlight"
        size="small"
        header={
          <div>
            <Icon type="loading" style={{ marginRight: 8 }} />
            Active Executions
          </div>
        }
        bordered={true}
        dataSource={contexts}
        renderItem={(exec: ExecutionContext) => (
          <List.Item
            onClick={() =>
              history.push(
                `/projects/${match.params.pid}/executions/run?context=${
                  exec._id
                }`
              )
            }
          >
            <Level
              style={{ marginBottom: 0, width: '100%' }}
              left={<span>{exec._id}</span>}
              right={<span>5/10</span>}
            />
          </List.Item>
        )}
      />
      <Row gutter={16}>
        <Col span={12} style={{ marginBottom: 24 }}>
          <List
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
            renderItem={(exec: ExecutionContext) => (
              <List.Item>{exec._id}</List.Item>
            )}
          />
        </Col>
        <Col span={12} style={{ marginBottom: 24 }}>
          <List
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
            renderItem={(exec: ExecutionContext) => (
              <List.Item>{exec._id}</List.Item>
            )}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionOverview);
