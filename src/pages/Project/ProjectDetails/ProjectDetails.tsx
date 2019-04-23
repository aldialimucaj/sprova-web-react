import CardList from '@/components/CardList';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import PageContent from '@/layout/PageContent';
import { Cycle } from '@/models/Cycle';
import { TestCase } from '@/models/TestCase';
import { Button, Col, Row, Divider, Icon } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import Level from '@/components/Level';
import Card from '@/components/Card';
import Modal from '@/components/Modal';

const ProjectDetails: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [{ cycles, project, testCases }] = useContext(ProjectContext);

  const [isCycleModalOpen, setIsCycleModalOpen] = useState(false);

  if (!project) {
    return <Redirect to="/projects" />;
  }

  return (
    <PageContent
      header={<PageHeader title={project.title} subTitle="Overview" />}
    >
      <Level>
        <h3>Cycles</h3>
        <Button onClick={() => setIsCycleModalOpen(true)} type="primary">
          New
        </Button>
      </Level>
      <Divider />
      <Row gutter={24}>
        {cycles.slice(0, 4).map((cycle: Cycle) => (
          <Col>
            <Card>
              <h3>{cycle.title}</h3>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal open={isCycleModalOpen} onClose={() => setIsCycleModalOpen(false)}>
        Test
      </Modal>
      <Divider />
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
