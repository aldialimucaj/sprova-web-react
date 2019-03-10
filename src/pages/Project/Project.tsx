import { Breadcrumb, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { getProject } from '../../api/project.api';
import ProjectContext from '../../contexts/ProjectContext';
import { Project } from '../../models/Project';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

interface Params {
  id: string;
}

const ProjectPage: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    try {
      const fetchedProject = await getProject(match.params.id);
      setProject(fetchedProject);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return error === '' ? (
    <React.Fragment>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      {project === null ? (
        <Spin />
      ) : (
        <ProjectContext.Provider value={{ project, setProject }}>
          <Route path="/projects/:id" exact={true} component={ProjectDetails} />
          <Route
            path="/projects/:id/settings"
            exact={true}
            component={ProjectSettings}
          />
        </ProjectContext.Provider>
      )}
    </React.Fragment>
  ) : (
    <Redirect to="/projects" />
  );
};

export default withRouter(ProjectPage);
