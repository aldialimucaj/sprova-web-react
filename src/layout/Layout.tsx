import { Layout } from 'antd';
import React from 'react';
import Content from './Content';
import Header from './Header';
import SideMenu from './SideMenu';

const LayoutWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Layout>
      <SideMenu />
      <Layout
        style={{ marginLeft: 80, backgroundColor: 'white' }}
      >
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
