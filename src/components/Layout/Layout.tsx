import React from 'react';
import './Layout.scss';
import Page from './Page';
import ProjectBar from './ProjectBar';
import SideMenu from './SideMenu';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="sprova-layout">
      <ProjectBar />
      <SideMenu />
      <Page>{children}</Page>
    </div>
  );
};

export default Layout;
