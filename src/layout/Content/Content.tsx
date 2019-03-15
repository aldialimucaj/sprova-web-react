import { Col, Layout, Row } from 'antd';
import React from 'react';
const { Content } = Layout;

const ContentWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Content tagName="section">
      <Row type="flex" justify="center">
        <Col xs={24} xl={20} style={{ padding: '24px 24px' }}>
          {children}
        </Col>
      </Row>
    </Content>
  );
};

export default ContentWrapper;
