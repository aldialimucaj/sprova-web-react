import React, { useContext } from 'react';
import ProjectContext from '../../../contexts/ProjectContext';

const ProjectDetails: React.FunctionComponent<{}> = () => {
  const { project } = useContext(ProjectContext);

  return (
    <div
      style={{
        background: '#fff',
        minHeight: '90%',
        padding: 24,
      }}
    >
      {project.title}
      <br />
      {project.description}
    </div>
  );
};

export default ProjectDetails;
