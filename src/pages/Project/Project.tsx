import React from 'react';
import { useLayout } from '../../hooks';

const Project: React.FunctionComponent<{}> = ({ children }) => {
  useLayout('Project');
  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '90%' }}>
      Project page
    </div>
  );
};

export default Project;
