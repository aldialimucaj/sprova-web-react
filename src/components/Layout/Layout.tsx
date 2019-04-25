import React from 'react';
import Content from './Content';
import './Layout.scss';
import ProjectBar from './ProjectBar';
import SideMenu from './SideMenu';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="sprova-layout">
      <ProjectBar />
      <SideMenu />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
