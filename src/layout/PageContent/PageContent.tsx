import { Col, Layout, Row } from 'antd';
import React from 'react';
const { Content } = Layout;
import './PageContent.scss';

interface Props {
  header?: React.ReactNode;
}

const PageContent: React.FunctionComponent<Props> = ({ children, header }) => {
  return (
    <Content>
      {header && (
        <Row type="flex" justify="center" className="page-content-header">
          <Col xs={24} xl={20}>
            {header}
          </Col>
        </Row>
      )}
      <Row type="flex" justify="center">
        <Col xs={24} xl={20} style={{ padding: '24px 24px' }}>
          {children}
        </Col>
      </Row>
    </Content>
  );
};

export default PageContent;
