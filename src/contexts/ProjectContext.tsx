import { getProjects } from '@/api/project.api';
import { Project } from '@/models/Project';
import { findById } from '@/utils';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

const CURRENT_PROJECT_ID = 'currentProjectId';

interface ProjectContext {
  currentProject: Project | null;
  error: string | null;
  isProjectsLoading: boolean;
  onSelectProject: (project: Project) => void;
  onRemoveProject: (project: Project) => void;
  onAddProject: (project: Project) => void;
  projects: Project[];
}

const initialContext: ProjectContext = {
  currentProject: null,
  error: null,
  isProjectsLoading: false,
  onAddProject: () => {},
  onRemoveProject: () => {},
  onSelectProject: () => {},
  projects: [],
};

const ProjectContext = React.createContext<ProjectContext>(initialContext);

const ProjectProvider: React.FunctionComponent = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProjectsLoading, setIsProjectsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsProjectsLoading(true);
      setError('');

      try {
        const fetchedProjects = await getProjects();
        if (fetchedProjects) {
          setProjects(fetchedProjects);
        }
        const _currentProject = findCurrentProject(fetchedProjects);
        if (_currentProject) {
          setCurrentProject(_currentProject);
        }
      } catch (error) {
        setError(error);
      }

      setIsProjectsLoading(false);
    };

    fetchProjects();
  }, []);

  const findCurrentProject = (_projects: Project[]): Project | null => {
    if (!_projects || _projects.length === 0) {
      return null;
    }
    const firstProject = _projects[0];
    const currentProjectId = localStorage.getItem(CURRENT_PROJECT_ID);
    return currentProjectId
      ? findById(_projects, currentProjectId) || firstProject
      : firstProject;
  };

  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleRemoveProject = (project: Project) => {
    setProjects(_.without(projects, project));
  };

  const handleSelectProject = (project: Project) => {
    localStorage.setItem(CURRENT_PROJECT_ID, project._id);
    setCurrentProject(project);
  };

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        error,
        isProjectsLoading,
        onAddProject: handleAddProject,
        onRemoveProject: handleRemoveProject,
        onSelectProject: handleSelectProject,
        projects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
