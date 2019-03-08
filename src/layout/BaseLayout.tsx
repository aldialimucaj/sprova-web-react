import { Breadcrumb, Layout } from 'antd';
import React, { useState } from 'react';
import { Header, SideMenu } from './project';
const { Content } = Layout;

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
        <Content id="content" tagName="main" style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
            <Breadcrumb.Item>Cycles</Breadcrumb.Item>
          </Breadcrumb>

          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
