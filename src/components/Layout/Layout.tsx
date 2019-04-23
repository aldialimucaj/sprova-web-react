import React from 'react';
import Header from './Header';
import './Layout.scss';
import Sider from './Sider';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="sprova-layout">
      <Header />
      <Sider />
      <div className="sprova-layout-content">{children}</div>
    </div>
  );
};

export default Layout;
