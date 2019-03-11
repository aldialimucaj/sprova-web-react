import { Breadcrumb, Spin } from 'antd';
import React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { useGetProject } from '../../api/project.api';
import ProjectContext from '../../contexts/ProjectContext';
import ProjectDetails from './ProjectDetails';
import ProjectSettings from './ProjectSettings';

interface Params {
  id: string;
}

const ProjectPage: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { isLoading, project, setProject } = useGetProject(match.params.id);

  return (
    <React.Fragment>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      {isLoading ? (
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
  );
};

export default withRouter(ProjectPage);
