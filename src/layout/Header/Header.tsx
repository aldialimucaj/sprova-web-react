import { Col, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getProjects } from '../../api/project.api';
import { Project } from '../../models/Project';
import BaseHeader from './BaseHeader';
import './Header.scss';
import ProjectHeader from './ProjectHeader';
import RightContent from './RightContent';

const { Header } = Layout;

const HeaderWrapper: React.FunctionComponent<{}> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchData = async () => {
    try {
      const fetchedProjects = await getProjects(5);
      setProjects(fetchedProjects);
    } catch (e) {
      // TODO: take care of no data error
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Header style={{ padding: 0 }}>
      <Row type="flex" justify="center" className="navbar">
        <Col xs={24} xl={20} style={{ padding: '0 24px' }}>
          <Row type="flex" justify="end">
            <Col className="left-content">
              <Switch>
                <Route path="/projects/new" component={BaseHeader} />
                <Route
                  path="/projects/:id"
                  render={() => <ProjectHeader projects={projects} />}
                />
                <Route component={BaseHeader} />
              </Switch>
            </Col>
            <Col>
              <RightContent />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderWrapper;
