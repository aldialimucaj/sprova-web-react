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
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer tagName="main" style={{ textAlign: 'center' }}>
          Sprova ©2019 Licensed by MIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
