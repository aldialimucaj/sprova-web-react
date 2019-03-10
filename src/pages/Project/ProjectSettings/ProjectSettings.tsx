import React from 'react';
import SectionHeader from '../../../components/SectionHeader';

const ProjectSettings: React.FunctionComponent<{}> = () => {
  return (
    <React.Fragment>
      <SectionHeader title="Project Settings" />
      <div style={{ padding: 24, background: '#fff', minHeight: '90%' }}>
        Settings
      </div>
    </React.Fragment>
  );
};

export default ProjectSettings;
