import { Project } from '../../models/Project';
import { TestCase } from '../../models/TestCase';
import { defaultProject } from './ProjectContext';

export const SET_PROJECT = 'SET_PROJECT';
export const RESET_PROJECT = 'RESET_PROJECT';
export const SET_TEST_CASES = 'SET_TEST_CASES';
export const ADD_TEST_CASE = 'ADD_TEST_CASE';

export type ProjectAction =
  | SetProjectAction
  | ResetProjectAction
  | SetTestCasesAction
  | AddTestCaseAction;

export interface SetProjectAction {
  type: typeof SET_PROJECT;
  project: Project;
}

export interface ResetProjectAction {
  type: typeof RESET_PROJECT;
  project: Project;
}

export interface SetTestCasesAction {
  type: typeof SET_TEST_CASES;
  testCases: TestCase[];
}

export interface AddTestCaseAction {
  type: typeof ADD_TEST_CASE;
  testCase: TestCase;
}

export const setProject = (project: Project): SetProjectAction => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const resetProject = (): ResetProjectAction => {
  return {
    type: RESET_PROJECT,
    project: defaultProject,
  };
};

export const setTestCases = (testCases: TestCase[]): SetTestCasesAction => {
  return {
    type: SET_TEST_CASES,
    testCases,
  };
};

export const addTestCase = (testCase: TestCase): AddTestCaseAction => {
  return {
    type: ADD_TEST_CASE,
    testCase,
  };
};
