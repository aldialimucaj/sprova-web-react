import { Card, Col, Row, Statistic } from 'antd';
import Chart from 'chart.js';
import React, { useEffect } from 'react';

const OverviewTab: React.FunctionComponent = () => {
  const pieChartCanvas = React.createRef<HTMLCanvasElement>();

  let pieChart: Chart;

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
  }, [
    /* TODO: Externalize data and add to dependencies */
  ]);
  return (
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
