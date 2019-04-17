import CardList from '@/components/CardList';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import PageContent from '@/layout/PageContent';
import { Cycle } from '@/models/Cycle';
import { TestCase } from '@/models/TestCase';
import { Button, Col, Row } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';

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
          <CardList
            zebra={true}
            small={true}
            title={<span>Cycles</span>}
            actions={
              <Link to={`/projects/${project._id}/cycles`}>Show All</Link>
            }
            data={cycles.slice(0, 4)}
            renderItem={(cycle: Cycle) => <div>{cycle.title}</div>}
            onItemClick={(cycle: Cycle) =>
              history.push(`/projects/${project._id}/cycles/${cycle._id}`)
            }
            empty={'No cycles found.'}
          />
        </Col>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <CardList
            zebra={true}
            small={true}
            title={<span>Test Cases</span>}
            actions={
              <Link to={`/projects/${project._id}/testcases`}>Show All</Link>
            }
            data={testCases.slice(0, 4)}
            renderItem={(testCase: TestCase) => <div>{testCase.title}</div>}
            onItemClick={(testCase: TestCase) =>
              history.push(`/projects/${project._id}/testcases/${testCase._id}`)
            }
            empty={'No test cases found.'}
          />
        </Col>
      </Row>
    </PageContent>
  );
};

export default ProjectDetails;
