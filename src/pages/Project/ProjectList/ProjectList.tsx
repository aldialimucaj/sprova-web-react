import { getProjects } from '@/api/project.api';
import Card from '@/components/Card';
import PageHeader from '@/components/PageHeader';
import { useFetcher } from '@/hooks/useFetcher';
import PageContent from '@/layout/PageContent';
import { Project } from '@/models/Project';
import { Alert, Breadcrumb, Button, Col, Empty, Icon, Row, Spin } from 'antd';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './ProjectList.scss';

const ProjectList: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const { data: projects, isLoading, error } = useFetcher(getProjects);

  return isLoading ? (
    <Spin />
  ) : error ? (
    <Alert message="Something went wrong" description={error} type="error" />
  ) : (
    <PageContent
      header={
        <PageHeader
          title="Choose a Project"
          breadcrumb={
            <Breadcrumb>
              <Breadcrumb.Item>Projects</Breadcrumb.Item>
            </Breadcrumb>
          }
          extra={
            <Link to={`/projects/new`}>
              <Button type="primary">
                <Icon type="plus" /> New
              </Button>
            </Link>
          }
        />
      }
    >
      {projects && projects.length > 0 ? (
        <Row gutter={16}>
          {projects.map((project: Project, index: number) => (
            <Col span={6} key={index}>
              <Card onClick={() => history.push(`/projects/${project._id}`)}>
                <h3>{project.title}</h3>
                <p style={{ marginBottom: 0 }}>#DESCRIPTION#</p>
              </Card>
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
    </PageContent>
  );
};

export default withRouter(ProjectList);
