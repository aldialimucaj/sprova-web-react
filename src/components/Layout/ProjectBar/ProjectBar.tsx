import { logout } from '@/api/auth.api';
import { ProjectContext } from '@/contexts/ProjectContext';
import { UserContext } from '@/contexts/UserContext';
import { Project } from '@/models/Project';
import { Icon } from 'antd';
import React, { Fragment, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './ProjectBar.scss';
import ProjectBarItem from './ProjectBarItem';

const ProjectBar: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const { currentProject, onSelectProject, projects } = useContext(
    ProjectContext
  );
  const { onLogout } = useContext(UserContext);

  const handleProjectSelect = (project: Project) => {
    onSelectProject(project);
    history.push(`/projects/${project._id}`);
  };

  const getFirstCharCapitalized = (s: string) =>
    s.substring(0, 1).toUpperCase() || '?';

  const signout = () => {
    logout();
    onLogout();
    history.push('/login');
  };

  return (
    <Fragment>
      <div className="sprova-projectbar">
        <div className="sprova-projectbar-top">
          {projects &&
            projects.map((project: Project) => (
              <ProjectBarItem
                key={project._id}
                onClick={() => handleProjectSelect(project)}
                selected={
                  !!currentProject && currentProject._id === project._id
                }
                tooltip={project.title}
              >
                {getFirstCharCapitalized(project.title)}
              </ProjectBarItem>
            ))}
          <ProjectBarItem
            onClick={() => history.push(`/projects/new`)}
            tooltip="Create Project"
          >
            +
          </ProjectBarItem>
        </div>

        <div className="sprova-projectbar-bottom">
          <ProjectBarItem tooltip="Account">
            <Icon type="user" />
          </ProjectBarItem>
          <ProjectBarItem tooltip="Settings">
            <Icon type="setting" />
          </ProjectBarItem>
          <ProjectBarItem tooltip="Sign Out" onClick={signout}>
            <Icon type="logout" />
          </ProjectBarItem>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(ProjectBar);
