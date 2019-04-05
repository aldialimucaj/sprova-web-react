import { getProjects } from '@/api/project.api';
import { useFetcher } from '@/hooks/useFetcher';
import { Col, Layout, Row } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BaseHeader from './BaseHeader';
import './Header.scss';
import ProjectHeader from './ProjectHeader';
import RightContent from './RightContent';

const { Header } = Layout;

const HeaderWrapper: React.FunctionComponent<{}> = () => {
  const { data: projects } = useFetcher(getProjects);

  return (
    <Header style={{ padding: 0, zIndex: 2 }}>
      <Row type="flex" justify="center" className="navbar">
        <Col xs={24} xl={20} style={{ padding: '0 24px' }}>
          <Row type="flex" justify="end">
            <Col className="left-content">
              <Switch>
                <Route path="/projects/new" component={BaseHeader} />
                <Route
                  path="/projects/:pid"
                  render={() => <ProjectHeader projects={projects || []} />}
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
