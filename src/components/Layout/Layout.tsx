import React from 'react';
import './Layout.scss';
import Page from './Page';
import ProjectBar from './ProjectBar';
import Sider from './Sider';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="sprova-layout">
      <ProjectBar />
      <Sider />
      <Page>{children}</Page>
    </div>
  );
};

export default Layout;
