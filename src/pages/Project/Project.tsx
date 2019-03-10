import React from 'react';
import { Route } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

const Project: React.FunctionComponent<{}> = () => {
  return (
    <React.Fragment>
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
