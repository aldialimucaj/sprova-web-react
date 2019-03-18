import { Col, Divider, Row } from 'antd';
import React from 'react';

interface Params {
  divider?: boolean;
  extra?: React.ReactNode;
  size?: 'big' | 'medium' | 'small';
  title: string | JSX.Element;
}

const SectionHeader: React.FunctionComponent<Params> = ({
  divider = true,
  extra = null,
  size = 'big',
  title,
}) => {
  const header = (text: string) => {
    switch (size) {
      case 'big':
        return <h2 style={{ marginBottom: 0 }}>{text}</h2>;
      case 'medium':
        return <h3 style={{ marginBottom: 0 }}>{text}</h3>;
      case 'small':
        return <h4 style={{ marginBottom: 0 }}>{text}</h4>;
    }
  };
  return (
    <React.Fragment>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
        <Col>{typeof title === 'string' ? header(title) : title}</Col>
        <Col>{extra}</Col>
      </Row>
      {divider ? <Divider /> : null}
    </React.Fragment>
  );
};

export default SectionHeader;
