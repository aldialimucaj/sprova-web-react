import { Col, Divider, Row } from 'antd';
import React from 'react';

interface Params {
  divider?: boolean;
  title: string;
  extra?: React.ReactNode;
}

const SectionHeader: React.FunctionComponent<Params> = ({
  divider = true,
  extra = null,
  title,
}) => {
  return (
    <React.Fragment>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
        <Col>
          <h2 style={{ marginBottom: 0 }}>{title}</h2>
        </Col>
        <Col>{extra}</Col>
      </Row>
      {divider ? <Divider /> : null}
    </React.Fragment>
  );
};

export default SectionHeader;
