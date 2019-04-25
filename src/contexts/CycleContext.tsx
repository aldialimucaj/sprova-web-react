import { getProjects } from '@/api/project.api';
import { Project } from '@/models/Project';
import { findById } from '@/utils';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

const CURRENT_CYCLE_ID = 'currentCycleId';

interface CycleContext {
  currentCycle: Project | null;
  error: string | null;
  isProjectsLoading: boolean;
  onSelectProject: (project: Project) => void;
  onRemoveProject: (project: Project) => void;
  onAddProject: (project: Project) => void;
  projects: Project[];
}

const initialContext: CycleContext = {
  currentCycle: null,
  error: null,
  isProjectsLoading: false,
  onAddProject: () => {},
  onRemoveProject: () => {},
  onSelectProject: () => {},
  projects: [],
};

const CycleContext = React.createContext<CycleContext>(initialContext);

const CycleProvider: React.FunctionComponent = ({ children }) => {
  const [currentCycle, setCurrentProject] = useState<Project | null>(null);
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
        const _currentCycle = findCurrentProject(fetchedProjects);
        if (_currentCycle) {
          setCurrentProject(_currentCycle);
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
    const currentCycleId = localStorage.getItem(CURRENT_CYCLE_ID);
    return currentCycleId
      ? findById(_projects, currentCycleId) || firstProject
      : firstProject;
  };

  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleRemoveProject = (project: Project) => {
    setProjects(_.without(projects, project));
  };

  const handleSelectProject = (project: Project) => {
    localStorage.setItem(CURRENT_CYCLE_ID, project._id);
    setCurrentProject(project);
  };

  return (
    <CycleContext.Provider
      value={{
        currentCycle,
        error,
        isProjectsLoading,
        onAddProject: handleAddProject,
        onRemoveProject: handleRemoveProject,
        onSelectProject: handleSelectProject,
        projects,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export { CycleProvider, CycleContext };
