import { Card, Col, Icon, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../../hooks';
import { Project } from '../../models/Project';
import './Home.scss';

const Home: React.FunctionComponent<{}> = () => {
  useLayout('Base');
  const mockProjects: Project[] = [
    {
      description: 'Description 1',
      id: '0',
      owner: '1',
      title: 'Project 1',
    },
    {
      description: 'Description 2',
      id: '1',
      owner: '1',
      title: 'Project 2',
    },
    {
      description: 'Description 3',
      id: '2',
      owner: '1',
      title: 'Project 3',
    },
  ];

  return (
    <React.Fragment>
      <h2 style={{ marginTop: 16, marginBottom: 16 }}>Projects</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Link to="/new">
            <Card bordered={false} className="add-project-card clickable-card">
              <Icon type="plus" style={{ fontSize: 24 }} />
            </Card>
          </Link>
        </Col>
        {mockProjects.map((project: Project, index: number) => (
          <Col span={6} key={index}>
            <Link to={`/projects/${project.id}`}>
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
