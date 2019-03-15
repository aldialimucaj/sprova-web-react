import { Card, Col, List, Row } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/SectionHeader';
import { ProjectContext } from '../../../contexts/ProjectContext';
import { TestCase } from '../../../models/TestCase';

const ProjectDetails: React.FunctionComponent = () => {
  const [{ cycles, project, testCases }] = useContext(ProjectContext);

  return (
    <React.Fragment>
      <SectionHeader title="Overview" />
      <Row gutter={16}>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <Card bordered={false}>
            <SectionHeader
              title="Cycles"
              divider={false}
              extra={
                <Link to={`/projects/${project._id}/cycles`}>Show all</Link>
              }
            />
            <List
              itemLayout="horizontal"
              dataSource={cycles.slice(0, 4)}
              renderItem={(item: any) => <List.Item>item.title</List.Item>}
            />
          </Card>
        </Col>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <Card bordered={false}>
            <SectionHeader
              title="Test Cases"
              divider={false}
              extra={
                <Link to={`/projects/${project._id}/testcases`}>Show all</Link>
              }
            />
            <List
              itemLayout="horizontal"
              dataSource={testCases.slice(0, 4)}
              renderItem={(testCase: TestCase) => (
                <List.Item>{testCase.title}</List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProjectDetails;
