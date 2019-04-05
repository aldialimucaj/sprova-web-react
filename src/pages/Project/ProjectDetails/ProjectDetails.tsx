import Level from '@/components/Level';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Cycle } from '@/models/Cycle';
import { TestCase } from '@/models/TestCase';
import { Col, Icon, List, Row } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import PageContent from '@/layout/PageContent';

const ProjectDetails: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [{ cycles, project, testCases }] = useContext(ProjectContext);

  if (!project) {
    return <Redirect to="/projects" />;
  }

  return (
    <PageContent
      header={<PageHeader title={project.title} subTitle="Overview" />}
    >
      <Row gutter={16}>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <List
            className="children-list"
            size="small"
            header={
              <Level
                style={{ marginBottom: 0 }}
                left={
                  <span>
                    <Icon type="clock-circle" style={{ marginRight: 8 }} />
                    Cycles
                  </span>
                }
                right={
                  <Link to={`/projects/${project._id}/cycles`}>Show All</Link>
                }
              />
            }
            bordered={true}
            dataSource={cycles.slice(0, 4)}
            renderItem={(cycle: Cycle) => (
              <List.Item
                onClick={() =>
                  history.push(`/projects/${project._id}/cycles/${cycle._id}`)
                }
              >
                {cycle.title}
              </List.Item>
            )}
          />
        </Col>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <List
            className="children-list"
            size="small"
            header={
              <Level
                style={{ marginBottom: 0 }}
                left={
                  <span>
                    <Icon type="clock-circle" style={{ marginRight: 8 }} />
                    Test Cases
                  </span>
                }
                right={
                  <Link to={`/projects/${project._id}/testcases`}>
                    Show All
                  </Link>
                }
              />
            }
            bordered={true}
            dataSource={testCases.slice(0, 4)}
            renderItem={(testCase: TestCase) => (
              <List.Item
                onClick={() =>
                  history.push(
                    `/projects/${project._id}/testcases/${testCase._id}`
                  )
                }
              >
                {testCase.title}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageContent>
  );
};

export default ProjectDetails;
