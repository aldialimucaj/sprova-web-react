import { Cycle } from '@/models/Cycle';
import { Project } from '@/models/Project';
import { TestCase } from '@/models/TestCase';
import React, { Dispatch, useReducer } from 'react';
import { ProjectAction } from './ProjectActions';
import { reducer } from './ProjectReducer';

export const defaultProject: Project = {
  description: '',
  title: '',
};

export interface ProjectState {
  project: Project;
  testCases: TestCase[];
  cycles: Cycle[];
}

export const initialState: ProjectState = {
  project: defaultProject,
  testCases: [],
  cycles: [],
};

type ProjectContextValue = [ProjectState, Dispatch<any>];

const defaultContext: ProjectContextValue = [
  initialState,
  (action: ProjectAction) => {},
];

export const ProjectContext: React.Context<
  ProjectContextValue
> = React.createContext(defaultContext);

export const ProjectProvider: React.FunctionComponent = ({ children }) => {
  return (
    <ProjectContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ProjectContext.Provider>
  );
};
