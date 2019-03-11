import React from 'react';
import { Project } from '../models/Project';

export interface ProjectContextValue {
  project: Project;
  setProject: (project: Project) => void;
}

export const defaultProject: Project = {
  description: '',
  title: '',
};

const defaultValue: ProjectContextValue = {
  project: defaultProject,
  setProject: () => {},
};

const ProjectContext: React.Context<ProjectContextValue> = React.createContext(
  defaultValue
);

export default ProjectContext;
