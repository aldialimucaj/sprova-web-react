import { getProjects } from '@/api/project.api';
import Level from '@/components/Level';
import { useFetcher } from '@/hooks/useFetcher';
import { Project } from '@/models/Project';
import { Button, Card, Col, Divider, Empty, Icon, Row, Spin } from 'antd';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';

const ProjectList: React.FunctionComponent = () => {
  const { data: projects, isLoading } = useFetcher(getProjects);

  return isLoading ? (
    <Spin />
  ) : (
    <Fragment>
      <Level
        left={<span style={{ fontSize: 18 }}>Projects</span>}
        right={
          <Link to={`/projects/new`}>
            <Button type="primary">
              <Icon type="plus" /> New
            </Button>
          </Link>
        }
      />
      <Divider />
      {projects && projects.length > 0 ? (
        <Row gutter={16}>
          {projects.map((project: Project, index: number) => (
            <Col span={6} key={index}>
              <Link to={`/projects/${project._id}`}>
                <Card className="clickable-card">
                  <h3>{project.title}</h3>
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
