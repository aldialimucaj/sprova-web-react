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
    <Card title="Projects" extra={<Link to="/projects/new">New Project</Link>}>
      {projects.map((project: Project, index: number) => (
        <Card.Grid>
          <Link to={`/projects/${project._id}`}>
            <h3>{project.title}</h3>
            <p style={{ marginBottom: 0 }}>{project.description}</p>
          </Link>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default Home;
