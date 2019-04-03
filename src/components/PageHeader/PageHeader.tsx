import { Card, Col, Divider, Icon, PageHeader, Row, Breadcrumb } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './PageHeader.scss';

interface Props extends RouteComponentProps {
  breadcrumb?: React.ReactNode;
  title: React.ReactNode;
  extra?: React.ReactNode;
  subTitle?: string;
}

const PageHeaderWrapper: React.FunctionComponent<Props> = ({
  breadcrumb,
  title,
  extra = [],
  subTitle,
}) => {
  return (
    <Card className="page-header">
      <Row
        className="header-row"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col>
          {breadcrumb ? (
            <div style={{ marginBottom: 12 }}>{breadcrumb}</div>
          ) : null}
          <span className="header-title">{title}</span>
          <span className="header-title-sub">{subTitle}</span>
        </Col>
        <Col>{extra}</Col>
      </Row>
    </Card>
  );
};

export default withRouter(PageHeaderWrapper);
