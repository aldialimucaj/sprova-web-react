import { Col, Layout, Row } from 'antd';
import React from 'react';
const { Content } = Layout;

const ContentWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Content id="content" tagName="main" style={{ margin: '24px 24px' }}>
      <Row type="flex" justify="center">
        <Col span={18}>{children}</Col>
      </Row>
    </Content>
  );
};

export default ContentWrapper;
