import { Button, Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../../hooks';
import { Project } from '../../models/Project';
import './Home.scss';

const Home: React.FunctionComponent<{}> = () => {
  useLayout('Base');
  const mockProjects: Project[] = [
    {
      _id: '0',
      description: 'Description 1',
      owner: '1',
      title: 'Project 1',
    },
    {
      _id: '1',
      description: 'Description 2',
      owner: '1',
      title: 'Project 2',
    },
    {
      _id: '2',
      description: 'Description 3',
      owner: '1',
      title: 'Project 3',
    },
  ];

  return (
    <React.Fragment>
      <Row type="flex" justify="space-between" align="bottom">
        <Col>
          <h2 style={{ marginTop: 16, marginBottom: 0 }}>Projects</h2>
        </Col>
        <Col>
          <Button size="small">
            <Link to="/new">New Project</Link>
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        {mockProjects.map((project: Project, index: number) => (
          <Col span={6} key={index}>
            <Link to={`/projects/${project._id}`}>
              <Card bordered={false} className="clickable-card">
                <h3>{project.title}</h3>
                <p style={{ marginBottom: 0 }}>{project.description}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Home;
