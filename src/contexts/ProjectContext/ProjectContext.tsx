import React, { Dispatch, useReducer } from 'react';
import { Project } from '../../models/Project';
import { TestCase } from '../../models/TestCase';
import { ProjectAction } from './ProjectActions';
import { reducer } from './ProjectReducer';

export const defaultProject: Project = {
  description: '',
  title: '',
};

export interface ProjectState {
  project: Project;
  testCases: TestCase[];
}

export const initialState: ProjectState = {
  project: defaultProject,
  testCases: [],
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