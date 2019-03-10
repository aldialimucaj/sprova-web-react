import { Card, Col, Divider, Icon, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { getProjects } from '../../api/project.api';
import { Project } from '../../models/Project';
import './Home.scss';

const Home: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
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

  const selectProject = (id: string) => {
    history.push(`/projects/${id}`);
  };

  return (
    <React.Fragment>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
        <Col>
          <h2 style={{ marginBottom: 0 }}>Projects</h2>
        </Col>
        <Col>
          <Link to="/projects/new">New Project</Link>
        </Col>
      </Row>
      <Divider />
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
    </React.Fragment>
  );
};

export default withRouter(Home);
