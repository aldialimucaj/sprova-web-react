import { Col, Layout, Row } from 'antd';
import React, { useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
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
        <Content id="content" tagName="main" style={{ margin: '0 24px' }}>
          <Row type="flex" justify="center">
            <Col span={18}>{children}</Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
