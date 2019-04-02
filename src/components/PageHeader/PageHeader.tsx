import { Card, Col, Divider, Icon, PageHeader, Row } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './PageHeader.scss';

interface Props extends RouteComponentProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
  navIcon?: React.ReactNode;
  subTitle?: string;
  url?: string;
}

const PageHeaderWrapper: React.FunctionComponent<Props> = ({
  history,
  title,
  extra = [],
  navIcon,
  url,
  subTitle,
}) => {
  const icon = navIcon || <Icon type="arrow-left" />;

  return (
    <Card className="page-header">
      <Row
        className="header-row"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col>
          {url ? (
            <span className="nav-icon">
              <Link to={url}>{icon}</Link>
              <Divider style={{ margin: '0 12px' }} type="vertical" />
            </span>
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
