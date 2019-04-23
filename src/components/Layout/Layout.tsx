import cx from 'classnames';
import React, { useState } from 'react';
import './Layout.scss';
import Sider from './Sider/Sider';
import Header from './Header/Header';

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="sprova-layout">
      <Header />
      <Sider />
      <div className="sprova-layout-content">{children}</div>
    </div>
  );
};

export default Layout;
