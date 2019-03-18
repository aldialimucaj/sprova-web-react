import { Col, Row } from 'antd';
import React from 'react';

interface Props {
  left: JSX.Element;
  right?: JSX.Element;
}

const Level: React.FunctionComponent<Props> = ({ left, right }) => {
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ marginBottom: 24 }}
      type="flex"
    >
      <Col>{left}</Col>
      <Col>{right}</Col>
    </Row>
  );
};

export default Level;
