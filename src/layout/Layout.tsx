import { Breadcrumb, Layout } from 'antd';
import React, { useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
const { Content, Footer } = Layout;

const LayoutWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout tagName="header" style={{ minHeight: '100vh' }}>
      <SideMenu collapsed={collapsed} />
      <Layout tagName="main">
        <Header
          sidebarCollapsed={collapsed}
          toggleSidebar={() => setCollapsed(!collapsed)}
        />
        <Content tagName="main" style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
            <Breadcrumb.Item>Cycles</Breadcrumb.Item>
          </Breadcrumb>
          <div id="content" style={{ padding: 24, background: '#fff', minHeight: "90%" }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
