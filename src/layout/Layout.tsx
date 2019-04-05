import { Layout } from 'antd';
import React, { useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';

const LayoutWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu
        collapsed={isSidebarCollapsed}
        handleCollapse={(collapsed: boolean) =>
          setIsSidebarCollapsed(collapsed)
        }
      />
      <Layout>
        <Header />
        {children}
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
