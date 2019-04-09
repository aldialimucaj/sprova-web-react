import { getExecutionContext } from '@/api/execution-context.api';
import { getExecutionsOfContext } from '@/api/execution.api';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFetcher } from '@/hooks/useFetcher';
import PageContent from '@/layout/PageContent';
import {
  Breadcrumb,
  Button,
  Col,
  Icon,
  Row,
  Spin,
  Tabs,
  Tooltip,
  Card,
  Statistic,
  Progress,
  List,
  Divider,
} from 'antd';
import Chart from 'chart.js';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './ExecutionDetails.scss';
import Level from '@/components/Level';
import { formatDuration } from '@/utils/formatDuration';

const TabPane = Tabs.TabPane;

interface Params {
  pid: string;
  ecid: string;
}

const ExecutionResult: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const pieChartCanvas = React.createRef<HTMLCanvasElement>();

  const [{ project }] = useContext(ProjectContext);

  const [activeTabKey, setActiveTabKey] = useState('overview');

  const {
    data: executionContext,
    isLoading: isExecutionContextLoading,
  } = useFetcher(getExecutionContext, match.params.ecid);

  const { data: executions, isLoading: isExecutionsLoading } = useFetcher(
    getExecutionsOfContext,
    match.params.ecid
  );

  const generatePdfButton = (
    <Tooltip title="Generate PDF Report" key="generatePdf">
      <Button style={{ marginRight: 16 }}>
        <Icon type="file-pdf" />
      </Button>
    </Tooltip>
  );

  const rerunButton = (
    <Link to="/" key="rerun">
      <Button type="primary">Re-run Tests</Button>
    </Link>
  );

  useEffect(() => {
    if (isExecutionContextLoading || isExecutionsLoading) {
      return;
    }
    const pieChart = new Chart(pieChartCanvas.current!, {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Warning', 'Failure'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: ['#52c41a', '#faad14', '#f5222d'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 20,
          },
        },
      },
    });
  }, [
    isExecutionContextLoading,
    isExecutionsLoading,
    /* TODO: Externalize data and add to dependencies */
  ]);

  const getExecutionDuration = () => {
    const from = new Date(executionContext!.createdAt);
    const to = new Date(executionContext!.finishedAt!);
    return formatDuration(from, to);
  };

  return isExecutionContextLoading || isExecutionsLoading ? (
    <Spin />
  ) : (
    <PageContent
      header={
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Link to={`/projects/${match.params.pid}`}>
                <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
              </Link>
              <Link to={`/projects/${match.params.pid}/executions`}>
                <Breadcrumb.Item>Executions</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Result</Breadcrumb.Item>
            </Breadcrumb>
          }
          title="Finished Execution"
          extra={[generatePdfButton, rerunButton]}
        >
          <Row type="flex" justify="space-between">
            <Col span={8}>
              <Level
                left={
                  <Col>
                    <div>
                      <strong>Created at:</strong>
                    </div>
                    <div>
                      <strong>Mode:</strong>
                    </div>
                    <div>
                      <strong>Target:</strong>
                    </div>
                    <div>
                      <strong>User:</strong>
                    </div>
                  </Col>
                }
                right={
                  <Col>
                    <div>
                      {new Date(executionContext!.createdAt).toLocaleString()}
                    </div>
                    <div>
                      {_.upperFirst(executionContext!.method.toLowerCase())}
                    </div>
                    <div>
                      {_.upperFirst(executionContext!.type.toLowerCase())}
                    </div>
                    <div>{executionContext!.userId}</div>
                  </Col>
                }
              />
            </Col>
            <Col style={{ textAlign: 'end' }} />
          </Row>
        </PageHeader>
      }
    >
      <Row gutter={24}>
        <Col span={6}>
          <Card style={{ marginBottom: 24 }}>
            <Statistic title="No. Tests Executed" value={executions!.length} />
          </Card>
          <Card>
            <Statistic
              title="Anzeige"
              value="Hier könnte Ihre Werbung stehen!"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ marginBottom: 24 }}>
            <Statistic title="Duration" value={getExecutionDuration()} />
          </Card>
          <Card>
            <Statistic
              title="Anzeige"
              value="Hier könnte Ihre Werbung stehen!"
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Progress type="circle" percent={75} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <canvas ref={pieChartCanvas} />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={24}>
        <Col span={8}>
          <List
            className="children-list"
            size="small"
            header={
              <Level
                style={{ marginBottom: 0 }}
                left={
                  <span>
                    <Icon type="file-text" style={{ marginRight: 8 }} />
                    Executed Test Cases
                  </span>
                }
              />
            }
            bordered={true}
            dataSource={[]}
            renderItem={(item: any) => <div />}
          />
        </Col>
        <Col span={16}>Display Test Case Execution Details here.</Col>
      </Row>
    </PageContent>
  );
};

export default ExecutionResult;
