import { Breadcrumb } from 'antd';
import React from 'react';
import { useLayout } from '../../hooks';

const Project: React.FunctionComponent<{}> = ({ children }) => {
  useLayout('Project');
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: '#fff', minHeight: '90%' }}>
        Project page
      </div>
    </React.Fragment>
  );
};

export default Project;
