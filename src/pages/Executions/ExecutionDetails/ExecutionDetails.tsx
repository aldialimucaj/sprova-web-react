import { getExecution } from '@/api/execution.api';
import Level from '@/components/Level';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFetcher } from '@/hooks/useFetcher';
import { parseQuery } from '@/utils';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Icon,
  List,
  Row,
  Statistic,
  Tooltip,
} from 'antd';
import Chart from 'chart.js';
import React, { Fragment, useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './ExecutionDetails.scss';

interface Params {
  pid: string;
  ecid: string;
}

const ExecutionResult: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  location,
}) => {
  const { contextId } = parseQuery(location);

  const pieChartCanvas = React.createRef<HTMLCanvasElement>();

  let pieChart: Chart;

  const [{ project }] = useContext(ProjectContext);

  const { data: execution, error, isLoading } = useFetcher(
    getExecution,
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
    pieChart = new Chart(pieChartCanvas.current!, {
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
        title: {
          display: true,
          text: 'Test Execution Results',
        },
      },
    });
  }, []);

  return (
    <Fragment>
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
      />
      <Row gutter={24}>
        <Col span={16}>
          <Row gutter={24} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic title="Total Number of Tests" value={118} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="Execution Duration" value="04:33:12" />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="Total Number of Tests" value={118} />
              </Card>
            </Col>
          </Row>
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
            renderItem={(item: any) => <List.Item />}
          />
        </Col>
        <Col span={8}>
          <Card>
            <canvas ref={pieChartCanvas} width="400" height="400" />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ExecutionResult;
