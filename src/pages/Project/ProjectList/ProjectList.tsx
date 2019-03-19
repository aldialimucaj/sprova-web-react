import { getProjects } from '@/api/project.api';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Project } from '@/models/Project';
import { Button, Card, Col, Divider, Empty, Icon, Row, Spin } from 'antd';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';
import SectionHeader from '@/components/SectionHeader';

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
                    <p style={{ marginBottom: 0 }}>#DESCRIPTION#</p>
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
