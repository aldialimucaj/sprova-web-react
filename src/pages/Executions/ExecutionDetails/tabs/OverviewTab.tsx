import { Execution } from '@/models/Execution';
import { ExecutionContext } from '@/models/ExecutionContext';
import { formatDuration } from '@/utils/formatDuration';
import { Card, Col, Row, Statistic } from 'antd';
import Chart from 'chart.js';
import _ from 'lodash';
import React, { useEffect } from 'react';

interface Props {
  executions: Execution[];
  context: ExecutionContext;
}

const OverviewTab: React.FunctionComponent<Props> = ({
  context,
  executions,
}) => {
  const pieChartCanvas = React.createRef<HTMLCanvasElement>();

  const getExecutionDuration = () => {
    const from = new Date(context.createdAt);
    const to = new Date(context.finishedAt!);
    return formatDuration(from, to);
  };

  useEffect(() => {
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
        title: {
          display: true,
          text: 'Test Execution Results',
        },
      },
    });
  }, [
    /* TODO: Externalize data and add to dependencies */
  ]);
  return (
    <Row gutter={24}>
      <Col span={16}>
        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Number of Tests"
                value={executions.length}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Execution Duration"
                value={getExecutionDuration()}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Number of Tests" value={118} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Card>
          <canvas ref={pieChartCanvas} width="400" height="400" />
        </Card>
      </Col>
    </Row>
  );
};

export default OverviewTab;
