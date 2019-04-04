import { Layout } from 'antd';
import React, { useState } from 'react';
import Content from './Content';
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
      <Layout style={{ backgroundColor: 'white' }}>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
