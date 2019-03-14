import {
  ProjectAction,
  RESET_PROJECT,
  SET_PROJECT,
  SET_TEST_CASES,
} from './ProjectActions';
import { ProjectState } from './ProjectContext';

export const reducer = (state: ProjectState, action: ProjectAction) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.project,
      };
    case RESET_PROJECT:
      return {
        ...state,
        project: action.project,
      };
    case SET_TEST_CASES: {
      return {
        ...state,
        testCases: action.testCases,
      };
    }

    default:
      return state;
  }
};
