import { Breadcrumb } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

const Project: React.FunctionComponent<{}> = () => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      <Route path="/projects/:id" exact={true} component={ProjectDetails} />
      <Route
        path="/projects/:id/settings"
        exact={true}
        component={ProjectSettings}
      />
    </React.Fragment>
  );
};

export default Project;
