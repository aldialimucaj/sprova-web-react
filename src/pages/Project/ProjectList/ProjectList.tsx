import { getProjects } from '@/api/project.api';
import SectionHeader from '@/components/SectionHeader';
import { useFetcher } from '@/hooks/useFetcher';
import { Project } from '@/models/Project';
import { Button, Card, Col, Empty, Row, Spin } from 'antd';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';

const ProjectList: React.FunctionComponent = () => {
  const { data: projects, isLoading } = useFetcher(getProjects);

  return isLoading ? (
    <Spin />
  ) : (
    <Fragment>
      <SectionHeader
        title="Projects"
        extra={<Link to="/projects/new">New Project</Link>}
      />

      {projects && projects.length > 0 ? (
        <Row gutter={16}>
          {projects.map((project: Project, index: number) => (
            <Col span={6} key={index}>
              <Link to={`/projects/${project._id}`}>
                <Card className="clickable-card">
                  <h3>{project.title}</h3>
                  <p style={{ marginBottom: 0 }}>{project.description}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={'No Projects found'}>
          <Link to="/projects/new">
            <Button type="primary">Create Now</Button>
          </Link>
        </Empty>
      )}
    </Fragment>
  );
};

export default ProjectList;
