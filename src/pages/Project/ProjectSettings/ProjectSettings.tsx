import { Col, Divider, Row } from 'antd';
import React from 'react';

const ProjectSettings: React.FunctionComponent<{}> = () => {
  return (
    <React.Fragment>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
        <Col>
          <h2 style={{ marginBottom: 0 }}>Project Settings</h2>
        </Col>
      </Row>
      <Divider />
      <div style={{ padding: 24, background: '#fff', minHeight: '90%' }}>
        Settings
      </div>
    </React.Fragment>
  );
};

export default ProjectSettings;
