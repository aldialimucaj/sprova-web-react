import { Project } from '../../models/Project';
import { defaultProject } from './ProjectContext';

export const SET_PROJECT = 'SET_PROJECT';

export type ProjectAction = SetProjectAction;

export interface SetProjectAction {
  type: string;
  project: Project;
}

export interface ResetProjectAction {
  type: string;
  project: Project;
}

export const setProject = (project: Project): SetProjectAction => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const resetProject = (): ResetProjectAction => {
  return {
    type: SET_PROJECT,
    project: defaultProject
  };
};
