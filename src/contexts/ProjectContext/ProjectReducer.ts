import { ProjectAction, SET_PROJECT } from './ProjectActions';
import { ProjectState } from './ProjectContext';

export const reducer = (state: ProjectState, action: ProjectAction) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.project,
      };

    default:
      return state;
  }
};
