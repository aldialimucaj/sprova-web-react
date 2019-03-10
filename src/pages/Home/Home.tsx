import { Button, Card, Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/project.api';
import { Project } from '../../models/Project';
import './Home.scss';

const Home: React.FunctionComponent<{}> = () => {
  const [projects, setProjects] = useState<Project[]>(new Array<Project>());
  const fetchData = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      // TODO: take care of no data error
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        {projects.map((project: Project, index: number) => (
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
