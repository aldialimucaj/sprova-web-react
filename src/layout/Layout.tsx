import { Col, Layout, Row } from 'antd';
import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
const { Content } = Layout;

const LayoutWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Layout tagName="header" style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout tagName="main">
        <Header />
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
