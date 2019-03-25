import { Col, Row } from 'antd';
import React from 'react';

interface Props {
  left: JSX.Element;
  middle?: JSX.Element;
  right?: JSX.Element;
  style?: any;
}

const Level: React.FunctionComponent<Props> = ({
  left,
  middle,
  right,
  style,
}) => {
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ marginBottom: 24, ...style }}
      type="flex"
    >
      <Col>{left}</Col>
      <Col>{middle}</Col>
      <Col>{right}</Col>
    </Row>
  );
};

export default Level;
