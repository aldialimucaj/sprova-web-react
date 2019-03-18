import { Cycle } from '@/models/Cycle';
import { Project } from '@/models/Project';
import { TestCase } from '@/models/TestCase';

export const RESET_PROJECT = 'RESET_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';

export const ADD_TEST_CASE = 'ADD_TEST_CASE';
export const REMOVE_TEST_CASE = 'REMOVE_TEST_CASE';
export const RESET_TEST_CASES = 'RESET_TEST_CASES';
export const SET_TEST_CASES = 'SET_TEST_CASES';

export const ADD_CYCLE = 'ADD_CYCLE';
export const RESET_CYCLES = 'RESET_CYCLES';
export const SET_CYCLES = 'SET_CYCLES';

export type ProjectAction =
  | ResetProjectAction
  | SetProjectAction
  | AddTestCaseAction
  | RemoveTestCaseAction
  | ResetTestCasesAction
  | SetTestCasesAction
  | AddCycleAction
  | ResetCyclesAction
  | SetCyclesAction;

export interface SetProjectAction {
  type: typeof SET_PROJECT;
  project: Project;
}

export interface ResetProjectAction {
  type: typeof RESET_PROJECT;
}

export interface AddTestCaseAction {
  type: typeof ADD_TEST_CASE;
  testCase: TestCase;
}

export interface RemoveTestCaseAction {
  type: typeof REMOVE_TEST_CASE;
  id: string;
}

export interface ResetTestCasesAction {
  type: typeof RESET_TEST_CASES;
}

export interface SetTestCasesAction {
  type: typeof SET_TEST_CASES;
  testCases: TestCase[];
}

export interface AddCycleAction {
  type: typeof ADD_CYCLE;
  cycle: Cycle;
}

export interface ResetCyclesAction {
  type: typeof RESET_CYCLES;
}

export interface SetCyclesAction {
  type: typeof SET_CYCLES;
  cycles: Cycle[];
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
  };
};

export const addTestCase = (testCase: TestCase): AddTestCaseAction => {
  return {
    type: ADD_TEST_CASE,
    testCase,
  };
};

export const removeTestCase = (id: string): RemoveTestCaseAction => {
  return {
    type: REMOVE_TEST_CASE,
    id,
  };
};

export const resetTestCases = (): ResetTestCasesAction => {
  return {
    type: RESET_TEST_CASES,
  };
};

export const setTestCases = (testCases: TestCase[]): SetTestCasesAction => {
  return {
    type: SET_TEST_CASES,
    testCases,
  };
};

export const addCycle = (cycle: Cycle): AddCycleAction => {
  return {
    type: ADD_CYCLE,
    cycle,
  };
};

export const resetCycles = (): ResetCyclesAction => {
  return {
    type: RESET_CYCLES,
  };
};

export const setCycles = (cycles: Cycle[]): SetCyclesAction => {
  return {
    type: SET_CYCLES,
    cycles,
  };
};
