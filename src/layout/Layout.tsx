import { Col, Layout, Row } from 'antd';
import React from 'react';
import Content from './Content';
import Header from './Header';
import SideMenu from './SideMenu';

const LayoutWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Layout tagName="header" style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout tagName="main">
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
