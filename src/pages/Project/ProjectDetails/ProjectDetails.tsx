import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getProject } from '../../../api/project.api';
import { Project } from '../../../models/Project';

interface Params {
  id: string;
}

const ProjectDetails: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const defaultProject: Project = { title: '', description: '' };

  const [project, setProject] = useState<Project>(defaultProject);
  const fetchData = async () => {
    try {
      const data = await getProject(match.params.id);
      setProject(data);
    } catch (e) {
      // TODO: take care of no data error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
