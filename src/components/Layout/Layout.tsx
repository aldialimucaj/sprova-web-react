import { ProjectContext } from '@/contexts/ProjectContext';
import React, { useContext } from 'react';
import Content from './Content';
import './Layout.scss';
import ProjectBar from './ProjectBar';
import SideMenu from './SideMenu';

const Layout: React.FunctionComponent = ({ children }) => {
  const { currentProject, error, isProjectsLoading } = useContext(
    ProjectContext
  );
  return isProjectsLoading || typeof currentProject === undefined ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className="sprova-layout">
      <ProjectBar />
      <SideMenu />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
