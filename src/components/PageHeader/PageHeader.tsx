import { Card, Col, Row } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './PageHeader.scss';

interface Props extends RouteComponentProps {
  breadcrumb?: React.ReactNode;
  title: React.ReactNode;
  extra?: React.ReactNode;
  subTitle?: string;
}

const PageHeaderWrapper: React.FunctionComponent<Props> = ({
  breadcrumb,
  children,
  title,
  extra = [],
  subTitle,
}) => {
  return (
    <Card className="page-header">
      <Row type="flex" justify="space-between" align="top">
        <Col>
          {breadcrumb ? (
            <div style={{ marginBottom: 12 }}>{breadcrumb}</div>
          ) : null}
          <span className="header-title">{title}</span>
          <span className="header-title-sub">{subTitle}</span>
        </Col>
        <Col>{extra}</Col>
      </Row>
      {children && <div className="header-content">{children}</div>}
    </Card>
  );
};

export default withRouter(PageHeaderWrapper);
