import {
  ADD_CYCLE,
  ADD_TEST_CASE,
  ProjectAction,
  RESET_CYCLES,
  RESET_PROJECT,
  RESET_TEST_CASES,
  SET_CYCLES,
  SET_PROJECT,
  SET_TEST_CASES,
} from './ProjectActions';
import { defaultProject, ProjectState } from './ProjectContext';

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
        project: defaultProject,
      };
    case ADD_TEST_CASE: {
      return {
        ...state,
        testCases: [...state.testCases, action.testCase],
      };
    }
    case RESET_TEST_CASES: {
      return {
        ...state,
        testCases: [],
      };
    }
    case SET_TEST_CASES: {
      return {
        ...state,
        testCases: action.testCases,
      };
    }
    case ADD_CYCLE: {
      return {
        ...state,
        cycles: [...state.cycles, action.cycle],
      };
    }
    case RESET_CYCLES: {
      return {
        ...state,
        cycles: [],
      };
    }
    case SET_CYCLES: {
      return {
        ...state,
        cycles: action.cycles,
      };
    }

    default:
      return state;
  }
};
