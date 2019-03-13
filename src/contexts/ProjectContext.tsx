import React, { Dispatch, useReducer } from 'react';
import { Project } from '../models/Project';
import { TestCase } from '../models/TestCase';

export const defaultProject: Project = {
  description: '',
  title: '',
};

const reducer = (state: ProjectState, action: any) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme,
      };

    default:
      return state;
  }
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

const defaultContext: ProjectContextValue = [initialState, (action: any) => {}];

const ProjectContext: React.Context<ProjectContextValue> = React.createContext(
  defaultContext
);

export const ProjectProvider: React.FunctionComponent = ({ children }) => {
  return (
    <ProjectContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
