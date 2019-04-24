import React from 'react';
import './Layout.scss';
import ProjectBar from './ProjectBar';
import SideMenu from './SideMenu';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="sprova-layout">
      <ProjectBar />
      <SideMenu />
      <div className="sprova-layout-content">{children}</div>
    </div>
  );
};

export default Layout;
